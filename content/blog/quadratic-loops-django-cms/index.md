---
title: "Hunting Down Quadratic Loops in django CMS"
date: "2026-10-11"
featured: false
description: "How PR #8913 removed quadratic work from django CMS menus, plugins, and page permissions: a permission-heavy menu on a 4,000-page site went from 11.7 seconds to 105 ms."
---

Last week I merged [PR #8913](https://github.com/django-cms/django-cms/pull/8913) into django CMS core. In a local, uncached benchmark, it took a permission-heavy menu on a 4,000-page site from **11.7 seconds to 105 ms**. The fixes removed repeated work hidden in ordinary list operations, a pattern I've seen in almost every codebase I've worked on.

## The problem: loops inside loops

Building a menu tree, applying menu modifiers, downcasting plugins, and checking page permissions all touch many objects at once. The modifiers handle soft roots, navigation extenders, and visibility filtering. Across these paths, I found loops that repeatedly scanned or copied a growing list.

The inner loop rarely looked like a nested `for`. It was hidden in one of these three operations.

### 1. `sum(lists, [])` to flatten

```python
# Before
def get_descendants(self):
    return sum([child.get_descendants() for child in self.children], [])
```

`sum` with a list as the start value repeatedly evaluates `acc + next_list`. Each `+` copies everything collected so far. When joining 800 one-element lists, the first join copies 1 element, the second copies 2, and the last copies 800: **320,400 copied elements** to build an 800-element list.

```python
# After
def get_descendants(self):
    result = []
    stack = list(reversed(self.children))
    while stack:
        node = stack.pop()
        result.append(node)
        stack.extend(reversed(node.children))
    return result
```

The replacement visits each descendant once without repeatedly copying the accumulated result. The explicit stack also avoids hitting the recursion limit on deep trees.

### 2. `list.remove()` inside a loop

```python
# Before
for node in nodes:
    if not node.visible:
        nodes.remove(node)
```

`list.remove` scans for the item, then shifts everything after it. Repeating that work across a list can make the loop quadratic. Removing items while iterating also skips elements. In our `cut_after` function, every *second* consecutive invisible child stayed in the menu.

```python
# After
nodes[:] = [node for node in nodes if node.visible]
```

Filtering the list takes one pass and checks every node.

### 3. `in` on a list

```python
# Before
plugin_ids = [p.pk for p in plugins]
for plugin in all_plugins:
    if plugin.pk in plugin_ids:   # linear scan every time
        ...
```

Each membership check walks `plugin_ids` until it finds a match or reaches the end. The outer loop repeats that scan for every plugin.

```python
# After
plugin_ids = {p.pk for p in plugins}
for plugin in all_plugins:
    if plugin.pk in plugin_ids:   # O(1)
        ...
```

Building a set instead makes those membership checks constant-time on average. Here, the fix was changing square brackets to curly braces.

## The harder one: page permissions

Permission checks were the worst offender because the repeated work also reached the database. For every page in the menu, the old code examined every permission row, loading `perm.page` with a fresh query for each row. A menu with 1,602 pages and shared ancestor restrictions produced **1,617 SQL queries** in one render.

I indexed the restrictions by page path once, so each page only needed checks for restrictions on itself or its ancestors. The query count dropped to **18** and stayed there in the larger, 4,002-page benchmark.

## Building the tree without retries

Menu nodes can arrive before their parents, or refer to parents that don't exist. The old builder requeued those nodes and tried again later, with a guard against infinite loops. A reverse-ordered tree forced it through repeated retries.

The new builder schedules nodes by position. It attaches a node if its parent is already linked; otherwise, it parks the node in a waiting list keyed by parent ID. Linking a parent releases its waiting children. This handles each node once, preserves the original ordering, and handles missing parents without a retry loop.

## The numbers

I checked both operation counts and full-response times. The counts show how work grows with input size; the timings show how much that work affects a request.

### Operation counts (deterministic)

Fabian pointed out in review that timing tests are flaky across machines. The scaling tests in `cms/tests/test_scaling.py` therefore count list visits, comparisons, hash lookups, and `contains` calls. Each row compares an input of size N with 4N. Quadratic growth gives roughly 16× the work; linear growth gives roughly 4×.

| Workload | Before: N → 4N | After: N → 4N | Growth |
|---|---|---|---|
| Anonymous visibility | 20,000 → 320,000 | 0 → 0 | Eliminated |
| Children before parents | 5,446 → 81,796 | 892 → 3,592 | 4.03× |
| Missing parents | 39,801 → 639,201 | 597 → 2,397 | 4.02× |
| Distinct extenders | 99,900 → 1,599,600 | 1,200 → 4,800 | 4.00× |
| Descendant traversal | 20,700 → 322,800 | 200 → 800 | 4.00× |
| Many extender roots | 40,200 → 640,800 | 1,000 → 4,000 | 4.00× |
| Menu-tag level filtering | 20,000 → 320,000 | 0 → 0 | Eliminated |
| Shared extender attachment | 40,399 → 641,599 | 1,404 → 5,604 | 3.99× |
| Unattached extender removal | 40,000 → 640,000 | 400 → 1,600 | 4.00× |
| Direct soft-root pruning | 40,200 → 640,800 | 0 → 0 | Eliminated |
| Unassigned namespaces | 80,400 → 1,281,600 | 1,200 → 4,800 | 4.00× |
| Utility level filtering | 20,100 → 320,400 | 200 → 800 | 4.00× |
| Plugin downcasting | 21,094 → 324,394 | 1,592 → 6,392 | 4.02× |
| Plugin binding | 20,298 → 321,198 | 796 → 3,196 | 4.02× |
| Shared ancestor restrictions | 650 → 10,100 | 26 → 101 | 3.88× |

A zero means the counted comparison was eliminated; the traversal still does other work. A follow-up audit found the same ~16× → ~4× pattern in ancestor collection, menu flattening, inactive-menu filtering, and default-plugin batch merging.

### Request-level timing (local, uncached)

These are median full-response times measured locally with SQLite, one WSGI worker, Python 3.14, and Django 5.2.

| Workload | main → PR | Speedup | SQL queries |
|---|---|---|---|
| Unrestricted menu (control), 1,602 pages | 106 → 107 ms | 0.99× | 17 → 17 |
| Mixed restrictions, 1,602 pages | 514 → 76 ms | 6.72× | 818 → 18 |
| Shared ancestor restrictions, 1,602 pages | 2,016 → 45 ms | 44.89× | 1,617 → 18 |
| Large shared ancestor restrictions, 4,002 pages | 11,729 → 105 ms | 112.24× | 4,017 → 18 |
| 2,000 plugins / 20 placeholders | 72 → 63 ms | 1.13× | 19 → 19 |
| 8,000 plugins / 80 placeholders | 361 → 248 ms | 1.46× | 19 → 19 |
| 16,000 plugins / 80 placeholders | 1,008 → 497 ms | 2.03× | 19 → 19 |
| Mixed 1,602-page menu + 8,000 plugins | 892 → 327 ms | 2.73× | 820 → 20 |
| 4,000 reverse-ordered custom-menu nodes | 269 → 266 ms | 1.01× | 17 → 17 |

The unrestricted menu, our control, stayed at about 106–107 ms. These results put the gains in permission-heavy menus and large plugin trees, with little benefit expected for sites without page restrictions and with modest plugin counts. In the 4,002-page case, the query count fell from 4,017 to 18.

Every benchmark response had the same HTML hash across both revisions.

## Making sure I didn't break anything

- Full suite: **1,916 tests**, 16 skipped, green.
- 29 new scaling tests with growth assertions. Every one fails on the pre-fix commit and passes after.
- 2,000 randomized menu trees checked for identical flatten ordering, visibility, and tree mutations before and after.
- Coverage went up 0.10%, and every new line is covered.

Fabian reviewed the change and has already backported it to the 5.0 and 5.1 branches, so it doesn't need to wait for a major release.

## What to check

When you see `sum(lists, [])`, or `some_list.remove(x)` or `x in some_list` inside a loop, check how large the list can get and how often it's scanned or copied. In these paths, sets, dictionaries, and single-pass filtering removed work that grew much faster than the input.

The tests also caught something the timings couldn't explain: `cut_after` was leaving invisible children in the menu. I wouldn't have found that bug without a test for consecutive invisible children.

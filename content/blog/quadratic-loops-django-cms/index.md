---
title: "Hunting Down Quadratic Loops in django CMS"
date: "2026-10-11"
featured: false
description: "How PR #8913 removed quadratic work from django CMS menus, plugins, and page permissions: a permission-heavy menu on a 4,000-page site went from 11.7 seconds to 105 ms."
---

Last week I merged [PR #8913](https://github.com/django-cms/django-cms/pull/8913) into django CMS core. It touches some of the oldest code in the project: the menu system, the menu modifiers, plugin downcasting and the page-permission check that decides which pages a visitor may see. In a local, uncached benchmark, a permission-heavy menu on a 4,000-page site went from **11.7 seconds to 105 ms**.

Almost none of that came from clever algorithms. It came from removing work that Python hides behind innocent-looking syntax. If you take one thing from this post, take this: **an O(n) operation inside a loop over n items is O(n²), and Python lets you write O(n) operations that look like O(1).**

Below are the patterns I found, how to recognize them, when they actually matter, and how to write tests that catch them without a stopwatch.

## The cheat sheet

| Looks like | What it really does | Use instead |
|---|---|---|
| `sum(lists, [])` | Copies everything collected so far on every `+` | `list(chain.from_iterable(lists))` |
| `[a] + recurse(...)` in a recursive function | Copies each subtree once per ancestor | An explicit stack |
| `lst.remove(x)` in a loop | Scans for `x`, then shifts every later element | Collect, then filter once |
| `x in lst` in a loop | Scans the list | `x in some_set` |
| Re-queueing items "until they work" | Up to n retries per item | Wait until the dependency is ready |

Each of these was in django CMS. Let's go through them.

## 1. Copying instead of collecting: `sum(lists, [])`

`create_default_plugins` gathered the plugins it created for each placeholder like this:

```python
return sum(starmap(_create_default_plugins, mutable_confs), [])
```

`sum` evaluates `acc + next_list` repeatedly, and each `+` builds a new list containing everything collected so far. Joining 800 one-element lists copies 1 + 2 + … + 800 = **320,400 elements** to produce an 800-element list.

The fix is a one-liner from the standard library:

```python
return list(chain.from_iterable(starmap(_create_default_plugins, mutable_confs)))
```

The same pattern hid in a worse form in `NavigationNode.get_descendants`:

```python
return sum(([node] + node.get_descendants() for node in self.children), [])
```

Because it's recursive, every subtree is copied once at its own level, then again at its parent's level, and again at every ancestor's level. Cost grows with *depth × size*. On a deep tree, it also runs into Python's recursion limit.

`chain` alone doesn't fix recursion, so here the answer is an explicit stack:

```python
descendants = []
pending = list(reversed(self.children))
while pending:
    node = pending.pop()
    descendants.append(node)
    pending.extend(reversed(node.children))
return descendants
```

Reversing the children before pushing them keeps the original preorder, so callers see exactly the same list as before. Each node is touched once, and there is no recursion to overflow. `get_ancestors`, `flatten` and the nav-extender `cut_levels` got the same treatment.

**How to spot it:** any `+` on lists inside a loop or a recursive return value.

## 2. Removing while iterating: a performance bug that was also a correctness bug

The submenu tag trimmed invisible children like this:

```python
for child in node.children:
    if child.visible:
        cut_after(child, levels - 1)
    else:
        node.children.remove(child)
```

`list.remove` has to find the element and then shift every element after it one slot to the left. Do that for many children and the loop becomes quadratic.

It's also wrong. A list iterator is just an index that moves forward. Take children `[A, B, C]` where A and B are invisible:

| Step | Iterator index | List | Action |
|---|---|---|---|
| 1 | 0 → A | `[A, B, C]` | remove A → `[B, C]` |
| 2 | 1 → C | `[B, C]` | C is visible, keep it |
| done | | `[B, C]` | **B was never looked at** |

Every second consecutive invisible child stayed in the menu. The fix filters first, then recurses:

```python
node.children[:] = [child for child in node.children if child.visible]
for child in node.children:
    cut_after(child, levels - 1)
```

Note the slice assignment, `node.children[:] = ...`, rather than `node.children = ...`. Other code may hold a reference to the same list object. Slice assignment replaces its contents in place, so everyone sees the change. Rebinding the name would silently leave them with the old list.

Where nodes had to be removed from *several* parents, as in `AuthVisibility` and the menu tag's `cut_levels`, the PR adds a small helper that collects every node to remove and filters each parent's `children` exactly once:

```python
def detach_from_parents(nodes):
    removed = set()
    parents = {}
    for node in nodes:
        removed.add(id(node))
        if node.parent:
            parents[id(node.parent)] = node.parent
    for parent in parents.values():
        parent.children[:] = [c for c in parent.children if id(c) not in removed]
```

The old `AuthVisibility` code was a good example of hidden double work: `node in node.parent.children` scans the list, then `node.parent.children.remove(node)` scans it again.

**How to spot it:** `.remove()`, `.pop(0)` or `.insert(0, …)` inside a loop. The fix is always the same: decide first, then rebuild once.

## 3. Membership tests on a list

`downcast_plugins` and `get_bound_plugins` collected plugin ids into a list and then, for every plugin, checked whether its parent was among them:

```python
plugin_ids = []
for plugin in plugins:
    plugin_ids.append(plugin.pk)
...
for plugin in plugins:
    parent_not_available = not plugin.parent_id or plugin.parent_id not in plugin_ids
```

The `not in` is easy to miss: it's buried in a boolean expression, not in a loop of its own. But it's a linear scan, run once per plugin. The fix was to collect the ids in a set instead of a list:

```python
plugin_ids = set()  # A set: it is checked for every plugin
...
plugin_ids.add(plugin.pk)
```

Why does that help? Lists and sets answer `x in ...` in completely different ways. A list stores its items in order and knows nothing about their values, so `x in lst` compares `x` with each item until it finds a match or reaches the end. A missing value, like a parent id that isn't there, is the worst case, because every item gets checked.

Sets (and dict keys) are built for exactly this question. A set is a hash table: when an item is added, Python computes `hash(item)` and uses it to pick a slot in an internal array. `x in some_set` computes `hash(x)`, jumps straight to that slot, and compares only the few items stored there, usually just one. The cost doesn't depend on how many items the set holds, so a lookup in a set of 16,000 plugin ids costs about the same as in a set of 10.

There are two trade-offs: items must be hashable (ints, strings and tuples are), and sets don't keep insertion order. Neither mattered here. If you need both ordering and fast lookups, keep the list for iterating and build a set alongside it for `in` checks.

**How to spot it:** any `in` whose right-hand side is a list built earlier in the function.

## 4. The main course: page permissions

This was the case that turned 105 ms into 11.7 seconds, because here the repeated work reached the database.

To decide whether a visitor may see a page, django CMS checks *view restrictions*. A restriction on a page can also apply to its children or descendants. The old code did the obvious thing. For every page in the menu, it looped over **every** restriction and asked whether that restriction covers the page:

```python
for perm in restrictions:
    if perm.get_page_permission_tuple().contains(page.path):
        ...
```

That alone is pages × restrictions. Worse, `get_page_permission_tuple()` reads `perm.page.path`, and `perm.page` is a lazy foreign key. The old code pre-filled that cache only for a page's *own* restriction. Every restriction inherited from an ancestor triggered a fresh query. A 1,602-page menu with restrictions on shared ancestors issued **1,617 SQL queries** in one render.

The fix uses the structure of the data to limit which rules can possibly apply.

django CMS stores the page tree as a *materialized path*: each page's `path` is its parent's path plus a fixed-width step. A page's ancestors are therefore exactly the pages whose paths are **prefixes** of its own path. So instead of asking "which of all restrictions covers this page?", we can ask "are there restrictions on any of my `depth` prefixes?":

```python
for end in range(Page.steplen, len(page.path) + 1, Page.steplen):
    perm_path = page.path[:end]
    for scope, granted in restrictions_by_path.get(perm_path, {}).items():
        if not scope.contains(page.path):
            continue
        if granted:
            return True
        restricted = True
```

That's one dictionary lookup per tree level instead of one check per restriction.

Two more ideas make it work:

- **Use the data you already have.** The paths come from the pages that are already loaded for the menu (`page_paths = {pc.page.pk: pc.page.path for pc in page_contents}`), so `perm.page` is never touched and the N+1 queries disappear.
- **Decide once per rule, not once per page.** Whether the current user is granted a given scope doesn't depend on which descendant is asking. The code resolves that once while it builds the index:

  ```python
  grants[scope] = grants.get(scope, False) or (
      is_auth_user and (perm.user_id == user_id or perm.group_id in user_groups)
  )
  ```

  The per-page loop only reads a boolean.

The query count dropped from 1,617 to **18**, and it stayed at 18 for 4,002 pages.

The general lesson goes beyond django CMS. When you're matching many items against many rules, look for a key that tells you which rules *can* apply: a prefix, a parent, a type, a date bucket. Index the rules by it, and the cross product disappears.

## 5. Building the menu tree without retries

Menu nodes from custom menus and apphooks can arrive in any order. A child may come before its parent, or point to a parent that doesn't exist. The old builder handled this with a queue. It popped a node, and if the node's parent hadn't been seen yet, it appended the node to the back and tried again later. To avoid looping forever, a counter on each node stopped retrying after `len(nodes)` attempts.

That's correct, but a node whose parent never appears gets retried up to n times. A tree that arrives in reverse order needs one full pass per level.

The new builder **waits instead of retrying**. A node whose parent isn't linked yet is parked in a dictionary keyed by `(namespace, parent_id)`. When the parent is linked, its waiting children are released.

The subtle part is **order**. Menus are rendered in the order their nodes end up in, and existing sites depend on that order. The old queue processed nodes in rounds, so the new code reproduces those rounds exactly with a heap of `(round, position, node)`:

```python
for child_position, child in waiting.pop((node.namespace, node.id), ()):
    child_round = round_number if child_position > position else round_number + 1
    heapq.heappush(visits, (child_round, child_position, child))
```

A released child that sits *after* its parent in the input would still have been reached in the current round. One that sits *before* it would have waited for the next round. Every node is visited at most twice, and orphans are simply never released.

When you rewrite legacy code, don't stop at "it produces the same tree". Ask what callers can *observe*, here the ordering, and keep it.

## When does any of this matter?

Here are request-level timings, measured locally: median full-response time, SQLite, one WSGI worker, Python 3.14, Django 5.2, no menu cache.

| Workload | Before → After | Speedup | SQL queries |
|---|---|---|---|
| Unrestricted menu (control), 1,602 pages | 106 → 107 ms | 0.99× | 17 → 17 |
| Shared ancestor restrictions, 1,602 pages | 2,016 → 45 ms | 45× | 1,617 → 18 |
| Shared ancestor restrictions, 4,002 pages | 11,729 → 105 ms | 112× | 4,017 → 18 |
| 16,000 plugins / 80 placeholders | 1,008 → 497 ms | 2.0× | 19 → 19 |
| 4,000 reverse-ordered custom-menu nodes | 269 → 266 ms | 1.01× | 17 → 17 |

The last row deserves a closer look. On that workload, the tree builder now does about **23× less work** (81,796 → 3,592 counted operations at the larger size), yet the request is only 1% faster. Comparing a few thousand integers in memory is cheap. Rendering templates and talking to the database dominate.

The pattern shows up across the table:

- **Quadratic in-memory work** hurts only once n gets large, as with 16,000 plugins.
- **Quadratic work that touches I/O** hurts almost immediately. The permission check was a quadratic loop with a query inside it.

So profile first. Fix the loop that is slow in practice, and treat the others as cheap insurance. The control row and the identical HTML output (every benchmark response hashed the same before and after) are what tell you a change is safe, not just fast.

## Testing growth without a stopwatch

Timing tests are flaky: CI machines differ, and noise swamps small inputs. Fabian pointed this out in review, and it led to the most reusable idea in the PR. **Count operations instead of measuring time, and assert on how the count grows.**

The tests in `cms/tests/test_scaling.py` use instrumented types that increment a counter whenever they are compared, hashed, iterated or concatenated:

```python
class CountingId(int):
    def __eq__(self, other):
        Work.count += 1
        return int(self) == int(other)

    def __hash__(self):
        Work.count += 1
        return int.__hash__(self)


class CountingList(list):
    def __add__(self, other):
        Work.count += len(self) + len(other)   # every copied element
        return CountingList(super().__add__(other))
    # __iter__, __reversed__ and __radd__ count the same way
```

Then each test runs the code on n and 4n items and compares:

```python
def assertLinearCount(self, run, n):
    Work.count = 0
    run(n)
    small = Work.count

    Work.count = 0
    run(4 * n)
    large = Work.count

    self.assertLess(large, 8 * max(small, 1), f"work grew from {small} to {large}")
```

Linear code grows about 4×, quadratic code about 16×, and the threshold of 8× sits safely between them. The result is deterministic, fast, and independent of the machine. All 29 scaling tests fail on the pre-fix code and pass afterwards. For example, removing nodes that don't belong to any nav extender went from 40,000 → 640,000 operations (16×) to 400 → 1,600 (4×).

Two related tricks were worth using too:

- **Recursion-limit tests.** Build a chain of `sys.getrecursionlimit() + 1` nodes and call `get_ancestors` and `flatten` on it. It's cheap, and it pins down the "no recursion" property for good.
- **Differential testing.** I generated 2,000 random menu trees and checked that the old and new code produce identical flatten order, visibility and tree mutations. When the rewrite must not change behavior, comparing it with the old code on random input finds the edge cases that hand-written tests miss.

## Checklist

When you review code that runs per request over a collection of unknown size, look for:

- `sum(..., [])`, or `+` on lists in a loop or a recursive return
- `.remove()`, `.pop(0)`, `.insert(0, …)` or `.index()` inside a loop
- `in` against a list that was built earlier in the function
- modifying a list while iterating over it (a performance smell *and* a correctness bug)
- a loop over "all rules" for each item, when a key such as a path prefix, parent or type could narrow the rules down
- a foreign-key attribute accessed inside a loop (N+1 queries)
- "retry until it works" loops with a safety counter

Then ask two questions: *how large can this get*, and *does the inner work touch I/O?* If the answer to the second is yes, fix it now.

The full suite (1,916 tests) is green, and the change has been backported to the 5.0.x and 5.1.x release branches, so you don't need to wait for a major release to benefit.

Published here as well: https://www.django-cms.org/resources/blog/2026/10/11/hunting-down-quadratic-loops-in-django-cms/




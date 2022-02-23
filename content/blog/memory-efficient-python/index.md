---
title: How To Handle Large Lists Or QuerySets In Python
date: "2022-02-24"
---

The ability to write code that is memory efficient and fits in the system’s memory is a sign of a good programmer. I will share a neat technique I frequently use in my projects.

Let’s say you encounter a problem where you need to iterate over a huge list (could be a python list or any Iterable like Queryset). It might seem very tempting to do something like this:

```python
all_users = Users.objects.all()

for user in all_users:
    print(user.name, user.age)
```

 Seems pretty harmless, right? Nope, it is only true if your list is pretty small. 
What if you have more than a couple of hundred thousand records in that table. Does it still makes sense to use this, or do we need a better technique? 

Here is a snippet I use across all my projects:

```python
from __future__ import annotations

from typing import Any
from typing import Iterator

from django.db.models.query import QuerySet

# suitable for django projects
def batch_qs(qs: QuerySet, batch_size: int) -> Iterator[Queryset]:
    total = qs.count()
    for start in range(0, total, batch_size):
        end = min(start + batch_size, total)
        yield qs[start:end]

# suitable for any place where you get a list
def batch_list(list_arr: list[Any], batch_size: int) -> Iterator[Any]:
    total = len(list_arr)
    for start in range(0, total, batch_size):
        end = min(start + batch_size, total)
        yield list_arr[start:end]

```

Let me explain what is going on here. Using these methods, you can slice these massive lists into small, manageable lists.

## Usage 

```python

# Using the batch_list

def some_func(elem):
    ...

huge_list_data = [...] # may contains more than a hundred thousand elements

smaller_list_data = batch_list(huge_list_data, 100) # the batch size can be smaller chunks

# now, in order to use them,
# Iterate over the list over an infinite loop, so that you can keep running till the Iterator Exhausts and raises StopIteration

while True:
    try:
        smaller_list = next(smaller_list_data)
        for elem in smaller_list:
            # do some operations with the elements
            some_func(elem)
    except StopIteration as e:
        print(e)
        break
```

If you notice the above code,  the `batch_list` method returns an iterator that you can use to get the elements from the sliced list.
You don't have to load the whole list into the memory at once, and you work with smaller manageable chunks which doesn't
exhaust all available memory.

The same technique can also be used in Django as well:

```python

def process_user(user):
    ...

from .models import Users

all_users = Users.objects.all()  # let's assume this qs is over 100,000 or larger.

# now, instead of iterating over it all at once.

user_list_data = batch_qs(all_users, 500) # taking a slice of 500 users each time from the queryset

while True:
    try:
        user_list = next(user_list_data)
        for user in user_list:
            process(user)
    except StopIteration as e:
        print(e)
        break

```

This ensures that however large your Queryset is, it won't halt the execution of the thread.

This is a pretty useful technique that you can use in your day-to-day coding.

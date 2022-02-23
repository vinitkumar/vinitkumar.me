---
title: How To Handle Large Lists Or QuerySets In Python
date: "2022-02-24"
---

Write code that is memory efficient and fits in the system's memory is one of the good qualities for a programmer. I will share a tip about one technique I use very frequently and always works well.

Let's say you encounter a situation in your code where you need to iterate over a huge list(could a normal python list or any Iterable like Queryset). It might seem very tempting to do something like this:


```python
all_users = Users.objects.all()

for user in all_users:
    print(user.name, user.age)
```

Seems pretty harmless, right. Well, it is if your Queryset is pretty small and those objects are small. But what if you have more than a couple of hundred thousand records in that table and what all_users is a pretty big list. Does it still makes sense to use this, or do we need a better technique to deal with this?

Well, indeed, there is a much better way to deal with this.

Here is a snippet I reuse across all my projects:

```python
from __future__ import annotations

from typing import Any
from typing import Iterator

from django.db.models.query import QuerySet

# suitable for django projects
def batch_qs(qs: QuerySet, batch_size: int):
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

Now, let me explain what is going on here. These methods let you yield an evenly split slices of the Iterable you pass.

Using this is pretty straightforward as well.


```python

# Using the batch_list

def some_func(elem):
    ...

huge_list_data = [...] # contains more than a hundred thousand elements

smaller_list_data = batch_list(huge_list_data, 100) # the batch size can be smaller chunks

# now, in order to use them,
# Iterate over the list over an infinite loop, so that you can keep running the 

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

Notice in the above code, you receive a generator which you use to get the elements, when you write your loops this way,
you don't have to load the whole list into the memory at once, and you work with smaller manageable chunks which doesn't
exhaust all available memory.

The same technique can also be user in Django as well:

```python

def process_user(user):
    ...

from .models import Users

all_users = Users.objects.all()  # let's assume this qs is over 100,000 or longer.

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

If you notice, the same technique is used here to deal with huge Querysets. This ensures that however large your Queryset is, it won't halt the execution of the thread, if you are trying to iterate over it.

I always use this technique when I am doing some sort of data migrations or in the previous example dealing with big list.

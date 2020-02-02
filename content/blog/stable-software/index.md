---
title: How to build stable software
date: "2020-02-02"
---

Building good software is hard and even harder is building software that is stable and works for long period of time.

The basic thing, we need to understand is software development at this moment is very fragile and prone to break. Any userland software that runs is in turn dependent on system calls that are implemented by the Kernel. Also, if you write any software it dependson the API and ABI exposed by the underlying language and its standard libraries.

On top of this, if you also have a lot of external dependencies in your software, you care basically increasing the number of variables on which the stablity of the system depends. This is turns you have just increases the number of ways your system can break.


Now, the question is how to build very stable software:

- the first basic strategy that comes to the mind is to remove the number of external plugins and libraries. If it is very hard to do so, then just copy the libraries in your system. This might feel against the popular wisdom, but sometimes this works great. The first benefit is that you are not dependent on the package manager to get this library for you and at the same time you have access to the full source code and you can remove some functionality that you don't need.

- Build your application more heavily dependent on the stdlib of the language. The stdlib is much more gurantanteed to keep backward compatible than the libraries which might break much easily. If you are on stable version of the language, the chances for breakage are even slim.

- Write the minimum amount of code to get the work done. More code means you are basically increasing the surface area for the bugs to appear.


The moral of the story here is "LESS IS MORE". Let's be more conservative in building stable software that works and brings joy to its users.

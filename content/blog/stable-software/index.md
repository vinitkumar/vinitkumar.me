---
title: How to build stable software
date: "2020-02-02"
---

Building good software is hard and even harder is to build software that is stable and works for long period of time.

The basic thing, we need to understand is that software is very fragile and prone to break. Any userland software that runs is in turn dependent on system calls that are implemented by the Kernel. Any software depends on the API and ABI exposed by the underlying language and its standard libraries.

On top of this, if you also have a lot of external dependencies in your software, you are basically increasing the number of variables on the stablity of the system. This is turn means that you have just increases the number of ways your system can break.


So how to build very stable software? These points comes to my mind:

- the first strategy that comes to the mind is to remove the number of external plugins and libraries. If it is very hard to do so, then just copy the libraries in your system. This might feel against the popular wisdom, but sometimes this just works great. The first benefit is that you are not dependent on the package manager to get this library for you and at the same time you have access to the full source code and you can remove some functionality that you don't need.

- Build your application which is more dependent on the stdlib of the language. The stdlib is gurantanteed to keep backward compatiblility than the external libraries which might break much more easily. If you do upgrades to stable version of the language, the chances for breakage are even slim.

- Write the minimum amount of code to get the work done. More code means you are basically increasing the surface area for the bugs to appear.

The moral of the story here is "LESS IS MORE". Let's be more conservative in building stable software that works and brings joy to its users.

---
title: How To Build Stable Software That Lasts
date: "2020-02-02"
---

Building good software is hard and even harder is to build software that is stable and works for a long period of time.

The basic thing is that software is very fragile and prone to break. Any userland software that runs on an OS depends on system calls that are implemented by the Kernel and the API and ABI exposed by the underlying language and standard libraries.

On top of this, if you have many external dependencies in your software, you are basically increasing the number of variables the stability of the system depends on. This is turn means that you have just increases the number of ways your system can break.


So how can we build very stable software? These few points comes to my mind:

- The first strategy is to reduce the number of external plugins and libraries. If it is very hard to do so, then just copy the libraries in your system. This might seem against the popular wisdom, but sometimes this just works great. The first benefit is that you are not dependent on the package manager to get this library for you and at the same time you have access to the full source code and you can remove some functionality that you don't need.

- Build your application which is more dependent on the standard library of the language. The stdlib is guaranteed to keep backward compatibility  and have better test coverage than the external libraries. If you only do upgrades to stable version of the language, the chances for breakage are even slim.

- Write the minimum amount of code to get the work done. More code means you are basically increasing the surface area for the bugs to appear.

The moral of the story here is "LESS IS MORE". Let's be more conservative in building stable software that works and brings joy to its users.

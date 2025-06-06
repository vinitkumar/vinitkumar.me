---
date: 2016-06-22
layout: post
title: "Some New Learnings"
description: "Some new Learnings"
category: articles
tags: life
comments: false
---

Software Engineering comes with a lot of good learning opportunities. First you learn how to write something by reading tutorials, watching videos etc. Then down the time you learn some new ways to do the same thing and you are blown by it. But only after some days you actually encounter the real hard problems in Computer Science.

Some of them are:

- Race conditions
- Caching

I have had some very nasty experiences with race conditions. But it opened my eyes to a new set of bugs that could be introduced. Your code might work fine 99% of the time but that remaining 1% could only happen under very rare circumstances. I think being aware and looking out for ways where race conditions might occur could be a good way to minimize if not totally prevent race conditions.

About Caching, it is very important that you understand what you are caching, why you are caching and how exactly your caching is going to work. Just setting up memcached and using a plugin will not help when you encounter a nasty bug caused by caching and you only realize after wasting hours debugging the issue.

Lately, I have been hacking a lot on new things and writing some Go and Node.js. I mostly do that in my late evenings after dinner and it is good fun. I am thinking of documenting my learning process as I learn these new things in a better way. I think it works best for me.

I will probably do a 15 or 30 day challenge, pick up a language and learn as much as I could about that language. The goal here is to learn it deeply and clearly. 
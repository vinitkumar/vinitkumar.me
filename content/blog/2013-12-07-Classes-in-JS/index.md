---
layout: post
title: "Some Notes On The Classes in JS"
description: "Learning new developments in JavaScript"
category: ["articles"]
comments: false
date: "2013-12-07"
---


Here is an interesting example for Classes in JS. Classes in JS don't have a class keyword.

```javascript
function Range(from, to) {
  this.from = from;
  this.to = to;
}

Range.prototype =  {
  includes: function (x) {
    return this.from <=x && x <= this.to;
  },
  foreach: function (f) {
    for(var x= Math.ceil(this.from); x < this.to; x++)f(x);
  },
  toString: function () {
    return '('+this.from+'.......'+this.to+')';
  }
};

var r = new Range(4,20);
r.includes(5);
r.foreach(console.log);
console.log(r);
```

It is pretty simple and clean way to create a class

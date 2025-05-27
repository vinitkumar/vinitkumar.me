---
date: 2019-01-16
layout: post
title: "Converting LaTeX to PDF on macOS"
description: "Setup Mac for editing LaTeX"
category: articles
tags: latex macos pdf
comments: false
---

I have been writing my resume in LaTeX for more than a decade now. Writing your resume in LaTeX has its own benefits.
You can check it out here:

- [benefits of doing the resume in latex](https://tex.stackexchange.com/questions/11955/what-are-the-benefits-of-writing-resumes-in-tex-latex)

Now, writing your resume in all LaTeX is all well and good but converting it into PDF on macOS is a task on its own. The MacTeX package is a BIG download of around 6GB and it's not worth spending so much time and energy for only trying to convert your resume from LaTeX to PDF. Well, you can of course use one of the online latex-to-PDF converter or you can install the `basictex` package and set your local Mac environment capable of converting to PDF.


Follow these steps to get it working:

```
# install basictex using brew #NOTE your password might be required
brew cask install basictex
# try to install texlivefly, it complains about tlmgr outdated
sudo tlmgr install texliveonfly
# update tlmgr
sudo tlmgr update --self
# now install textliveonfly
sudo tlmgr install texliveonfly

# use the commands using sudo.
# for eg: if your resume file name is vinit_kumar.tex

sudo texliveonfly vinit_kumar.tex

# this outputs a file named vinit_kumar.pdf in the same directory
# now, open this file like this to check if all your changes made it through.

open vinit_kumar.pdf
```

Credits where it's due: [Get Mactex Faster](https://www.apptic.me/blog/get-mactex-faster-easily-using-basictex.php)

The idea came from this website, though the issue was it was not working without `sudo`. Hence, wrote this post more of a reminder of how to get LaTeX to PDF working on macOS

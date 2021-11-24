---
title: TIL 24-November-2021 (Python)
date: "2021-11-24"
---


Today, I saw an link to an article on Github. All my projects (work and personal) run on github actions as CI. Now, github actions pip install didn't had cache for pip. So now that can be enabled using changes to the yaml file like this:

Link to the announcement here:

```yaml
steps:
- uses: actions/checkout@v2
- uses: actions/setup-python@v2
  with:
    python-version: '3.9'
    cache: 'pip'
- run: pip install -r requirements.txt
- run: pip test
```


Also, if you don't have wheel installed, pip uses legacy install (setup.py) install. So install, wheel as a dep first, so that your dependencies can install with a faster and better format.


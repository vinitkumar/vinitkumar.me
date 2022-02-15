---
title: How To Get Webp Support in Django/DjangoCMS
date: "2022-01-29"
---


[Webp](https://developers.google.com/speed/webp) is an exciting new image format that saves on the bandwidth because of lower size and is also supported by all major browsers. The issue is that you need to configure your server for it work.

It can be done in following steps:

- Install the system dependency in your docker image or your server.
- Install the latest version of library required to support it.

## How Install the dependency on docker

Add ``libwepb-dev`` to your list of package installs like below

```shell
# <DOCKER_FROM>
FROM divio/base:2.2-py3.9-slim-buster
# </DOCKER_FROM>

RUN apt-get update
RUN apt-get install gcc libxml2-dev libxslt1-dev libmagic1 libpq-dev gettext libwebp-dev -y
```


## Update the python dependency that support it.

Now, in your requirements.txt or requirements.in file, add this:


```txt
Pillow==9.0.1
```

The latest version of pillow is the recommended version to install and support many formats including webp.


So setup these packages in your app and you should be able to save that bandwidth and up on your web performance scores in no time.

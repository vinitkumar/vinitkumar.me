#!/bin/bash

mkdir post_backups
for title in "$@"
do
  folder=${title%.*}
  echo $folder
  mkdir $folder
  cp $title $folder/index.md
  mv $title post_backups/$title
done

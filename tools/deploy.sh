#!/bin/bash
set -e
cd `dirname $0`/..
source build/.env

if [[ ! "$1" =~ ^(prev|live)$ ]]; then
  echo "Usage : $0 [prev|live]"
  exit 255
fi

case "$1" in
  prev)
    #ssh jenkins-cli build 'example\ project' -s
    ;;
  live)
    #ssh $REMOTE_HOST "cd $REMOTE_DIRECTORY && git reset --hard && git clean -f -d && git pull && git submodule update --init --recursive && exit"
    ;;
esac

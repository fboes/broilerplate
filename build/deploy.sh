#!/bin/bash
set -e
cd ${0%/*}/..
source build/config.sh

if [[ ! "$1" =~ ^(prev|live)$ ]]; then
	echo "Usage : $0 [prev|live]"
	exit 255
fi

case "$1" in
	prev)
		#ssh jenkins-cli build 'example\ project' -s
		;;
	live)
		#ssh $REMOTE_HOST "cd $REMOTE_DIRECTORY && git pull && git submodule update --init --recursive && exit"
		;;
esac

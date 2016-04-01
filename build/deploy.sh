#!/bin/bash
set -e
cd ${0%/*}/..
source build/config.sh

case "$1" in
	prev)
		#ssh jenkins-cli build 'example\ project' -s
		;;
	live)
		#ssh $REMOTE_HOST "cd $REMOTE_DIRECTORY && git pull && git submodule update --init --recursive && exit"
		;;
	*)
		echo "Usage : $0 [prev|live]"
		;;
esac

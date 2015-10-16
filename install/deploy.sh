#!/bin/bash
set -e
cd ${0%/*}/../htdocs

if [ $# -lt 1 ]; then
	echo "Usage : $0 [prev|live]"
	exit
fi

case "$1" in
	live)
		#ssh $REMOTE_HOST "cd $REMOTE_DIRECTORY && git pull && exit"
		;;
	prev)
		#ssh jenkins-cli build 'example\ project' -s
		;;
	*)
		echo "Environment '$1' not found" && exit 1
		;;
esac



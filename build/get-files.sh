#!/bin/bash
set -e
cd `dirname $0`/..
source build/config.sh

if [[ ! "$1" =~ ^(live)$ ]]; then
	echo "Usage : $0 [live]"
	exit 255
fi

case "$1" in
	live)
		rsync -avz $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
		#rsync -avz --exclude=.git $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
		;;
esac

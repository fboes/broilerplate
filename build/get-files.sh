#!/bin/bash
set -e
cd ${0%/*}/..
source build/config.sh

source build/config.sh

case "$1" in
	live)
		rsync -avz $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
		#rsync -avz --exclude=.git $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
		;;
	*)
		echo "Usage : $0 [live]"
		;;
esac

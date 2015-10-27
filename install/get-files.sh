#!/bin/bash
set -e
cd ${0%/*}/..
source install/config.sh

rsync -avz $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
#rsync -avz --exclude=.git $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/

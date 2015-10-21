#!/bin/bash
set -e
cd ${0%/*}/..

rsync -avz $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/
#rsync -avz --exclude=$EXCLUDE_FILE $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download htdocs/

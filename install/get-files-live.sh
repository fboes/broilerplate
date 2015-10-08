#!/bin/bash
cd ${0%/*}/../htdocs

rsync -avz $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download ./
#rsync -avz --exclude=$EXCLUDE_FILE $REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/download ./

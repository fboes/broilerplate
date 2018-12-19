#!/bin/bash
set -e
cd `dirname $0`/..
source .env

if [ "$REMOTE_HOST" = "localhost" ]; then
  rsync -avz $REMOTE_DIRECTORY/htdocs/images htdocs/
else
  rsync -avz $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIRECTORY/htdocs/images htdocs/
fi

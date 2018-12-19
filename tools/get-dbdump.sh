#!/bin/bash
set -e
cd `dirname $0`/..
source .env

if [[ ! "$1" =~ ^(local|live)$ ]]; then
  echo "Usage : $0 [local|live]"
  exit 255
fi

mkdir -p tmp
case "$1" in
  local)
    mysqldump -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD --no-data --skip-comments --add-drop-table $LOCAL_DB_DB > tmp/dbdump.sql
    # mysqldump -u $LOCAL_DB_USR -p$LOCAL_DB_PWD   --no-create-info --skip-comments --insert-ignore $LOCAL_DB_DB $DB_TABLE >> tmp/dbdump.sql
    ;;
  live)
    ssh $REMOTE_HOST "mysqldump -h $REMOTE_DB_HOST -u $REMOTE_DB_USR -p --skip-comments --add-drop-table $REMOTE_DB_DB" > tmp/dbdump.sql
    ;;
esac

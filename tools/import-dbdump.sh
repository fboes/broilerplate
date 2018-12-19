#!/bin/bash
set -e
cd `dirname $0`/..
source .env

if [[ "$1" =~ ^help$ ]]; then
  echo "Usage : $0 [production]"
  exit 0
fi

if [[ ! "$1" =~ ^--force$ ]]; then
  read -p "Proceed and replace database? [yn] " CONFIRM
  if [[ ! "$CONFIRM" =~ ^(y|Y|yes|Yes)$ ]]; then
    echo "Cancelled"
    exit 1
  fi
fi

if [ -f tmp/dbdump.sql ]; then
  mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD --execute "DROP DATABASE IF EXISTS \`$LOCAL_DB_DB\`; CREATE DATABASE \`$LOCAL_DB_DB\`;"
  time mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB < tmp/dbdump.sql
  echo "Done importing db dump"
fi

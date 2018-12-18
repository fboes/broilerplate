#!/bin/bash
set -e
cd `dirname $0`/..
source build/.env

if [ -f tmp/dbdump.sql ]; then
  time mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB --execute "DROP DATABASE $LOCAL_DB_DB; CREATE DATABASE $LOCAL_DB_DB;"
  time mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB < tmp/dbdump.sql
fi

#!/bin/bash
set -e
cd `dirname $0`/..
source build/config.sh

if [ -f build/mysql/dbdump.sql ]; then
  time mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB --execute "DROP DATABASE $LOCAL_DB_DB; CREATE DATABASE $LOCAL_DB_DB;"
  time mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB < build/mysql/dbdump.sql
fi

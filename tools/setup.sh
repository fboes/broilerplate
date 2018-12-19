#!/bin/bash
set -e
cd `dirname $0`/..
if [ ! -e .env ]; then
  cp .env.example .env
fi
source .env

if [ "$LOCAL_DB_HOST" ]; then
  mysql -h $LOCAL_DB_HOST -u root -proot --execute "CREATE DATABASE IF NOT EXISTS $LOCAL_DB_DB"
  mysql -h $LOCAL_DB_HOST -u root -proot --execute "GRANT ALL ON $LOCAL_DB_DB.* TO '$LOCAL_DB_USR'@'localhost' IDENTIFIED BY '$LOCAL_DB_PWD'"
fi
if [ -f tools/mysql/dbdump.sql ]; then
  tools/import-dbdump.sh
fi

# mkdir -p tmp
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET

[ -d node_modules ] || sudo npm install --no-bin-links


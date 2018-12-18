#!/bin/bash
set -e
cd `dirname $0`/..
if [ ! -e tools/.env ]; then
  cp tools/_.env tools/.env
fi
source tools/.env

if [ "$LOCAL_DB_HOST" ]; then
  mysql -h $LOCAL_DB_HOST -u root -proot --execute "CREATE DATABASE IF NOT EXISTS $LOCAL_DB_DB"
  mysql -h $LOCAL_DB_HOST -u root -proot --execute "GRANT ALL ON $LOCAL_DB_DB.* TO '$LOCAL_DB_USR'@'localhost' IDENTIFIED BY '$LOCAL_DB_PWD'"
fi
if [ -f tools/mysql/dbdump.sql ]; then
  tools/import-dbdump.sh
fi

# mkdir -p tmp
# make_writable_directory htdocs/files
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET

[ -d node_modules ] || sudo npm install --no-bin-links


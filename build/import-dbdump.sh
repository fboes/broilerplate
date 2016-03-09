#!/bin/bash
set -e
cd ${0%/*}/..
source build/config.sh

if [ -f build/mysql/dbdump.sql ]; then
	mysql -h $LOCAL_DB_HOST -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB < build/mysql/dbdump.sql
fi

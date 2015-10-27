#!/bin/bash
set -e
cd ${0%/*}/..
source install/config.sh

if [ -f install/mysql/dbdump.sql ]; then
	mysql -u $LOCAL_DB_USR -p$LOCAL_DB_PWD $LOCAL_DB_DB < install/mysql/dbdump.sql
fi

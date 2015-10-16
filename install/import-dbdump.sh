#!/bin/bash
set -e
cd ${0%/*}/..

if [ -f install/mysql/dbdump.sql ]; then
	mysql -u root -proot broilerplate < install/mysql/dbdump.sql
fi

#!/bin/bash
set -e
cd ${0%/*}/../htdocs

case "$1" in
	live)
		ssh $REMOTE_HOST "mysqldump -u broilerplate -p -h localhost broilerplate" > install/mysql/dbdump.sql
		;;
	*)
		mysqldump -u root -p --no-data --skip-comments --add-drop-table broilerplate > install/mysql/dbdump.sql
		# mysqldump -u root -p  --no-create-info --skip-comments --insert-ignore broilerplate $DB_TABLE >> install/mysql/dbdump.sql
		;;
esac

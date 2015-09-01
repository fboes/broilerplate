#!/bin/bash
cd ${0%/*}/..

mysqldump -u root -p --no-data --skip-comments --add-drop-table broilerplate > setup/mysql/dbdump.sql
# mysqldump -u root -p  --no-create-info --skip-comments --insert-ignore broilerplate {{ DB_TABLE }} >> setup/mysql/dbdump.sql

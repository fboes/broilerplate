#!/bin/bash
cd ${0%/*}/..

mysqldump -u root -p --no-data --skip-comments --add-drop-table broilerplate > setup/mysql/dbdump.sql

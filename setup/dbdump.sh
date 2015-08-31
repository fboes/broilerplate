#!/bin/bash
cd ${0%/*}/..

mysqldump -u root -p --no-data --skip-comments broilerplate > setup/mysql/dbdump.sql

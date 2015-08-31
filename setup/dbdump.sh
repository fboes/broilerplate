cd ${0%/*}/..
mysqldump -u root -p --no-data broilerplate > setup/mysql/dbdump.sql

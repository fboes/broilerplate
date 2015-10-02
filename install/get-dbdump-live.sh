#!/bin/bash

cd ${0%/*}/..
ssh REMOTE_HOST "mysqldump -u broilerplate -p -h localhost broilerplate" > install/mysql/dbdump.sql

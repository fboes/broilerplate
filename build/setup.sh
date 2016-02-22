#!/bin/bash
set -e
cd ${0%/*}/..
if [ ! -e build/config.sh ]; then
	cp build/_config.sh build/config.sh
fi
source build/config.sh

if [ "$LOCAL_DB_HOST" ]; then
	mysql -h $LOCAL_DB_HOST -u root -proot --execute "CREATE DATABASE IF NOT EXISTS $LOCAL_DB_DB"
	mysql -h $LOCAL_DB_HOST -u root -proot --execute "GRANT ALL ON $LOCAL_DB_DB.* TO '$LOCAL_DB_USR'@'localhost' IDENTIFIED BY '$LOCAL_DB_PWD'"
if
if [ -f build/mysql/dbdump.sql ]; then
	build/import-dbdump.sh
fi

if [ -x "/usr/sbin/sestatus" ]; then
	echo ""
	echo -e "=== \x1B[32mDirectory access\x1B[m ==="
	echo ""
fi

function make_writable_directory {
	mkdir -p $1 && chmod -R ugo+rwX $1
	if [ -x "/usr/sbin/sestatus" ]; then
		echo "semanage fcontext -a -t httpd_sys_rw_content_t \"$LOCAL_DIRECTORY/$1(/.*)?\""
	fi
}

# mkdir -p tmp
# make_writable_directory htdocs/files
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET

if [ ! -d /vagrant ]; then
	echo ""
	echo -e "=== \x1B[32mApache2 vhost config\x1B[m ==="
	echo ""
	sed "s#/var/www#$LOCAL_DIRECTORY#g" build/apache/macro-broilerplate.conf
	sed "s#/var/www#$LOCAL_DIRECTORY#g;s#localhost#$LOCAL_HOST#g" build/apache/httpd-vhost.conf
	echo ""
	echo -e "=== \x1B[32m/etc/hosts\x1B[m === "
	echo ""
	echo "127.0.0.1    $LOCAL_HOST"
	echo ""
	[ -d node_modules ] || npm install
else
	[ -d node_modules ] || sudo npm install --no-bin-links
fi

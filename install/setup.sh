#!/bin/bash
set -e
cd ${0%/*}/..

CWD=$(pwd)

if [ -f install/mysql/dbdump.sql ]; then
	mysql -u root -proot --execute "CREATE DATABASE IF NOT EXISTS broilerplate"
	mysql -u root -proot --execute "GRANT ALL ON broilerplate.* TO 'broilerplate'@'localhost' IDENTIFIED BY '$DB_PASSWORD'"
	install/import-dbdump.sh
fi

function make_writable_directory {
	mkdir -p $1 && chmod 777 $1
	if [ -x "/usr/sbin/sestatus" ]; then
		echo "semanage fcontext -a -t httpd_sys_rw_content_t \"$CWD/$1(/.*)?\""
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
	sed "s#/var/www#$CWD#g" install/apache/macro-broilerplate.conf
	sed "s#/var/www#$CWD#g" install/apache/broilerplate.local.conf
	echo ""
	echo -e "=== \x1B[32m/etc/hosts\x1B[m === "
	echo ""
	echo "127.0.0.1    broilerplate.local"
	echo ""
	[ -d node_modules ] || npm install
else
	[ -d node_modules ] || sudo npm install --no-bin-links
fi

#!/bin/bash
cd ${0%/*}/..

cwd=$(pwd)

if [ -f install/mysql/dbdump.sql ]; then
	mysql -u root -proot --execute "CREATE DATABASE IF NOT EXISTS broilerplate"
	mysql -u root -proot --execute "GRANT ALL ON broilerplate.* TO 'broilerplate'@'localhost' IDENTIFIED BY '{{ DB_PASSWORD }}'"
	install/import-dbdump.sh
fi

cd htdocs
# mkdir -p tmp
# mkdir -p uploads && chmod 777 uploads
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET
cd ..

if [ ! -d /vagrant ]; then
	echo ""
	echo -e "=== [32mApache2 vhost config[m ==="
	echo ""
	sed "s#/var/www#$cwd#g" install/apache/macro-broilerplate.conf
	sed "s#/var/www#$cwd#g" install/apache/broilerplate.local.conf
	echo ""
	echo -e "=== [32m/etc/hosts[m === "
	echo ""
	echo "127.0.0.1    broilerplate.local"
	echo ""
	[ -d node_modules ] || npm install
else
	[ -d node_modules ] || sudo npm install --no-bin-links
fi

cd ..

cwd=$(pwd)

if [ -f setup/mysql/dbdump.sql ]; then
	mysql -u root -proot --execute "CREATE DATABASE IF NOT EXISTS broilerplate"
	mysql -u root -proot --execute "GRANT ALL ON broilerplate.* to 'broilerplate'@'localhost' IDENTIFIED BY 'broilerplate'"
	mysql -u root -proot broilerplate < setup/mysql/dbdump.sql
fi

cd htdocs
# mkdir -p tmp
# chmod 777 tmp
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET
cd ..

if [ ! -d /vagrant ]; then
	echo ""
	echo "=== Apache2 vhost config ==="
	echo ""
	sed "s#/var/www#$cwd#g" setup/apache/httpd-vhost.conf
	echo ""
	echo "=== /etc/hosts === "
	echo ""
	echo "127.0.0.1    broilerplate.local"
	echo ""
	[ -d node_modules ] || npm install
else
	[ -d node_modules ] || sudo npm install --no-bin-links
fi

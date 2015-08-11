cd ..

[ -f setup/mysql/dbdump.sql ] && mysql -u root -proot --execute "CREATE DATABASE IF NOT EXISTS broilerplate"
[ -f setup/mysql/dbdump.sql ] && mysql -u root -proot --execute "GRANT ALL ON broilerplate.* to  'broilerplate'@'localhost' IDENTIFIED BY 'broilerplate'"
[ -f setup/mysql/dbdump.sql ] && mysql -u root -proot broilerplate < setup/mysql/dbdump.sql

if [ -d /vagrant ]; then
	[ -e node_modules ] || sudo npm install --no-bin-links
else
	[ -e node_modules ] || npm install
fi

cd htdocs
# mkdir -p tmp
# chmod 777 tmp
#[ -h TARGET ] || ln -s SOURCE TARGET
#[ -f TARGET ] || cp SOURCE TARGET

if [ ! -d /vagrant ]; then
	rsync -avz hyu-mnr-prev:/var/www/hyu-mnr-prev.shift.agency/htdocs/uploads .

	echo ""
	echo "=== Apache2 vhost config ==="
	echo ""
	sed "s#/var/www#$cwd#g" setup/apache/httpd-vhost.conf
	echo ""
	echo "=== /etcs/hosts === "
	echo ""
	echo "127.0.0.1    broilerplate.local"
	echo ""
fi

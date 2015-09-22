if [ ! -f /etc/apache2/sites-enabled/broilerplate.local.conf ]; then
	sudo apt-get update
	sudo apt-get upgrade -y
	sudo apt-get install language-pack-de-base ruby -y
	sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
	sudo a2enmod macro
	sudo su -c "gem install sass"
fi

[ -d /var/www/logs ] || mkdir -p /var/www/logs
[ -f /var/www/install/apache/macro-broilerplate.conf ] && cp /var/www/install/apache/macro-broilerplate.conf /etc/apache2/conf-enabled/macro-broilerplate.conf
[ -f /var/www/install/apache/broilerplate.local.conf ] && cp /var/www/install/apache/broilerplate.local.conf /etc/apache2/sites-enabled/broilerplate.local.conf
sudo service apache2 restart

[ -f /var/www/install/setup.sh ] && /var/www/install/setup.sh

HOST=`hostname -f`

if [ ! -f /etc/apache2/sites-enabled/${HOST}.conf ]; then
	sudo apt-get update
	sudo apt-get upgrade -y
	sudo apt-get install language-pack-de-base ruby -y
	sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
	sudo a2enmod macro
	sudo su -c "gem install sass"
fi

[ -d /var/www/logs ] || mkdir -p /var/www/logs
sudo chmod ugo+rwX /var/www/logs/*
touch /var/www/logs/access.log && touch /var/www/logs/error.log
[ -f /var/www/build/apache/macro-broilerplate.conf ] && sudo cp /var/www/build/apache/macro-broilerplate.conf /etc/apache2/conf-enabled/macro-broilerplate.conf
[ -f /var/www/build/apache/${HOST}.conf ] && sudo cp /var/www/build/apache/httpd-vhost /etc/apache2/sites-enabled/${HOST}.conf && sudo sed -i -- "s/localhost/$HOST/g" /etc/apache2/sites-enabled/${HOST}.conf
sudo service apache2 restart

[ -f /var/www/build/setup.sh ] && /var/www/build/setup.sh

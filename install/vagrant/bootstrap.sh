sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install language-pack-de-base ruby -y
[ -d /var/www/logs ] || mkdir -p /var/www/logs
sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
[ -f /var/www/install/apache/macro-broilerplate.conf ] && cp /var/www/install/apache/macro-broilerplate.conf /etc/apache2/conf-enabled/macro-broilerplate.conf
[ -f /var/www/install/apache/broilerplate.local.conf ] && cp /var/www/install/apache/broilerplate.local.conf /etc/apache2/sites-enabled/broilerplate.local.conf
sudo a2enmod macro
sudo service apache2 restart
sudo su -c "gem install sass"

[ -f /var/www/install/setup.sh ] && /var/www/install/setup.sh

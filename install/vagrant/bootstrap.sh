sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install language-pack-de-base ruby -y
[ -d /var/www/logs ] || mkdir -p /var/www/logs
[ -f /var/www/install/apache/httpd-vhost.conf ] && cp /var/www/install/apache/httpd-vhost.conf /etc/apache2/sites-enabled/broilerplate.local.conf
sudo a2enmod macro
sudo service apache2 restart
sudo su -c "gem install sass"

[ -f /var/www/install/setup.sh ] && cd /var/www && install/setup.sh

#sudo apt-get update
#sudo apt-get upgrade -y
sudo apt-get install language-pack-de-base ruby -y
sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
[ -f /var/www/setup/apache/httpd-vhost.conf ] && echo "apache/httpd-vhost.conf exists" && cp /var/www/setup/apache/httpd-vhost.conf /etc/apache2/conf-available/httpd-vhost.conf && sudo sed -i -- 's/#Include conf-available\/serve-cgi-bin.conf/Include conf-available\/httpd-vhost.conf/g' /etc/apache2/**/*.conf
sudo service apache2 restart
sudo su -c "gem install sass"

[ -f /var/www/setup/setup.sh ] && cd /var/www && setup/setup.sh

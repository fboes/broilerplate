#sudo apt-get update
#sudo apt-get upgrade -y
sudo apt-get install language-pack-de-base ruby -y
sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
[ -f /var/www/setup/.htaccess ] && echo ".htaccess exists" && cp /var/www/setup/.htaccess /etc/apache2/conf-available/_htaccess.conf && sudo sed -i -- 's/#Include conf-available\/serve-cgi-bin.conf/Include conf-available\/_htaccess.conf/g' /etc/apache2/**/*.conf
sudo service apache2 restart
sudo su -c "gem install sass"
cd /var/www && sudo npm install
# mysql -u root -proot scotchbox < setup/dump.sql

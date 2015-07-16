#sudo apt-get update
#sudo apt-get upgrade -y
sudo apt-get install language-pack-de-base -y
sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
sudo service apache2 restart
sudo apt-get install ruby -y
sudo su -c "gem install sass"
cd /var/www
npm install
# mysql -u root -proot scotchbox < setup/dump.sql

sudo sed -i -- 's/\/public/\/htdocs/g' /etc/apache2/**/*.conf
sudo service apache2 restart
cd /var/www
npm install
grunt watch

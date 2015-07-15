Server stuff
============

For virtualisation to work you will need a VM client. You may want to use.

* [Virtual Box](https://www.virtualbox.org/)

Web server in a box
--------------------

You may want to use [Vagrant](https://www.vagrantup.com/). This will offer you an easy setup for virtual machines.

This project comes pre-equipped with [Scotch Box](https://box.scotch.io/). For more complex setups consider using [PuPHPet](https://puphpet.com/).

The most important commands:

* `vagrant up`: Start/resume your server
* `vagrant suspend`: Pause your server. You should do this before shutting down your computer.
* `vagrant destroy`: Delete your server
* `vagrant ssh`: SSH into your server

The local Vagrant setup will execute any commands from [`setup/vagrant/bootstrap.sh`](../../setup/vagrant/bootstrap.sh). In this case Vagrant will install all required dependencies for your project and start the [Grunt watcher](grunt.md).

After starting Vagrant there will be a webserver, running at the host name you set it to under [`setup/vagrant/Vagrantfile`](../../setup/vagrant/Vagrantfile).

Testing for IE
--------------

If you would like to test your site with older versions of Microsoft's Internet Explorer, head over to their [collection of virtual machines with different versions of Windows & Internet Explorer](https://www.modern.ie/de-de/virtualization-tools). 

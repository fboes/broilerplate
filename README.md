Broilerplate
================

[![devDependency Status](https://david-dm.org/fboes/broilerplate/dev-status.svg)](https://david-dm.org/fboes/broilerplate#info=devDependencies)

A boilerplate with SASS, JS & Vagrant. It serves the following goodness on a shiny plate:

* SASS
* jQuery Plugin builder
* Grunt support
* Opengraph implementation
* Best practices for icons
* RTL-support
* Support for old IEs (aka `oldie`)
* Support for [editorconfig](http://editorconfig.org/)
* Vagrant for a build-in webserver / database solution.

So you can eat your broiler and have it.

Installation
------------

Download this repository via…

* [Bower](http://bower.io/): `bower install git://github.com/fboes/broilerplate.git`
* [NPM](https://www.npmjs.org/): `npm install git+https://github.com/fboes/broilerplate.git`

Setup your project:

1. Check Gruntfile for any file or host references.
2. You may want to replace all variables (like `{{ VARNAME }}`) with a meaningful text or variable.

See the [setup instructions in detail](docs/development/setup.md).

Installation of __your__ project
--------------------------------

There are two ways to develop:

* The Grunt way: Locally, which requires [Grunt](http://gruntjs.com/) & [SASS](http://sass-lang.com/)
* The Vagrant way: Virtualized, which requires [Vagrant](https://www.vagrantup.com/)

Setup your development space:

1. The Vagrant way: Update `setup/vagrant/Vagrantfile` and set your virtual hostname (currently `broilerplate.local`)
2. The Grunt way: Install Grunt plugins via `npm install`.
4. The Grunt way: Run `setup/setup.sh`
6. If you do not want to install the [LiveReload plugin](http://livereload.com/extensions/), insert the [LiveReload script](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-).

Developing
----------

1. Vagrant way: Start Vagrant via `cd setup/vagrant && vagrant up`. This will start a webserver at http://broilerplate.local/ for your current project.
2. Vagrant way: Start Grunt watcher via `vagrant ssh -- cd /var/www/ && grunt watch`
2. Grunt way: Start Grunt watcher via `grunt watch`. This will start the Grunt watcher responsible for compiling SASS, linting JS, reloading your page on changes via LiveReload and doing other useful stuff.
3. Start [LiveReload plugin](http://livereload.com/) in your browser. If you use the [LiveReload script](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-) disregard this step.
4. Develop (and check for advice given by the Grunt watcher).
5. Commit to your repository.
6. Use `grunt shell:prev` to deploy to your preview server. Then start again at step 2.

See `docs/development` for more information

Version
-------

Version: 1.3.1 (2015-08-28)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt

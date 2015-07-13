Broilerplate
================

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

You also need:

* [Grunt](http://gruntjs.com/)
* [SASS](http://sass-lang.com/)

Optionally you may want to use:

* [Vagrant](https://www.vagrantup.com/)

Setup your development space:

1. Install Grunt plugins via `npm install`.
2. Check Gruntfile for any file or host references.
3. Update 'setup/vagrant/Vagrantfile` and set your virtual hostname (currently `broilerplate.local`)
4. You may want to replace all variables (like `{{ VARNAME }}`) with a meaningful text or variable.
5. If you do not want to install the [LiveReload plugin](http://livereload.com/extensions/), insert the [LiveReload script](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-).

Variables used in templates:

* `{{ BASE_URL }}`: Base url including protocol, domain name and base path. Does not end with `/`. E.g. `https://www.example.com`
* `{{ SITENAME }}`: Title of your project
* `{{ PAGE_RELATIVE_URL }}`: URL of current document relative to base path. Does start with a `/`. E.g. `/example/index.html`
* `{{ PAGE_TITLE }}`: Title of the current page
* `{{ PAGE_DESCRIPTION }}`: Description of the current page. Maximum length is 160 characters
* `{{ THEME_COLOR }}`: Hex color used as basic theme color. E.g. `#aa00ff`

Developing
----------

1. Start Vagrant via `cd setup/vagrant && vagrant up`. This will start a webserver at http://broilerplate.local/ for your current project.
2. Start Grunt watcher via `grunt watch`. This will start the Grunt watcher responsible for compiling SASS, linting JS, relaoding your page on changes via LiveReload and doing other useful stuff.
3. Start [LiveReload plugin](http://livereload.com/) in your browser. If you use the [LiveReload script](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-) disregard this step.
4. Develop (and check for advice given by the Grunt watcher).
5. Commit to your repository.
6. Use `grunt shell:prev && grunt watch` to deploy to your preview server and start watcher anew.

See `docs/development` for more information

Version
-------

Version: 1.2.0 (2015-07-13)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt

Broilerplate
================

A boilerplate with SASS & JS. It serves the following goodness on a shiny plate:

* SASS
* jQuery Plugin builder
* Grunt support
* Opengraph implementation
* Best practices for icons
* RTL-support
* Support for old IEs (aka `oldie`)

So you can eat your broiler and have it.

SASS
----

Basic structure to help you identify your core variables and build a clean structure for medium- to big-size stylesheets.

Main idea based on a session given by Ken Woodworth (http://kenwoodworth.com/).

Note: In this example there is no styling applied to HTML5 elements. Instead, there are classes and IDs with the corresponding name, so you can safely use this stylesheet stub for Microsoft Internet Explorer 8. See http://caniuse.com/html5semantic

* .header
* .nav
* .main
* .aside
* .footer
* .figure
* .figcaption

Grunt will create a secondary stylesheet which is called `oldie.css` for old Internet Explorers. This is done by removing media queries older IEs do not understand. There is als a media query for `tty`, which gets rewritten so it only works for old IEs.

Requirements
------------

* [Grunt](http://gruntjs.com/)
* [SASS](http://sass-lang.com/)

Installation
------------

* Via [Bower](http://bower.io/): `bower install git://github.com/fboes/broilerplate.git`
* Via [NPM](https://www.npmjs.org/): `npm install git+https://github.com/fboes/broilerplate.git`

Setup & development
-------------------

1. Install Grunt plugins via `npm install`
2. Edit your settings in `htdocs/sass/_base.scss`
3. Define your responsive/adaptive strategy via `$switch-responsive-strategy`
4. Alter `replace` in `Gruntfile.js` to match your responsive/adaptive strategy
5. Add SASS libraries to `htdocs/sass/vendor/`
6. Add JS libraries to `htdocs/js/vendor/`

At this point you are free to develop:

1. Start compiler via `grunt watch`
2. Start [LiveReload](http://livereload.com/) in your browser
3. Edit `htdocs/sass/_all.scss`, `htdocs/sass/_print.scss` and `htdocs/sass/_screen.scss`
4. Add new plugins to `htdocs/js/main.jquery.js`

Version
-------

Version: 0.1.1 (2015-03-04)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt
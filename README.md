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
* Support for [editorconfig](http://editorconfig.org/)

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

Developing with Broilerplate
----------------------------

1. Install Grunt plugins via `npm install`
2. Start compiler via `grunt watch`
3. Start [LiveReload](http://livereload.com/) in your browser

See `docs/development` for more information

Version
-------

Version: 0.2.0 (2015-03-06)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt
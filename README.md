Broilerplate
================

A boilerplate with SASS & JS.

SASS
----

Basic structure to help you identify your core variables and build a clean structure for medium- to big-size stylesheets.

Main idea based on a session given by Ken Woodworth (http://kenwoodworth.com/).

All rules in the _*.scss files are for demonstration purposes only.

Note: In this example there is no styling applied to HTML5 elements. Instead, there are classes and IDs with the corresponding name, so you can safely use this stylesheet stub for Microsoft Internet Explorer 8. See http://caniuse.com/html5semantic

* .header
* .nav
* #main
* .aside
* .footer
* .figure
* .figcaption
* .required

Grunt will create a secondary stylesheet which is called `oldie.css` for old Intern Explorers. This is done by removing media queries older IEs do not understand. There is als a media query for `tty`, which gets rewritten so it only works for old IEs.

Requirements
------------

* [SASS](http://sass-lang.com/)
* Optional: [Compass](http://compass-style.org/)
* Optional: [Grunt](http://gruntjs.com/) (setup via `npm install`, start via `grunt watch`)

Installation
------------

* Via [Bower](http://bower.io/): `bower install git://github.com/fboes/broilerplate.git`
* Via [NPM](https://www.npmjs.org/): `npm install git+https://github.com/fboes/broilerplate.git`

Setup
-----

1. Start compiler (e.g. via `grunt watch`)
2. Edit your settings in `sass/_base.scss`
3. Define your responsive/adaptive strategy via `$switch-responsive-strategy`
4. Edit `sass/_all.scss`, `sass/_print.scss` and `sass/_screen.scss`
5. Add SASS libraries to `sass/vendor/`

Version
-------

Version: 0.0.1 (2015-03-03)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt
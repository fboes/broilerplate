SASS Styleguide
================

A simple SASS boilerplate to help you identify your core variables and build a clean structure for medium- to big-size stylesheets.

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

Requirements
------------

* [SASS](http://sass-lang.com/)
* Optional: [Compass](http://compass-style.org/)
* Optional: [Grunt](http://gruntjs.com/) (setup via `npm install`, start via `grunt watch`)

Installation
------------

* Via [Bower](http://bower.io/): `bower install git://github.com/fboes/sass-styleguide.git`
* Via [NPM](https://www.npmjs.org/): `npm install git+https://github.com/fboes/sass-styleguide.git`

Setup
-----

1. Start compiler
2. Edit your settings in `_base.scss`
3. Define your responsive/adaptive strategy via `$switch-responsive-strategy`

Version
-------

Version: 1.3.1 (2015-01-16)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See LICENSE.txt
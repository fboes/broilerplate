CSS & SASS
==========

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

Setup
-----

1. Set basic variables in `htdocs/sass/_base.scss`
2. Edit your settings in `htdocs/sass/_base.scss`
3. Define your responsive/adaptive strategy via `$switch-responsive-strategy`
4. Alter `replace` in `Gruntfile.js` to match your responsive/adaptive strategy
5. Add SASS libraries to `htdocs/sass/vendor/`

You may also want to see the documenation for [webfonts](webfonts.md).

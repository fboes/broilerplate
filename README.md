Broilerplate
================

[![devDependency Status](https://david-dm.org/fboes/broilerplate/dev-status.svg)](https://david-dm.org/fboes/broilerplate?type=dev)

A boilerplate with SASS & JS. It serves the following goodness on a shiny plate:

* SASS
* Gulp support
* Opengraph implementation
* Best practices for icons
* RTL-support
* Support for [editorconfig](http://editorconfig.org/)

So you can eat your broiler and have it.

Installation
------------

Setup your project:

1. Check Gulpfile for any file or host references.
2. You may want to replace all variables (like `{{ VARNAME }}`) with a meaningful text or variable.

See the [setup instructions in detail](docs/development/setup.md).

Installation of _your_ project
--------------------------------

Setup your development space:

2. Install Gulp plugins via `npm install`.
4. Run `build/setup.sh`.

Developing
----------

1. Gulp way: Start Gulp watcher via `gulp watch`. This will start the Gulp watcher responsible for compiling SASS, linting JS, reloading your page on changes and doing other useful stuff.
2. Develop (and check for advice given by the Gulp watcher).
3. Commit to your repository.

See `docs/development` for more information

Version
-------

Version: 3.0.0 (2018-12-18)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)

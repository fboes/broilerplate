Broilerplate
================

[![devDependency Status](https://david-dm.org/fboes/broilerplate/dev-status.svg)](https://david-dm.org/fboes/broilerplate?type=dev)

A boilerplate with SASS, JS & Vagrant. It serves the following goodness on a shiny plate:

* SASS
* jQuery Plugin builder
* Gulp support
* Opengraph implementation
* Best practices for icons
* RTL-support
* Support for old IEs (aka `oldie`)
* Support for [editorconfig](http://editorconfig.org/)

So you can eat your broiler and have it.

Installation
------------

Setup your project:

1. Check Gulpfile for any file or host references.
2. You may want to replace all variables (like `{{ VARNAME }}`) with a meaningful text or variable.

See the [setup instructions in detail](docs/development/setup.md).

Installation of __your__ project
--------------------------------

Setup your development space:

2. Install Gulp plugins via `npm install`.
4. Run `build/setup.sh`.

Developing
----------

2. Gulp way: Start Gulp watcher via `gulp watch`. This will start the Gulp watcher responsible for compiling SASS, linting JS, reloading your page on changes via LiveReload and doing other useful stuff.
4. Develop (and check for advice given by the Gulp watcher).
5. Commit to your repository.
6. Use `gulp deploy-prev` to deploy to your preview server. Then start again at step 2.

See `docs/development` for more information

Version
-------

Version: 3.0.0 (2018-12-18)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)

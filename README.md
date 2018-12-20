Broilerplate
================

A plattform-agnostic web-project boilerplate with SASS & JS. It serves the following goodness on a shiny plate:

* Basic directory structure for web projects
* Basic HTML structure for web templates with…
  * [Open Graph](http://ogp.me/)
  * [Schema.org](https://schema.org/)
  * [IndieWeb Microformats](https://indieweb.org/format)
* Best practices for icons
* Development tools like…
  * [Sass](https://sass-lang.com/)
  * [Gulp](https://gulpjs.com/)
  * [editorconfig](http://editorconfig.org/) configuration for clean code
  * Git configuration

Installation
------------

Setup your project:

1. Execute `/tools/init-project.sh`.
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

Version / Status
----------------

See [changelog](CHANGELOG.md)

[![devDependency Status](https://david-dm.org/fboes/broilerplate/dev-status.svg)](https://david-dm.org/fboes/broilerplate?type=dev)

Legal stuff
-----------

Author: [Frank Boës](http://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)

Setup
=====

Variables used in templates:

* `{{BASE_URL}}`: Base url including protocol, domain name and base path. Does not end with `/`. E.g. `https://www.example.com`.
* `{{SITENAME}}`: Title of your project.
* `{{PAGE_RELATIVE_URL}}`: URL of current document relative to base path. Does start with a `/`. E.g. `/example/index.html`.
* `{{PAGE_TITLE}}`: Title of the current page.
* `{{PAGE_DESCRIPTION}}`: Description of the current page. Maximum length is 160 characters.
* `{{THEME_COLOR}}`: Hex color used as basic theme color. E.g. `#aa00ff`.

There are also some shell variables used for automatic setups. Check [`.env.example`](../../.env.example) for details.

Using the setup script
----------------------

If you want to use automatic setups via [setup.sh](../../build/setup.sh), you may have to modify if extensively.

Grunt
=====

Be sure to install [Grunt](http://gruntjs.com/).

The following commands can be executed in a terminal right from the root folder of this project:

* `grunt watch`: Tells Grunt to watch for file changes an compile files after changes occured
* `grunt build-sass`: Rebuild all CSS files from SASS
* `grunt build-js`: Rebuild all minified JS files
* `grunt image_resize`: Rebuild all favicons, apple-touch-icons and any other form of icon from `logo.png`
* `grunt styleguide`: Rebuild the SASS styleguide
* `grunt shell:prev && grunt watch`: Deploy project to your preview server and restart the watcher afterwards

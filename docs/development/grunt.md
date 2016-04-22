Grunt
=====

Be sure to install [Grunt](http://gruntjs.com/).

The following commands can be executed in a terminal right from the root folder of this project:

* `grunt watch`: Tells Grunt to watch for file changes an compile files after changes occured.
* `grunt build-sass`: Rebuild all CSS files from SASS.
* `grunt build-js`: Rebuild all minified JS files.
* `grunt build-icons`: Rebuild all favicons, apple-touch-icons and any other form of icon from `logo.png`.
* `grunt build-article-images`: Convert all images from `htdocs/images/originals` to a common image size, copying them to other folders in `htdocs/images`.
* `grunt kss`: Rebuild the SASS styleguide.
* `grunt shell:prev && grunt watch`: Deploy project to your preview server and restart the watcher afterwards.

Node.js & npm
-------------

For Grunt to work [Node.js](https://nodejs.org/) has to be installed.

David Walsh published a [guide on updating Node.js via npm](http://davidwalsh.name/upgrade-nodejs).

After this procedure use `sudo npm install -g npm` to update npm as well.

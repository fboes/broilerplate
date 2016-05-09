Gulp
=====

Be sure to install [Gulp](http://gulpjs.com/).

The following commands can be executed in a terminal right from the root folder of this project:

* `gulp watch`: Tells Gulp to watch for file changes an compile files after changes occured.
* `gulp build-sass`: Rebuild all CSS files from SASS.
* `gulp build-js`: Rebuild all minified JS files.
* `gulp build-icons`: Rebuild all favicons, apple-touch-icons and any other form of icon from `logo.png`.
* `gulp build-article-images`: Convert all images from `htdocs/images/originals` to a common image size, copying them to other folders in `htdocs/images`.

Node.js & npm
-------------

For Gulp to work [Node.js](https://nodejs.org/) has to be installed.

David Walsh published a [guide on updating Node.js via npm](http://davidwalsh.name/upgrade-nodejs).

After this procedure use `sudo npm install -g npm` to update npm as well.

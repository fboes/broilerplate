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

Gulp will create a secondary stylesheet which is called `oldie.css` for old Internet Explorers. This is done by removing media queries older IEs do not understand. There is als a media query for `tty`, which gets rewritten so it only works for old IEs.

Setup
-----

1. Set basic variables & settings in [`htdocs/sass/base/_base.scss`](../../htdocs/sass/base/_base.scss).
2. Define your responsive/adaptive strategy by modyfing [`htdocs/sass/base/_mixins.scss`](../../htdocs/sass/base/_mixins.scss).
3. Check default in [`htdocs/sass/_all-base.scss`](../../htdocs/sass/_all-base.scss).

You may also want to see the documenation for [webfonts](webfonts.md).

Directory structure
-------------------

There is a set of directories in SASS:

* [`htdocs/sass/`](../../htdocs/sass/): These are your regular working files.
* [`htdocs/sass/base/`](../../htdocs/sass/base/): Contains basic settings.
* [`htdocs/sass/modules/`](../../htdocs/sass/modules/): You may want to define modules for `_screen.scss`. Put these modules here.
* [`htdocs/sass/vendor/`](../../htdocs/sass/vendor/): You may want to put vendor CSS here.

`htdocs/sass/base/` contains:

* [`htdocs/sass/base/_reset.scss`](../../htdocs/sass/base/_reset.scss): Resets all CSS to common defaults.
* [`htdocs/sass/base/_toolshed.scss`](../../htdocs/sass/base/_toolshed.scss): Some all-purpose mixins.
* [`htdocs/sass/base/_constants.scss`](../../htdocs/sass/base/_constants.scss): Some constants used in `base`.
* [`htdocs/sass/base/_base.scss`](../../htdocs/sass/base/_base.scss): Add your own variables here.
* [`htdocs/sass/base/_fonts.scss`](../../htdocs/sass/base/_fonts.scss): Add your own webfonts here.
* [`htdocs/sass/base/_mixins.scss`](../../htdocs/sass/base/_mixins.scss): Add your own mixins here.

`htdocs/sass/` contains your regular working files:

* [`htdocs/sass/_all.scss`](../../htdocs/sass/_all.scss): Sensible defaults for all output channels, uses variables from `base`. Add your own styles for all output channels.
* [`htdocs/sass/_screen.scss`](../../htdocs/sass/_screen.scss): Sensible defaults for all screen channels, uses variables from `base`. Add your own styles for all screen channels.
* [`htdocs/sass/_print.scss`](../../htdocs/sass/_print.scss): Sensible defaults for all print channels, uses variables from `base`. Add your own styles for all print channels.

Using media queries
-------------------

There is a set of prefedined media queries in [`htdocs/sass/base/_mixins.scss`](../../htdocs/sass/base/_mixins.scss). Use these mixins in [`htdocs/sass/_screen.scss`](../../htdocs/sass/_screen.scss) like this:

```sass
.selector {
  // Here goes some regular CSS
  @include screen_mobile {
    // Here goes some CSS for mobiles
  }
}
```

You may want to take a look at [Write Better Media Queries with Sass](http://davidwalsh.name/write-media-queries-sass).

Using RTL layout
----------------

If you are in need of fixes for Right-To-Left layout, there is a Sass mixin:

```sass
.selector {
  text-align: left;
  @include rtl {
    text-align: right;
  }
}
```

Using toolshed mixins
---------------------

You can use the toolshed mixins by calling the mixin:

```sass
.selector {
	@include toolshed-clearfix();
}
```

or by extending the supplied classes, as long as your are in screen media query:

```sass
.selector {
	@extend %toolshed-clearfix;
}
```

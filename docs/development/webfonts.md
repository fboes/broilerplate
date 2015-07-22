Webfonts
========

1. Add webfont files to `htdocs/fonts`. It may be wise to copy the whole content of a webfont zip/folder to the fonts directory, including demo- and license-files.
2. Load webfont in [`htdocs/sass/base/_fonts.scss`](../../htdocs/sass/base/_fonts.scss).
3. Set variable in [`htdocs/sass/base/_base.scss`](../../htdocs/sass/base/_base.scss).

Use icon font
-------------

1. Wisest choice: [Font Awesome](http://fortawesome.github.io/Font-Awesome/).
2. Set `$fontfamily-symbols` in [`htdocs/sass/base/_base.scss`](../../htdocs/sass/base/_base.scss).

Build your own icon font
------------------------

1. Use [IcoMoon](https://icomoon.io/#docs).
2. You may want to use [Font Awesome's icon mapping](https://github.com/FortAwesome/Font-Awesome/blob/master/scss/_variables.scss) for icon names and character codes.
3. Copy download folder to `htdocs/fonts`.
4. Set `$fontfamily-symbols` in [`htdocs/sass/base/_base.scss`](../../htdocs/sass/base/_base.scss).
5. Repeat steps from above.

Example SASS implementation
---------------------------

```sass
@mixin icon-font ($name, $onlyContent: true) {
	$content:  'X';
	@if ($name == 'prev') {
		$content:  "\e601";
	}
	@elseif ($name == 'next') {
		$content: "\e602";
	}
	// ... add some more

	@include toolshed-font-icon($fontfamily-symbols, $content, 1em, $onlyContent);
}
```

A simple solution for generating icon-classes

```sass
.icon {
	:before {
		@include icon-font('x');
	}

	@each $icon in (prev,next) {
		&--#{$icon}:before {
			@include icon-font('#{$icon}');
		}
	}
}
```

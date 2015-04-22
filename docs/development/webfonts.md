Webfonts
========

1. Add webfont files to `htdocs/fonts`. It may be wise to copy the whole content of a webfont zip/folder to the fonts directory, including demo- and license-files.
2. Load webfont in [`htdocs/sass/_fonts.scss`](../../htdocs/sass/_fonts.scss).
3. Set variable in [`htdocs/sass/_base.scss`](../../htdocs/sass/_base.scss).

Use icon font
-------------

1. Wisest choice: [Font Awesome](http://fortawesome.github.io/Font-Awesome/).
2. Set `$fontfamily-symbols` in [`htdocs/sass/_base.scss`](../../htdocs/sass/_base.scss).

Build your own icon font
------------------------

1. Use [IcoMoon](https://icomoon.io/#docs).
2. You may want to use [Font Awesome's icon mapping](https://github.com/FortAwesome/Font-Awesome/blob/master/scss/_variables.scss) for icon names and character codes.
3. Copy download folder to `htdocs/fonts`.
4. Set `$fontfamily-symbols` in [`htdocs/sass/_base.scss`](../../htdocs/sass/_base.scss).
5. Repeat steps from above.

Example SASS implementation
---------------------------

```sass
@mixin icon-font ($name, $onlyContent: false) {
	$content:  'X';
	$fontsize: 20px;
	@if ($name == 'play') {
		$content:  "\e603";
		$fontsize: 24px;
	}
	@elseif ($name == 'play-big') {
		$content:  "\e603";
		$fontsize: 48px;
	}
	@elseif ($name == 'close') {
		$content: "\e604";
		$fontsize: 24px;
	}
	// ... add some more

	@include toolshed-font-icon($fontfamily-symbols, $content, $fontsize, $onlyContent);
}
```

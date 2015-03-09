Webfonts
========

1. Add webfont files to `htdocs/fonts`. It may be wise to copy the whole content of a webfont zip/folder to the fonts directory, including demo- and license-files
2. Load webfont in `htdocs/sass/_fonts.scss`
3. Set variable in `htdocs/sass/_base.scss`

Use icon font
-------------

1. Wisest choice: [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

Build your own icon font
------------------------

1. Use [IcoMoon](https://icomoon.io/#docs)
2. Copy download folder to `htdocs/fonts`
3. Repeat steps from above

Example SASS implementation
---------------------------

```
@mixin icon-font ($name) {
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
		$content: "\e607";
		$fontsize: 24px;
	}
	// ... add some more

	@include toolshed-font-icon('example-font', $content, $fontsize);
}
```

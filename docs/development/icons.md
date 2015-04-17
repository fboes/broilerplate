Icons & sprites
===============

1. Copy all icons to a single PNG file
2. Set the center of each icon on a grid. Keep the spacing horizontally and vertically equal. Keep the distance from grid intersections to the edge of the PNG file half the grid width.
3. You may also want to generate a second PNG file with double the resolution for Retina displays. A naming convention for Retina files is: `ORIGINAL_FILENAME@2x.ORIGINAL_FILEENDING`
4. Build a mixin in [`htdocs/sass/_mixins.scss`](../../htdocs/sass/_mixins.scss) to call icons by name in SASS

You may also want to check if your sprite may be replace by an [icon webfonts](webfonts.md).

Sample mixin for icons
----------------------

```
@mixin sprite ($iconName, $yOffset: 0, $mode: 0) {
	$iconWidth:  20px;
	$iconHeight: $iconWidth;
	@if ($iconName == 'play') {
		$xOffset:    0;
		$iconWidth:  110px;
		$iconHeight: $iconWidth;
	}
	@elseif ($iconName == 'close') {
		$xOffset:    1;
		$iconWidth:  30px;
		$iconHeight: $iconWidth;
	}
	// ... add some more

	@include toolshed-grid-sprite-complete (
		"../images/example.png",
		"../images/example@2x.png",
		2640px, // width of example.png
		360px,  // height of example.png
		120px,  // grid spacing
		120px,  // grid spacing
		$iconWidth,
		$iconHeight,
		$xOffset,
		$yOffset,
		$mode
	);
}
```

Favicons
========

Generate your favicon in different sizes. For the current state of affairs check out ["Favicon Generator - For real"](https://realfavicongenerator.net/). All favicon files should be located in the document root directory.

There are also images used for [Microsoft's `browserconfig.xml`](https://msdn.microsoft.com/en-us/library/ie/dn320426(v=vs.85).aspx).

You may want to use [ImageMagick](http://www.imagemagick.org/) to convert your images to rectangular icons…

```bash
for SIZE in "16x16" "32x32" "128x128" "180x180" "192x192" "270x270" "512x512" "558x270" "558x558"; do
  convert images/logo.png -resize "${SIZE}^" -gravity center -crop ${SIZE}+0+0 +repage favicon-${SIZE}.png
done
convert images/logo.png -resize "32x32^" -gravity center -crop ${SIZE}+0+0 +repage favicon.ico

```

…or circular icons:

```shell
# @see http://www.imagemagick.org/Usage/thumbnails/#rounded
for SIZE in "16x16" "32x32" "128x128" "180x180" "192x192" "270x270" "512x512" "558x270" "558x558"; do
  convert images/logo.png -resize "${SIZE}^" -gravity center -crop ${SIZE}+0+0 \
  -alpha set \( +clone -distort DePolar 0 -virtual-pixel HorizontalTile -background None -distort Polar 0 \) \
  -compose Dst_In -composite -trim \
  +repage favicon-${SIZE}.png
done
convert images/logo.png -resize "${SIZE}^" -gravity center -crop 32x32+0+0 \
-alpha set \( +clone -distort DePolar 0 -virtual-pixel HorizontalTile -background None -distort Polar 0 \) \
-compose Dst_In -composite -trim \
+repage favicon.ico
```

OG:Images
---------

Every page should have it's own preview image, referenced by this code:

```html
<meta property="og:image" content="{{BASE_URL}}{{IMAGE_URL}}" />
```

According to Facebook this image should be at least 200×200 pixels.

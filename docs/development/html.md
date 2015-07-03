HTML best practices
===================

Use [proper `rel`-attributes](http://microformats.org/wiki/existing-rel-values) for links. This helps search engines to better understand the structure of your page, and improves pre-caching of pages.

Important `rel`-attributes:

* `home`
* `prev`
* `next`
* `tag`
* `download`
* `search`
* `help`
* `nofollow`
* `canonical`
* `alternate` (also in combination with `hreflang`-attribute)

Accessibility
-------------

* Use [`aria-label` & `aria-hidden` for improved accessibility](https://dev.opera.com/articles/ux-accessibility-aria-label/)

Images & responsive layout
--------------------------

If you want to use responsive images it is important to understand the [`srcset` and `sizes`](http://ericportis.com/posts/2014/srcset-sizes/). The single most important example is:

```html
<img src="small.jpg" srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w" alt="A rad wolf" />
```

You may want to use [picturefill.js](http://scottjehl.github.io/picturefill/) to help older browsers to understand the `srcset`-attribute.

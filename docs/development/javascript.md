Javascript
==========

1. You may want to update your local copy of [jQuery](http://jquery.com/) in `htdocs/js/vendor/`. Replace the jQuery call in your local HTML (near the bottom) for this to work.
2. Optional: For touch interaction add [jQuery.event.swipe](http://stephband.info/jquery.event.swipe/) to `htdocs/js/vendor/` and add a `<script></script>` call in your HTML footer.
3. Add new functionality via [`htdocs/js/main.js`](../../htdocs/js/main.js).
4. Add JS libraries to `htdocs/js/vendor/`.

Oh, BTW: [You might not need jQuery](http://youmightnotneedjquery.com/).

Adding new functionality
------------------------

1. Build a new (jQuery) plugin in [`htdocs/js/main.js`](../../htdocs/js/main.js).
2. Build a selector at the end of [`htdocs/js/main.js`](../../htdocs/js/main.js) to target the element you want to animate, and chain it to your plugin.

You may want to combine multiple events to a single selector. It is not unusual to have a `body` selector for reacting to modal dialogs or general link behavior.

function isTouch () {
	'use strict';
	return 'ontouchstart' in window;
}

$(document).ready(function() {
	'use strict';
	$('body').bodyInteraction(); // ({})
	$('#navigation').navigationInteraction(); // ({})
	$('#main').mainInteraction(); // ({})

	//$(window).resize(function() {});
	//$(window).scroll(function() {});
});

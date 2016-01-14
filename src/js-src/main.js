(function ($) {
	'use strict';
	$(document).ready(function() {
		$('body').bodyInteraction(); // ({})
		$('#navigation').navigationInteraction(); // ({})
		$('#main').mainInteraction(); // ({})

		//$(window).resize(function() {});
		//$(window).scroll(function() {});
	});
})(jQuery);

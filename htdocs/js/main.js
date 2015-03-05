/*global $,console */
(function ($) {
	'use strict';
	$.fn.exampleInteraction = function () { // function (options)
		return this.each(function() {
			var main = {
				/*options : $.extend({},options),*/
				elements : {
					parent : null
				},
				/*values : {},*/
				init : function (el) {
					var that = this;

					this.elements.parent = el;
					this.elements.parent.on('click.exampleInteraction', function (event) {
						event.preventDefault();
						event.stopPropagation();
						// Your stuff here
						console.log($(this));
					});
				}
			};

			main.init($(this));
		});
	};
}($));

// You may want to move this someplace else
$(document).ready(function() {
	'use strict';
	$('.js-exampleInteraction').exampleInteraction();
});

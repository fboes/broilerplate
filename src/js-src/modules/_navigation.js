(function ($) {
	'use strict';
	$.fn.navigationInteraction = function () { // function (options)
		return this.each(function() {
			var main = {
				/*options : $.extend({},options),*/
				elements : {
					parent : null
				},
				/*values : {},*/
				init : function (el) {
					//var that = this;
					this.elements.parent = el;

					// Your stuff here

					this.elements.parent.on('click.navigation', 'a', function (event) {
						event.preventDefault();
						event.stopPropagation();
						// Your stuff here
						// console.log($(this));
					});
				}
			};

			main.init($(this));
		});
	};
}( jQuery ));

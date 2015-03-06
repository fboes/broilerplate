/*global $ */
(function ($) {
	'use strict';
	$.fn.bodyInteraction = function () { // function (options)
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

					this.elements.parent.on('click.body', '.js-body-example', function (event) {
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

	$.fn.mainInteraction = function () { // function (options)
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

					this.elements.parent.on('click.main', '.js-main-demo', function (event) {
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
}($));

$(document).ready(function() {
	'use strict';
	$('body').bodyInteraction(); // ({})
	$('#navigation').navigationInteraction(); // ({})
	$('#main').mainInteraction(); // ({})
});

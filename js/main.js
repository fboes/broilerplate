/*global console */

var exampleMachine = function(parentEls) { // function(parentEls, parentOptions)
	'use strict';
	Array.prototype.filter.call(parentEls, function(el) {
		var main = {
			/*options : {},*/
			elements : {
				parent : null
			},
			/*values : {},*/
			init : function (el) {
				/*var attrname;
				for (attrname in parentOptions) {
					if (parentOptions.hasOwnProperty(attrname)) {
						this.options[attrname] = parentOptions[attrname];
					}
				}*/
				this.elements.parent = el;
				if (this.elements.parent !== undefined && this.elements.parent !== null) {
					this.bindEvents();
					this.update();
				}
			},
			bindEvents : function () {
				var that = this;
				// Your stuff here
				this.elements.parent.addEventListener('click', function ( event ) {
					event.preventDefault();
					event.stopPropagation();
					// Your stuff here
					console.log(this);
					that.update();
				},false);
			},
			update : function () {
				// Your stuff here
				console.log('exampleMachine wins');
			}
		};
		main.init(el);
	});
};

// You may want to move this someplace else
window.onload = function() {
	'use strict';
	//exampleMachine([document.getElementById('container')], {});
	exampleMachine(document.getElementsByClassName('js-exampleMachine'));
};

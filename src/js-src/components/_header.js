// see http://youmightnotneedjquery.com/

(function () {
  'use strict';

  var el = {
    header: document.querySelector('#banner'),
  };

  el.header.addEventListener('click', function(event) {
    // event.preventDefault;
    event.currentTarget.classList.toggle('clicked');
  });
})();

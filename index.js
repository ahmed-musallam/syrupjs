/* jshint undef: true, unused: true, esversion: 6 */
/* globals $, document */
(($) => {
  "use strict";
  const attr = {
    syrup: 'data-syrup',
    ready: 'data-syrup-ready'
  };
  const buildEventObj = ($el) => {
    return $el.attr(attr.syrup)
      .split(',')
      .map(str => str.trim()) // trim string
      .map(str => str.split(':', 2)) // split each pair over ":"
      .map(pair => [ // convert second element of each pair to a publish function
        pair[0],
        (function (e) {
          $.publish(this, e, $el);
        }).bind(pair[1])
      ])
      .reduce((acc, cur) => { // reduce the array of pairs to an object
        acc[cur[0]] = cur[1];
        return acc;
      }, {});
  };

  $.fn.syrup = function() {
    const $el = $(this);
    let syrupEls = $el.find('[' + attr.syrup + ']');
    if ($el.attr(attr.syrup)) syrupEls.add($el);
    syrupEls.each((i, el) => {
      var $el = $(el);
      if ($el.attr(attr.ready)) return; // already initialized
      else {
        $el.on(buildEventObj($(el)));
        $el.attr(attr.ready, 'true');
      }
    });
  };

  // init all syrup elements
  $(() => $(document.body).syrup());
})($);
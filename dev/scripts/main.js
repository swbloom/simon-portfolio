const app = {};

$(document).ready(() => {
    const $header = $("header");
    const $nav = $(".hero-nav-wrapper");
    const waypoint =  new Waypoint({
      element: $('main'),
      handler: function(direction) {
        if (direction === "down") {
          $('body').addClass('stuck');
          $nav.addClass('sticky');
          TweenLite.to($nav, 0.4, {
            top: 0,
            ease: Power1.easeInOut
          });
        } else {
          TweenLite.to($nav, 0.1, {
            top: -100,
            ease: Power1.easeInOut,
            onComplete: function() {
              $nav.removeClass('sticky');
              $('body').removeClass('stuck');
            }
          });
        }
      }
    });
    $('calendar').length && $('.calendar').clndr();
});

const app = {};

$(document).ready(() => {

    // Sticky Nav
    const $header = $("header");
    const $nav = $(".hero-nav-wrapper");

    // Masonry
    const $blogRoll = $('.blogroll-articles');

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

    if ($blogRoll.length) {
      $blogRoll.isotope({
         itemSelector: '.blogroll-excerpt',
         layoutMode: 'vertical'
      });

      $('button.tag').on('click', function(){
        const filter =  $(this).data('filter');
        $blogRoll.isotope({filter: filter});
      });

    }

    $('.calendar').length && $('.calendar').clndr({
      template:clndrTemplate,
      daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    });
});

const clndrTemplate = `
<div class="clndr-controls">
    <div class="clndr-previous-button"><img src="images/svgs/calendar-arrow-left.svg"></div>
    <div class="month"><%= month %> <span class="clndr-year"><%= year %></span></div>
    <div class="clndr-next-button"><img src="images/svgs/calendar-arrow-right.svg"></div>
</div>
<div class="clndr-grid">
    <div class="days-of-the-week">
    <% _.each(daysOfTheWeek, function (day) { %>
        <div class="header-day"><%= day %></div>
    <% }); %>
        <div class="days">
        <% _.each(days, function (day) { %>
            <div class="<%= day.classes %>"><%= day.day %></div>
        <% }); %>
        </div>
    </div>
</div>
`

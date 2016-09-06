const app = {};

app.post = function() {
  const $post = $('article.post');
  const $sections = $('.post-content section');
  const $tableOfContents = $('.table-of-contents');

  if (!$post.length) return;

  $sections.each(function(){
    const sectionName = $(this).data('section');
    $tableOfContents.append(`<li>${sectionName}</li>`);
  });
    $tableOfContents.append(`<li>Tweet This</li>`);
}

app.sticky = function() {
  // Sticky Nav
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
}

app.masonry = function() {
  // Masonry
  const $blogRoll = $('.blogroll-articles');
  const $tags = $('button.tag');

  if ($blogRoll.length) {
    $blogRoll.isotope({
       itemSelector: '.blogroll-excerpt',
       layoutMode: 'vertical'
    });

    $tags.on('click', function(){
      $tags.removeClass('tag--active');
      $(this).addClass('tag--active');
      const filter =  $(this).data('filter');
      $blogRoll.isotope({filter: filter});
    });

  }
}

app.calendar = function() {
  app.clndrTemplate = `
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

  const events = [
    {
      startDate: '2016-09-26',
      endDate: '2016-09-30',
      title: 'Available'
    }
  ]

  $('.calendar').clndr({
   events: events,
   multiDayEvents: {
    endDate: 'endDate',
    startDate: 'startDate'
   },
   template: app.clndrTemplate,
   daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
 });
}

$(document).ready(() => {
    app.sticky();
    $('.calendar').length && app.calendar();
    app.masonry();
    app.post();
});

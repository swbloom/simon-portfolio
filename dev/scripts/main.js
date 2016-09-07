const app = {};

app.post = function() {
  const $post = $('article.post');
  const $sections = $('.post-content section');
  const $tableOfContents = $('.table-of-contents');

  if (!$post.length) return;

  let waypoint = new Waypoint({
    element: $('article.post'),
    handler: function(direction){
        direction === "down" ? $tableOfContents.addClass('table-of-contents--fixed') : $tableOfContents.removeClass('table-of-contents--fixed');
    }
  });

  let footerWaypoint = new Waypoint({
    element: $('article.post'),
    handler: function(direction){
      let topPos = $tableOfContents.offset().top - $tableOfContents.parent().offset().top - $tableOfContents.parent().scrollTop();
      direction === "down" ? $tableOfContents.css({'position': 'absolute', 'top': topPos }) : $tableOfContents.removeAttr('style');
    },
    offset: 'bottom-in-view'
  });

  $tableOfContents.on('mouseenter', 'li', function(){
    TweenLite.to($tableOfContents, 1, {
      right: 0,
      ease: Power1.easeInOut,
      onComplete: function() {
      }
    })
  });

  $tableOfContents.on('mouseleave', 'li', function(){
    console.log('hovered');
    TweenLite.to($tableOfContents, 1, {
      right: -190,
      ease: Power1.easeInOut,
      onComplete: function() {
      }
    });
  });

  $sections.each(function(index){
    const sectionName = $(this).data('section');
    let waypoint = new Waypoint({
      element: $(this),
      handler: function(direction) {
        const corresponding = $(`[data-section='${sectionName}']`);
        direction === "down" ? corresponding.addClass('active') : corresponding.removeClass('active');
      },
      offset: 70
    })
    let listItem = `
      <li>
        <div class="table-of-contents-item" data-section="${sectionName}">
          <div class="table-of-contents-index">
            ${index}
          </div>
          <div class="table-of-contents-title">
            ${sectionName}
          </div>
        </div>
      </li>
    `
    $tableOfContents.append(listItem);
  });
    $tableOfContents.append(`
      <li>
        <div class="table-of-contents-item">
          <div class="table-of-contents-index table-of-contents-index--twitter">
          </div>
          <div class="table-of-contents-title">
            Tweet this
          </div>
        </div>
      </li>
    `);
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

  const footerInView = new Waypoint({
    element: $('main'),
    offset: 'bottom-in-vew',
    handler: function(direction) {
      // let topPos = $nav.offset().top - $nav.parent().offset().top - $nav.parent().scrollTop();
      // direction === "down" ? $nav.css({'position': 'absolute', 'top': topPos }) : $nav.removeAttr('style');
    }
  })
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

const app = {};

var isPage = function(page) {
  return $('body').is(`#${page}`) || $('body').is(`.${page}`);
}

app.codeFormat = function() {
  if (typeof hljs !== 'undefined') {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }
};

app.hamburger = function() {
  $("#hamburger").on('click', function(){
    $(this).toggleClass('is-active');
    $('.menu').toggleClass('toggled');
  });
};

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
          <?xml version="1.0" encoding="UTF-8" standalone="no"?>
          <svg width="21px" height="17px" viewBox="0 0 21 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
              <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch -->
              <title>Fill 3</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                  <g id="simonwbloom-home-V3-@2x" sketch:type="MSArtboardGroup" transform="translate(-569.000000, -4112.000000)" fill="#fff">
                      <g id="Group-24" sketch:type="MSLayerGroup" transform="translate(-11.000000, 3660.000000)">
                          <g id="Group-19" sketch:type="MSShapeGroup">
                              <g id="Group-18">
                                  <g id="Group-21" transform="translate(457.000000, 277.000000)">
                                      <g id="Group-14" transform="translate(0.000000, 75.000000)">
                                          <g id="Group-+-Or,-follow-me-in-the" transform="translate(0.000000, 30.000000)">
                                              <g id="Group" transform="translate(52.000000, 69.000000)">
                                                  <path d="M91.767,2.999 C91.002,3.338 90.183,3.567 89.319,3.671 C90.2,3.144 90.875,2.31 91.194,1.313 C90.371,1.8 89.458,2.156 88.488,2.347 C87.709,1.519 86.602,1 85.377,1 C83.025,1 81.116,2.909 81.116,5.264 C81.116,5.597 81.155,5.919 81.226,6.235 C77.687,6.055 74.547,4.36 72.445,1.782 C72.079,2.411 71.868,3.144 71.868,3.926 C71.868,5.4 72.621,6.707 73.765,7.471 C73.065,7.448 72.409,7.257 71.836,6.938 L71.836,6.991 C71.836,9.056 73.303,10.776 75.251,11.167 C74.894,11.266 74.518,11.318 74.13,11.318 C73.855,11.318 73.588,11.292 73.327,11.24 C73.869,12.934 75.442,14.165 77.307,14.2 C75.85,15.344 74.012,16.025 72.015,16.025 C71.672,16.025 71.333,16.002 71,15.964 C72.884,17.175 75.126,17.879 77.53,17.879 C85.369,17.879 89.652,11.385 89.652,5.754 C89.652,5.571 89.65,5.389 89.641,5.203 C90.472,4.604 91.196,3.856 91.767,2.999" id="Fill-3"></path>
                                              </g>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>
          </div>
          <div class="table-of-contents-title">
            Tweet this
          </div>
        </div>
      </li>
    `);

    const $firstPara = ($("#first-paragraph p"));
    const firstLetter = ($firstPara.text().slice(0,1));
    const para = ($firstPara.text().slice(1));
    const dropCap = $("<div class='dropcap'></div>").text(firstLetter);
    $firstPara.text(para);
    $(".first-para-text").prepend(dropCap);
}

app.sticky = function() {
  // Sticky Nav
  const $header = $("header");
  const $nav = $(".hero-nav-wrapper");



  const waypoint =  new Waypoint({
    element: $('main'),
    handler: function(direction) {
      if (direction === "down") {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

        if (w < 992) return;
        let $navClone = $nav.clone().addClass('nav-clone');
        $navClone.insertAfter($nav);
        $('body').addClass('stuck');
        $nav.addClass('sticky');
        TweenLite.to($nav, 0.4, {
          top: 0,
          ease: Power1.easeInOut
        });
      } else {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

        if (w < 992) return;
        TweenLite.to($nav, 0.1, {
          top: -100,
          ease: Power1.easeInOut,
          onComplete: function() {

            $nav.removeClass('sticky');
            $('.nav-clone').remove();
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

app.googleMap = function() {

  if (!isPage('contact')) return;
  //set your google maps parameters
	var $latitude = 51.5255069,
		$longitude = -0.0836207,
		$map_zoom = 14;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var $marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';

	//define the basic color of your map, plus a value for saturation and brightness
	var	$main_color = '#2d313f',
		$saturation= -20,
		$brightness= 5;

	//we define here the style of the map
	var style= [
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: $saturation}
			]
		},
	    {	//poi stands for point of interest - don't show these lables on the map
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    },
		{
			//don't show local road lables on the map
			featureType: "road.local",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show arterial road lables on the map
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		},
		//style different elements on the map
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]

		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		}
	];

	//set google map options
	var map_options = {
      	center: new google.maps.LatLng($latitude, $longitude),
      	zoom: $map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng($latitude, $longitude),
	    map: map,
	    visible: true,
	 	icon: $marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
}



$(document).ready(() => {
    app.sticky();
    $('.calendar').length && app.calendar();
    app.masonry();
    app.post();
    app.codeFormat();
    app.hamburger();
    app.googleMap();
});

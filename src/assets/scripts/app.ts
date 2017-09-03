$(document).ready(() =>
  $("#featured-products-carousel").owlCarousel({
    margin: 15,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      }
    }
  })
);
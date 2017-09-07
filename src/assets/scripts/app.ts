$(document).ready(() => {

  let featuredProductsCarousel = $("#featured-products-carousel");

  featuredProductsCarousel.owlCarousel({
    margin: 15,
    loop: true,
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
  });

  $("#carousel-next").click(() => featuredProductsCarousel.trigger("next.owl.carousel"));
  $("#carousel-prev").click(() => featuredProductsCarousel.trigger("prev.owl.carousel"));

});
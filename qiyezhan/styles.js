$(document).ready(function () {
  $(".header_right_app").click(function () {
    $(".nav_app").slideToggle(500);
  });

  $(function () {
    $("img.lazy").lazyload({ effect: "fadeIn" });
  });
});

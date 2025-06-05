$(function () {
  $(".menu-trigger").on("click", function () {
    if ($(".iziModal").hasClass("appear")) {
      $(".iziModal")
        .css({ opacity: 1.0 })
        .animate({ opacity: 0.0 }, 200, "swing", function () {
          $(".iziModal").removeClass("appear");
        });
    } else {
      $(".iziModal").addClass("appear");
      $(".iziModal")
        .css({ opacity: 0.0 })
        .animate({ opacity: 1.0 }, 300, "swing");
    }
    $(".menu-trigger,.menu a").toggleClass("active");
  });

  $(".menu-trigger").on("click", function () {
    if ($("#cursor").hasClass("openMenu")) {
      $("#cursor")
        .css({ opacity: 1.0 })
        .animate({ opacity: 0.0 }, 200, "swing", function () {
          $("#cursor").removeClass("openMenu");
        });
    } else {
      $("#cursor").addClass("openMenu");
      $("#cursor")
        .css({ opacity: 0.0 })
        .animate({ opacity: 1.0 }, 300, "swing");
    }
  });

  $(".tabArea label").click(function () {
    let index = $(".tabArea label").index(this);
    $(".tabpanel").css("display", "none");
    $(".tabpanel").eq(index).fadeIn(1000);
    $(".tabArea label").removeClass("select");
    $(this).addClass("select");
  });

  let cursor = $("#cursor");
  $(document).on("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursor.css({
      opacity: "1",
      top: y + "px",
      left: x + "px",
    });
  });

  $("a,label,button").on({
    mouseenter: function () {
      cursor.addClass("mouse_active");
    },
    mouseleave: function () {
      cursor.removeClass("mouse_active");
    },
  });

  if (
    navigator.userAgent.indexOf("iPhone") > 0 ||
    navigator.userAgent.indexOf("iPod") > 0 ||
    (navigator.userAgent.indexOf("Android") > 0 &&
      navigator.userAgent.indexOf("Mobile") > 0)
  ) {
    $("#cursor").css("display", "none");
  } else if (
    navigator.userAgent.indexOf("iPad") > 0 ||
    navigator.userAgent.indexOf("Android") > 0
  ) {
    $("#cursor").css("display", "none");
  } else if (
    navigator.userAgent.indexOf("Safari") > 0 &&
    navigator.userAgent.indexOf("Chrome") == -1 &&
    typeof document.ontouchstart !== "undefined"
  ) {
    $("#cursor").css("display", "none");
  }

  let ua = navigator.userAgent;
  let _UA = navigator.userAgent;
  if (_UA.indexOf("Android") > 0) {
    $(".p_reservation .ios").css("display", "none");
  } else if (_UA.indexOf("iPhone") > 0 || _UA.indexOf("iPad") > 0) {
    $(".p_reservation .and").css("display", "none");
  }

  let $ftr = $("footer");
  if (window.innerHeight > $ftr.offset().top + $ftr.outerHeight()) {
    $ftr.attr({
      style:
        "position:fixed; top:" +
        (window.innerHeight - $ftr.outerHeight()) +
        "px;",
    });
  }
});

$(function () {

  AOS.init();

  // Lock and unlock a page's scroll position. https://gist.github.com/barneycarroll/6550066
  // Locks the page -    $.scrollLock(true);
  // Unlocks the page -  $.scrollLock(false);
  $.scrollLock=function(){"use strict";var l=$("html"),o=!1,t={scrollLeft:$(window).scrollLeft(),scrollTop:$(window).scrollTop()},s={},c={"overflow-y":"scroll",position:"fixed",width:"100%"};function r(){var o,t=l.attr("style"),c={};t&&(o=t.split(/;\s/),$.each(o,function(l){if(l){var o=l.split(/\s:\s/);o.length<2||(c[o[0]]=o[1])}}),$.extend(s,c))}function n(){var s={};o||(t={scrollLeft:$(window).scrollLeft(),scrollTop:$(window).scrollTop()},r(),$.extend(s,c,{left:-t.scrollLeft+"px",top:-t.scrollTop+"px"}),l.css(s),$(window).scrollLeft(0).scrollTop(0),o=!0)}function e(){o&&(l.attr("style",$("<x>").css(s).attr("style")||""),$(window).scrollLeft(t.scrollLeft).scrollTop(t.scrollTop),o=!1)}return r(),function(l){arguments.length?l?n():e():o?e():n()}}();

  //
  // Menu button action
  //
  $('.menu-icon').on('click', function () {
    $('.header').addClass('show-menu');
    $.scrollLock(true);
  });
  $('.menu__close').on('click', function () {
    $('.header').removeClass('show-menu');
    $.scrollLock(false);
  });

  // 
  // Sign In show/hide
  // 
  $('.sign-in-button__link').on('click', function () {
    $('.sign-in').addClass('show-sign-in');
    $.scrollLock(true);

    $('.sign-in__close').on('click', function () {
      $('.sign-in').removeClass('show-sign-in');
      $.scrollLock(false);
    });

    // Focus after some time to fix conflict with addClass.
    setTimeout(
      function () {
        $('.sign-in__form > input:first-child').focus();
      },
      200
    );

    // For esc key press.
    $(document).on('keyup', function (e) {
      // On esc key press.
      if (27 === e.keyCode) {
        // If sign in form is opened.
        if ($('.sign-in').hasClass('show-sign-in')) {
          $('.sign-in').removeClass('show-sign-in');
          $.scrollLock(false);
        }
      }
    });

    // When the user clicks anywhere outside of the modal, close it
    var modal = document.getElementById('sign');
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.classList.remove('show-sign-in');
          $.scrollLock(false);
      }
    }
  });

  // 
  // Go to top button
  // 
  $('.go-to-top').on('click', function () {
    $('html, body').animate({scrollTop: 0}, 700);
    return false;
  });

  var $goto_button = $('.go-to-top');
  if ($goto_button.length) {
    $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > 500) {
        $goto_button.addClass('show-up');
      } else {
        $goto_button.removeClass('show-up');
      }
    });
  }

  // 
  // Image as background
  // 
  $('.ibg').each(function () {
    $(this).css({"background-image":"url(" + 
      $(this).children("img").attr('src') + ")"
    });
  });

  // 
  // Adaptive Video Player
  // 
  function adaptive_player () {
    let w = $(window).outerWidth();
    if (w < 992) {
      $('.video-js').removeClass('vjs-fill').addClass('vjs-16-9');
    } else {
      $('.video-js').removeClass('vjs-16-9').addClass('vjs-fill');
    }
  }
  $(window).resize(function () {
    adaptive_player ();
  });
  adaptive_player ();

  // Prevent href="#" going to top
  $('a[href="#"], a[href="register.html"]').on('click', function(e) {
    e.preventDefault();
  });

});
// ==UserScript==
// @name         Kubernetes document linker
// @namespace    https://kubernetes.io
// @include      https://kubernetes.io/*
// @version      0.1
// @description  Dynamically add buttons under anchor links, format and copy them for use in customer correspondences.
// @author       Tom Ellis
// @match        https://kubernetes.io/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


(function ($) {
  'use strict';

    var anchorLinks = $("a.anchorjs-link");
    var absoluteHref;
    var title;
    var $this;
    $.each(anchorLinks, function (){
        $this = $(this);
        absoluteHref =$this.prop('href');
        title = $this.attr('href').replace(/(^#)|(\-)/ig,' ').trim();
        $this.after("<div>" +
                    "<button class='js-get-link button button-primary' type='button' data-reference='"+absoluteHref+"' >Plain link</button>" +
                    "<button class='js-get-link button button-primary' type='button' data-reference='[] "+absoluteHref +" - "+ title +"'>[ ] Link - Title</button>" +
                    "<button class='js-get-link button button-primary' type='button' data-reference='[] "+title +" - "+ absoluteHref +"'>[ ] Title - Link</button>" +
                    "<div class='snackbar js-snackbar'>Copied link!</div>" +
                    "</div>"
                      );

    });

  $(".js-get-link").click(function () {

      var $that = $(this);
      var refrence = $that.data('reference');
      $that.parent().find('.js-snackbar').addClass('show');
      $that.parent().find('.js-snackbar').addClass('show').delay(2000).queue(function(next ){
          $(this).removeClass('show');
         next();
       });
      GM_setClipboard(refrence);

  });
})(jQuery);


GM_addStyle(`

  .button-primary {
   cursor: pointer;
   line-height: 24px;
   margin-right: 8px;
   padding: 0 10px;

  }
  /* The snackbar - position it at the bottom and in the middle of the screen */
  .snackbar {
    visibility: hidden;
    background-color: #333;
    border-radius: 19px;
    color: #fff;
    display: inline-block;
    font-size: 0.75rem;
    padding: 8px;
    text-align: center;
    z-index: 1;
  }

  .snackbar.show {
    visibility: visible;
  }

`);

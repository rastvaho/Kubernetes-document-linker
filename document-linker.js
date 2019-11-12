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
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

var $ = window.jQuery;

(function () {
  'use strict';

  $("a.anchorjs-link")
    .after("<div class=\"buttonDiv\"></div>")
    

  $("div.buttonDiv")
    .append("<button class=\"PlainLink btn btn-primary\" type=\"button\">Plain link</button>")
    .append("<button class=\"LinkFirst btn btn-primary\" type=\"button\">[ ] Link - Title</button>")
    .append("<button class=\"TitleFirst btn btn-primary\" type=\"button\">[ ] Title - Link</button>")
    .append("<div id=\"snackbar\">Copied link!</div>");

  $(".PlainLink").click(function () {
    var elements = GetElements(this);
    
    GM_setClipboard(elements.URL);
    showSnackBar();
  });

  $(".LinkFirst").click(function () {
    var elements = GetElements(this);
    var formatted = "[] " + elements.URL + " - " + elements.Title;
    
    GM_setClipboard(formatted);
    showSnackBar();
  });

    $(".TitleFirst").click(function () {
    var elements = GetElements(this);
    var formatted = "[] " + elements.Title + " - " + elements.URL;
    
    GM_setClipboard(formatted);
    showSnackBar();
  });

})();

function GetElements(el) {
  var anchor = $(el).parents(".buttonDiv").prev();
  var origin = $(anchor)[0].origin;
  var path = $(anchor)[0].pathname;
  var hash = $(anchor)[0].hash;
  var html = $(el).parents(".buttonDiv").prev().parent()
  var htmlTitle = $(html)[0].innerHTML
  var title = htmlTitle.substr(0, htmlTitle.indexOf('<a'));
  var url = origin + path + hash;

  return { "Title": title, "URL": url }
}

function showSnackBar() {
  var x = document.getElementById("snackbar");
  // Add class to the snackbar
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

GM_addStyle(`
 
  .btn {
    font-size: 16px;
    border-radius: 2px;
    border: 0;
    transition: .2s ease-out;
    color: #fff;
    background: #326CE6;
    margin: 2px 10px 2px 0px;
    padding: 5px 8px 5px 8px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .btn:hover {
    color: #fff;
    background-color: #2b61ce !important;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }

  /* The snackbar - position it at the bottom and in the middle of the screen */
  #snackbar {
    visibility: hidden; 
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #333; 
    color: #fff; 
    text-align: center; 
    padding: 8px; 
    position: fixed; 
    z-index: 1; 
    left: 50%; 
    bottom: 30px; 
    font-size: 16px;
  }

  #snackbar.show {
    visibility: visible; 
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  /* Animations to fade the snackbar in and out */
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
`);
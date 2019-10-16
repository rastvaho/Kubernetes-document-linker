// ==UserScript==
// @name         Kubernetes document linker
// @namespace    https://kubernetes.io
// @include      https://kubernetes.io/*
// @version      0.1
// @description  Copy and format a link when user selects an anchor link.
// @author       Tom Ellis
// @match        https://kubernetes.io/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

(function () {
  'use strict';

  var TitleFirst = "<button id=\"TitleFirst\" class=\"DocumentLinkerCopy\" type=\"button\">[ ] Title - Link</button>";
  var LinkFirst = "<button id=\"LinkFirst\" class=\"DocumentLinkerCopy\" type=\"button\">[ ] Link - Title</button>";

  $("a.anchorjs-link")
    .after("<div class=\"buttonDiv\"><button class=\"PlainLink\" type=\"button\">Plain link</button></div>");

   $(".PlainLink").click(function(){
      var anchor = $(this).parents(".buttonDiv").prev();
      var origin = $(anchor)[0].origin;
      var path = $(anchor)[0].pathname;
      var hash = $(anchor)[0].hash;

      var url = origin + path + hash;
      GM_setClipboard(url);
  });

})();

GM_addStyle(`
  .PlainLink {
background-color: #326CE6; /* Green */
border: none;
color: white;
padding: 5px 8px 5px 8px;
margin: 2px 10px 2px 0px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
border-radius: 5px;
}
`);

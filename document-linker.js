// ==UserScript==
// @name         Kubernetes document linker
// @namespace    https://kubernetes.io
// @include      https://kubernetes.io/*
// @version      0.1
// @description  Copy and format a link when user selects an anchor link.
// @author       Tom Ellis
// @match        https://kubernetes.io/*
// @grant        GM_addStyle
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';

    $("a.anchorjs-link").click(function(){
        var data = window.location.href;
        var heading = $(this).attr('href');
        var title = heading.substr(1);
        var arr = data.split('#');
        var k8sLink = arr[0] + heading;
        var formattedLink = "[]" + " - " + title + " - " + k8sLink;

        copyStringToClipboard(formattedLink);
    });
    var PlainLink = "<button class=\"CopyButton\" type=\"button\">Plain Link</button>";
    var TitleLink = "<button class=\"CopyButton\" type=\"button\">[ ] Title - Link</button>";
    var LinkTitle = "<button class=\"CopyButton\" type=\"button\">[ ] Link - Title</button>";
    $("a.anchorjs-link").after("<div>" + PlainLink + TitleLink + LinkTitle + "</div>");
})();

function copyStringToClipboard (str) {
   var element = document.createElement('textarea');
   element.value = str;
   // Set non-editable to avoid focus and move outside of view
   element.setAttribute('readonly', '');
   element.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(element);
   // Select text inside element
   element.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(element);
}


GM_addStyle ( `
    .CopyButton {
  background-color: #326CE6; /* Green */
  border: none;
  color: white;
  padding: 5px 8px 5px 8px;
  margin: 2px 10px 2px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 5px;
}
`);

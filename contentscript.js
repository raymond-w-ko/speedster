var s = document.createElement("script");
s.src = chrome.extension.getURL("speedster.js");
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
  s.parentNode.removeChild(s);
};

var l = document.createElement("link");
l.href = chrome.extension.getURL("speedster.css");
l.rel = "stylesheet";
(document.head || document.documentElement).appendChild(l);

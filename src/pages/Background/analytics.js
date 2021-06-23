// chrome extension incompatible with more modern GA libraries (analytics.js / gtag.js)

// eslint-disable-next-line no-use-before-define
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-163248053-3']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

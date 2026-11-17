// Homepage: mobile nav toggle + scroll-spy active link.
(function () {
  document.body.classList.add('js-ready');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var seen = new Map();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen.set(en.target.id, en.intersectionRatio); });
      var bestId = null, best = 0;
      seen.forEach(function (ratio, id) { if (ratio > best) { best = ratio; bestId = id; } });
      if (bestId) {
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + bestId;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function (s) { obs.observe(s); });
  }
})();

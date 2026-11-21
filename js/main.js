/* HADID SAREKA — portfolio interactions */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- sticky nav ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var d = parseInt(en.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { en.target.classList.add('is-in'); }, d);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- animated counters ---------- */
  var nums = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce) { el.textContent = target; return; }
    var dur = 1400, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { cio.observe(el); });
  } else {
    nums.forEach(runCount);
  }

  /* ---------- unified 2.5D motion: scroll tilt + mouse parallax + breathing ----------
     One RAF loop owns the character transform so nothing fights over `transform`.
     The image stays a flat PNG, but perspective + rotateY/rotateX + translateZ
     give a convincing 2.5D depth effect driven by scroll position.            */
  var char = document.getElementById('heroChar');
  var hero = document.querySelector('.hero');
  var logo = document.querySelector('.hero__logo');

  if (char && !reduce && window.matchMedia('(min-width: 861px)').matches) {
    var mx = 0, my = 0, cmx = 0, cmy = 0;   // pointer target / smoothed
    var sp = 0, csp = 0;                    // scroll progress / smoothed
    var running = false, visible = true;

    function readScroll() {
      var vh = window.innerHeight || 1;
      var top = hero ? hero.offsetTop : 0;
      sp = Math.max(0, Math.min(1, (window.scrollY - top) / (vh * 0.85)));
    }
    function ease(p) { return 1 - Math.pow(1 - p, 3); }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      wake();
    }, { passive: true });
    window.addEventListener('scroll', function () { readScroll(); wake(); }, { passive: true });
    window.addEventListener('resize', readScroll, { passive: true });

    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) wake();
      }, { rootMargin: '240px' }).observe(hero);
    }

    function frame(ts) {
      cmx += (mx - cmx) * 0.055;
      cmy += (my - cmy) * 0.055;
      csp += (sp - csp) * 0.09;

      var p = ease(csp);
      var breath = Math.sin(ts / 1750) * 6;

      // scroll = primary tilt; pointer = lighter secondary tilt
      var ry = -14 * p + cmx * 7;
      var rx = 5 * p + cmy * 4;
      var tz = -55 * p;
      var sc = 1 - 0.07 * p;
      var ty = breath - 28 * p + cmy * -10;
      var tx = cmx * -14;

      char.style.transform =
        'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,' + tz.toFixed(2) + 'px)' +
        ' rotateY(' + ry.toFixed(2) + 'deg) rotateX(' + rx.toFixed(2) + 'deg)' +
        ' scale(' + sc.toFixed(4) + ')';

      if (logo) {
        logo.style.transform = 'translate3d(' + (cmx * -9).toFixed(2) + 'px,' +
                               (-14 * p + cmy * -4).toFixed(2) + 'px,0)';
      }
      if (visible) { requestAnimationFrame(frame); } else { running = false; }
    }
    function wake() { if (!running && visible) { running = true; requestAnimationFrame(frame); } }

    readScroll();
    wake();
  }

  /* ---------- anchor offset for fixed nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();

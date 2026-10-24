(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mobile-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      nav.hidden = open;
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.hidden = true; }
    });
  }
  document.querySelectorAll('form.enquiry').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      f.querySelector('.form-status').textContent = f.getAttribute('data-demo-msg');
    });
  });
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o) {
          var on = o === t;
          o.setAttribute('aria-selected', String(on));
          document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
        });
      });
    });
  });
  document.querySelectorAll('[data-filter]').forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute('data-filter'));
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-value]');
      if (!b) return;
      bar.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      var v = b.getAttribute('data-value');
      target.querySelectorAll('[data-kind]').forEach(function (card) {
        card.hidden = v !== 'all' && card.getAttribute('data-kind') !== v;
      });
    });
  });
  document.querySelectorAll('form[data-search]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var kind = f.querySelector('input[name="kind"]:checked').value;
      var btn = document.querySelector('[data-filter] button[data-value="' + kind + '"]');
      if (btn) btn.click();
      document.getElementById('homes').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- Motion ----------
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var groups = ['.sec-head', '.svc-grid > *', '.team-grid > *', '.faq > *', '.home-grid > *', '.area-grid > *',
    '.guide > li', '.steps > li', '.process > li', '.timeline > li', '.table-wrap', '.fees-note',
    '.contact-inner > *', '.areas-note', '.sec-head-row .filter'];
  var targets = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.hasAttribute('data-reveal')) return;
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--d', Math.min(i, 6) * 80 + 'ms');
      targets.push(el);
    });
  });
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Parallax for photo heroes
  var para = document.querySelector('[data-parallax]');
  if (para && !reduce) {
    var tick = false;
    var update = function () {
      var r = para.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) para.style.setProperty('--py', (window.scrollY * 0.25).toFixed(1) + 'px');
      tick = false;
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  }
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var now = new Date();
    var y = now.getMonth() === 0 && now.getDate() <= 31 ? now.getFullYear() : now.getFullYear() + 1;
    var target = new Date(y, 0, 31, 23, 59);
    var days = Math.max(0, Math.ceil((target - now) / 86400000));
    if (reduce) { cd.textContent = days; }
    else {
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 1400);
        cd.textContent = Math.round(days * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      setTimeout(function () { requestAnimationFrame(step); }, 500);
    }
  }
})();

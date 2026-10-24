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
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var now = new Date();
    var y = now.getMonth() === 0 && now.getDate() <= 31 ? now.getFullYear() : now.getFullYear() + 1;
    var target = new Date(y, 0, 31, 23, 59);
    var days = Math.max(0, Math.ceil((target - now) / 86400000));
    cd.textContent = days;
  }
})();

// ===== Scroll progress bar =====
(function () {
  var fill = document.getElementById('scroll-progress-fill');
  if (!fill) return;
  function update() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    fill.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ===== Scroll reveal =====
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// ===== Mobile nav toggle =====
(function () {
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if (!navToggle || !navMenu) return;
  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { navMenu.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) { navMenu.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });
})();

// ===== Mark current page's nav link active =====
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlink').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
})();

/* ─── MOBILE NAV TOGGLE ──────────────────────────────── */
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const overlay   = document.getElementById('nav-overlay');
  const closeBtn  = document.getElementById('nav-overlay-close');
  const overlayLinks = overlay ? overlay.querySelectorAll('a') : [];

  function openMenu() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);

  overlayLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

/* ─── NAV SCROLL BEHAVIOR (index.html only) ─────────── */
(function () {
  var nav = document.getElementById('main-nav');
  if (!nav || !nav.classList.contains('nav--transparent')) return;

  var hero = document.querySelector('.hero--full');
  if (!hero) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        nav.classList.remove('nav--solid');
        nav.classList.add('nav--transparent');
      } else {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      }
    });
  }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });

  observer.observe(hero);
})();

/* ─── SMOOTH SCROLL FOR MENU CATEGORY LINKS ─────────── */
(function () {
  var NAV_OFFSET = 68 + 20;

  var allCatLinks = document.querySelectorAll('.menu-sidebar__nav a, .menu-pill-nav a');
  if (!allCatLinks.length) return;

  allCatLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* Highlight active category on scroll */
  var sections = document.querySelectorAll('.menu-category');
  if (!sections.length) return;

  function onScroll() {
    var scrollY = window.pageYOffset + NAV_OFFSET + 10;
    var active  = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) active = sec.id;
    });
    allCatLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

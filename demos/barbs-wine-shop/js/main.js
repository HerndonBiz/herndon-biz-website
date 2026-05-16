(function () {
  'use strict';

  // ============================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ============================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileClose  = document.getElementById('mobileNavClose');

  function openMobileNav() {
    mobileNav.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileNav);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // ============================================================
  // 2. STICKY CATEGORY PILLS — shop.html only
  // ============================================================
  const categoryNav = document.getElementById('categoryNav');

  if (categoryNav) {
    const pills    = categoryNav.querySelectorAll('.cat-pill');
    const sections = Array.from(
      document.querySelectorAll('.category-section[id]')
    );

    // Smooth scroll with offset on pill click
    pills.forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = pill.getAttribute('data-target');
        const target   = document.getElementById(targetId);
        if (!target) return;

        const navHeight      = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;
        const pillRowHeight  = categoryNav.offsetHeight;
        const offset         = navHeight + pillRowHeight + 20;
        const top            = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // Highlight active pill based on scroll position
    const navHeight     = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;
    const pillRowHeight = categoryNav.offsetHeight;
    const rootMargin    = `-${navHeight + pillRowHeight + 20}px 0px -40% 0px`;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          pills.forEach(function (pill) {
            pill.classList.toggle('active', pill.getAttribute('data-target') === id);
          });
        }
      });
    }, { rootMargin, threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

})();

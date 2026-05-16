/* Bobby's HVAC — main.js */

(function () {
  'use strict';

  /* ===== 1. Mobile navigation toggle ===== */
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.nav-overlay');
  const overlayClose = document.querySelector('.nav-overlay-close');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeNav() {
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (overlayClose) {
    overlayClose.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ===== 2. Bottom phone bar is CSS-driven (display:flex on mobile) ===== */

  /* ===== 3. Smooth scroll for services page ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ===== 4. Form pre-selection from URL query param ===== */
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  if (serviceParam) {
    const select = document.getElementById('service-select');
    if (select) {
      const option = Array.from(select.options).find(
        function (o) { return o.value === serviceParam; }
      );
      if (option) {
        select.value = serviceParam;
      }
    }
  }

  /* ===== Active nav link ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

})();

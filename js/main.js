/* ===========================
   HERNDON BUSINESS SERVICES
   Main JavaScript
   =========================== */

// --- Nav scroll shadow ---
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile hamburger ---
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// --- Close mobile menu on link click ---
document.querySelectorAll('.nav__mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- Active nav link ---
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// --- Contact form ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        document.getElementById('form-success').style.display = 'block';
        contactForm.style.display = 'none';
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
      alert('Something went wrong. Please email herndonbizservices@gmail.com directly.');
    }
  });
}

// --- Intersection observer fade-in ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.value-card, .pricing-card, .process-step, .portfolio-card, .perf-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });
document.querySelectorAll('.value-card, .pricing-card, .process-step, .portfolio-card, .perf-card').forEach(el => {
  el.addEventListener('transitionend', () => {}, { once: true });
});

// Add visible class styles via JS
const style = document.createElement('style');
style.textContent = '.value-card.visible, .pricing-card.visible, .process-step.visible, .portfolio-card.visible, .perf-card.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

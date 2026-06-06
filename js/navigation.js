/**
 * navigation.js — Mobile menu, scroll effects, smooth scroll
 * @module Navigation
 */

/**
 * Initializes all navigation behaviors.
 * @param {Object} config
 * @param {string} config.navSelector        - Nav element selector
 * @param {string} config.mobileMenuSelector - Mobile menu panel selector
 * @param {string} config.mobileBtnSelector  - Hamburger button selector
 * @param {string} config.scrolledClass      - Class added on scroll
 * @param {number} config.scrollThreshold    - Pixels before nav style changes
 */
export function initNavigation(config = {}) {
  const {
    navSelector = '.nav',
    mobileMenuSelector = '.nav__mobile-menu',
    mobileBtnSelector = '.nav__mobile-btn',
    scrolledClass = 'nav--scrolled',
    scrollThreshold = 50,
  } = config;

  const nav = document.querySelector(navSelector);
  const mobileMenu = document.querySelector(mobileMenuSelector);
  const mobileBtn = document.querySelector(mobileBtnSelector);

  if (!nav) return;

  // ---- Mobile Menu Toggle ----
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');

      const isOpen = mobileMenu.classList.contains('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Navbar Scroll Effect ----
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollThreshold) {
      nav.classList.add(scrolledClass);
    } else {
      nav.classList.remove(scrolledClass);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on init

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

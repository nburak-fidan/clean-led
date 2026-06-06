/**
 * animations.js — IntersectionObserver-based reveal, counters, spec bars
 * @module Animations
 */

/**
 * Initializes scroll-triggered reveal animations using IntersectionObserver.
 * Elements with `.reveal`, `.reveal--left`, `.reveal--right`, `.reveal--scale`,
 * or `.reveal-stagger` will be observed and receive `.reveal--active` when visible.
 * 
 * @param {Object} config
 * @param {string} config.activeClass   - Class to add when element is visible
 * @param {number} config.threshold     - Visibility percentage to trigger (0-1)
 * @param {string} config.rootMargin    - Observer root margin
 */
export function initRevealAnimations(config = {}) {
  const {
    activeClass = 'reveal--active',
    threshold = 0.15,
    rootMargin = '0px 0px -80px 0px',
  } = config;

  const revealElements = document.querySelectorAll(
    '.reveal, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger'
  );

  if (!revealElements.length) return;

  // Prefer IntersectionObserver; fall back to showing all on old browsers
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add(activeClass));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    { threshold, rootMargin }
  );

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Animates number counters from 0 to target.
 * Target value is read from `data-target` attribute.
 * Suffix is read from `data-suffix` attribute (e.g., "°", "x", " saat").
 *
 * @param {Object} config
 * @param {string} config.selector  - Counter elements selector
 * @param {number} config.duration  - Animation duration in ms
 */
export function initCounters(config = {}) {
  const {
    selector = '[data-counter]',
    duration = 2000,
  } = config;

  const counters = document.querySelectorAll(selector);
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  // Observe each counter and animate once visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  } else {
    counters.forEach(animateCounter);
  }
}

/**
 * Animates spec bar fills to their target width when they enter the viewport.
 * Target width is read from `data-width` attribute (e.g., "95%").
 *
 * @param {Object} config
 * @param {string} config.selector  - Spec bar fill elements selector
 */
export function initSpecBars(config = {}) {
  const {
    selector = '.spec-bar__fill',
  } = config;

  const bars = document.querySelectorAll(selector);
  if (!bars.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(bar => observer.observe(bar));
  } else {
    bars.forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }
}

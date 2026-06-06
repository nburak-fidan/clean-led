/**
 * main.js — Application entry point
 * Imports and initializes all modules.
 * @module Main
 */

import { initNavigation } from './navigation.js';
import { initRevealAnimations, initCounters, initSpecBars } from './animations.js';

/**
 * Simple form handler with success feedback.
 * Prevents default submission and shows a temporary success state.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalHTML = btn.innerHTML;

    // Show success state
    btn.innerHTML = `
      <svg style="width:1.1em;height:1.1em;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
      </svg>
      Talebiniz Alındı!
    `;
    btn.style.background = 'linear-gradient(135deg, #34d399, #10b981)';

    // Reset after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/**
 * Boots the entire application when DOM is ready.
 */
function boot() {
  initNavigation();
  initRevealAnimations();
  initCounters();
  initSpecBars();
  initContactForm();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

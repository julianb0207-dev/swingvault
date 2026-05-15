/* ============================================================
   SwingVault – main.js
   Handles: DE/EN language toggle, cookie banner
   ============================================================ */

(function () {
  'use strict';

  // ── Language Toggle ─────────────────────────────────────────
  let currentLang = localStorage.getItem('sv-lang') || 'de';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sv-lang', lang);

    document.querySelectorAll('[data-de]').forEach(el => {
      const text = lang === 'de' ? el.dataset.de : el.dataset.en;
      if (!text) return;
      // If element contains child elements (e.g. links), update innerHTML
      if (el.children.length === 0) {
        el.textContent = text;
      } else {
        el.innerHTML = text;
      }
    });

    document.documentElement.lang = lang;
    const label = document.getElementById('langLabel');
    if (label) label.textContent = lang === 'de' ? 'EN' : 'DE';
  }

  // ── Cookie Banner ───────────────────────────────────────────
  function initCookieBanner() {
    const banner  = document.getElementById('cookieBanner');
    const accept  = document.getElementById('cookieAccept');
    const decline = document.getElementById('cookieDecline');
    if (!banner) return;

    const stored = localStorage.getItem('sv-cookies');
    if (stored) { banner.classList.add('hidden'); return; }

    if (accept) accept.addEventListener('click', () => {
      localStorage.setItem('sv-cookies', 'accepted');
      banner.classList.add('hidden');
    });
    if (decline) decline.addEventListener('click', () => {
      localStorage.setItem('sv-cookies', 'declined');
      banner.classList.add('hidden');
    });
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        applyLanguage(currentLang === 'de' ? 'en' : 'de');
      });
    }
    applyLanguage(currentLang);
    initCookieBanner();
  });
})();
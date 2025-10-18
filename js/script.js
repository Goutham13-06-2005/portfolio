// js/script.js - complete interactions: menu, smooth scroll, contact form (Formspree), and footer year
document.addEventListener('DOMContentLoaded', () => {
  // ----- Header menu toggle -----
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // ----- Smooth scroll for in-page anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetSelector = this.getAttribute('href');
      if (!targetSelector || targetSelector === '#') return;
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          const icon = menuBtn && menuBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });

  // ----- Contact form (AJAX submit to Formspree) -----
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  // Use your Formspree endpoint here
  const endpoint = 'https://formspree.io/f/meorevya';

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!status) return;

      status.textContent = '';
      status.style.color = '';

      const nameEl = document.getElementById('cf-name');
      const emailEl = document.getElementById('cf-email');
      const messageEl = document.getElementById('cf-message');

      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      if (!name || !email || !message) {
        status.textContent = 'Please fill all fields.';
        status.style.color = '#f87171';
        return;
      }

      status.textContent = 'Sending…';
      status.style.color = '';

      try {
        const payload = new URLSearchParams();
        payload.append('name', name);
        payload.append('email', email);
        payload.append('message', message);

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: payload.toString(),
        });

        if (res.ok) {
          status.textContent = 'Message sent. Thank you!';
          status.style.color = '#86efac';
          form.reset();
          setTimeout(() => { if (status) status.textContent = ''; }, 4000);
        } else {
          const data = await res.json().catch(() => null);
          const errMsg = (data && data.error) ? data.error : 'Failed to send message.';
          status.textContent = errMsg;
          status.style.color = '#f87171';
        }
      } catch (err) {
        status.textContent = 'Network error. Try again later.';
        status.style.color = '#f87171';
        console.error('Contact submit error', err);
      }
    });
  }

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const key = 'portfolio-theme';
  const btn = document.getElementById('apply-live-theme');

  function applyLive() {
    document.body.classList.add('theme-live');
    localStorage.setItem(key, 'theme-live');
  }

  function load() {
    if (localStorage.getItem(key) === 'theme-live') document.body.classList.add('theme-live');
  }

  if (btn) btn.addEventListener('click', applyLive);
  load();
});

window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('page-loader').classList.add('hidden'); }, 1400);
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out' });
  }
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const burger = document.getElementById('burgerBtn');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('open'); burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  const burger = document.getElementById('burgerBtn');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

let lastScroll = 0;
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) { header.classList.add('hide'); }
  else { header.classList.remove('hide'); }
  lastScroll = current <= 0 ? 0 : current;
}, { passive: true });

function initCounters() {
  if (window.CountUp) {
    new CountUp.CountUp('stat1', 2.4, { prefix: '€', suffix: 'B+', decimalPlaces: 1, duration: 2 }).start();
    new CountUp.CountUp('stat2', 14, { suffix: '+', duration: 1.8 }).start();
    new CountUp.CountUp('stat3', 2019, { separator: '', duration: 2.2 }).start();
  }
}
const heroObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { initCounters(); heroObs.disconnect(); } });
}, { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObs.observe(heroStats);

const animObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); animObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => animObs.observe(el));

function showCookieBanner() {
  if (!localStorage.getItem('chalor_cookie_choice')) {
    setTimeout(() => { document.getElementById('cookie-banner').classList.add('show'); }, 2000);
  }
}
function setCookieChoice(choice) {
  localStorage.setItem('chalor_cookie_choice', choice);
  document.getElementById('cookie-banner').classList.remove('show');
}
showCookieBanner();

function handleFormSubmit() {
  const name = document.getElementById('f-name').value;
  const email = document.getElementById('f-email').value;
  if (!name || !email) { alert('Please provide your name and email address.'); return; }
  const btn = document.querySelector('.form-submit');
  btn.innerHTML = 'Enquiry Submitted <i class="ti ti-check"></i>';
  btn.style.background = '#1a6b3c'; btn.disabled = true;
}
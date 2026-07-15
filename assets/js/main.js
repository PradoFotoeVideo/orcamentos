/* ═══════════════════════════════════════
   MAIN — Lógica COMPARTILHADA
   ═══════════════════════════════════════ */

let currentSlide = 0;
let carouselInterval = null;

/* ── UTILITÁRIOS ── */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── HERO CARROSSEL (PARAMETRIZADO) ── */
function initHeroCarousel(images) {
  const heroBg = document.getElementById('heroBg');
  const ind = document.getElementById('carouselIndicators');
  if (!heroBg || !ind) return;

  images.forEach((img, i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide';
    s.style.backgroundImage = `url('${img}')`;
    if (i === 0) s.classList.add('active');
    heroBg.appendChild(s);

    const d = document.createElement('button');
    d.className = 'indicator';
    d.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => { showSlide(i); resetCarouselInterval(); });
    ind.appendChild(d);
  });

  startCarouselInterval();
}

function showSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  slides.forEach(el => el.classList.remove('active'));
  indicators.forEach(el => el.classList.remove('active'));
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
  currentSlide = index;
}

function showRandomSlide() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;
  let r;
  do { r = Math.floor(Math.random() * slides.length); } while (r === currentSlide);
  showSlide(r);
}

function startCarouselInterval() {
  carouselInterval = setInterval(showRandomSlide, 5000);
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  startCarouselInterval();
}

/* ── FADE-IN OBSERVER ── */
let fadeObserver = null;

function observeFadeInElements() {
  if (!fadeObserver) {
    fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  }
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    fadeObserver.observe(el);
  });
}

/* ── MENU MOBILE ── */
function initMobileMenu() {
  const h = document.getElementById('hamburger');
  const n = document.getElementById('navLinks');
  if (!h || !n) return;

  h.addEventListener('click', () => {
    h.classList.toggle('active');
    n.classList.toggle('active');
  });

  n.querySelectorAll('a').forEach(l => {
    l.addEventListener('click', () => {
      h.classList.remove('active');
      n.classList.remove('active');
    });
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.pageYOffset - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}
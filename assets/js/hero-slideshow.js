/**
 * hero-slideshow.js — Slideshow com crossfade (fade in / fade out)
 * 
 * USO: Incluir o script no HTML antes do pagina-foto.js:
 *   <script src="assets/js/hero-slideshow.js"></script>
 * 
 * Inicialização automática se PRADO.foto.heroSlides existir
 */
let hsInterval = null;
let hsIndex = 0;

function initHeroCarousel(slides) {
  const bg = document.getElementById('heroBg');
  const bgNext = document.getElementById('heroBgNext');
  const indicators = document.getElementById('carouselIndicators');
  if (!bg || !bgNext || !slides || slides.length === 0) return;

  if (hsInterval) clearInterval(hsInterval);

  bg.style.backgroundImage = `url('${slides[0]}')`;
  bg.classList.add('active');

  if (slides.length > 1) {
    bgNext.style.backgroundImage = `url('${slides[1]}')`;
  }

  if (indicators) {
    indicators.innerHTML = slides.map((_, i) =>
      `<span class="indicator${i === 0 ? ' active' : ''}" data-index="${i}"></span>`
    ).join('');
    indicators.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      if (idx !== undefined) mudarSlide(parseInt(idx), slides);
    });
  }

  hsInterval = setInterval(() => {
    hsIndex = (hsIndex + 1) % slides.length;
    mudarSlide(hsIndex, slides);
  }, 4000);
}

function mudarSlide(index, slides) {
  const bg = document.getElementById('heroBg');
  const bgNext = document.getElementById('heroBgNext');
  const dots = document.querySelectorAll('#carouselIndicators .indicator');
  if (!bg || !bgNext) return;

  const visivel = bg.classList.contains('active') ? bg : bgNext;
  const oculto  = bg.classList.contains('active') ? bgNext : bg;

  oculto.style.backgroundImage = `url('${slides[index]}')`;

  requestAnimationFrame(() => {
    visivel.classList.remove('active');
    oculto.classList.add('active');
    hsIndex = index;
  });

  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

document.addEventListener('DOMContentLoaded', () => {
  if (PRADO?.foto?.heroSlides) {
    initHeroCarousel(PRADO.foto.heroSlides);
  }
});

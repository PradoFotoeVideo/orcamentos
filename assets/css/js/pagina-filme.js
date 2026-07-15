/* ═══════════════════════════════════════
   PÁGINA FILMAGEM — Carrossel de Vídeos
   ═══════════════════════════════════════ */

let videoCarouselCurrent = 0;
let videoSlides = [];

/* ── CARROSSEL DE VÍDEOS 2×2 ── */
function initVideoCarousel() {
  const allVideos = PRADO.filme.videos;
  const shuffled = shuffleArray(allVideos);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(shuffled.length / itemsPerSlide);
  videoSlides = [];

  for (let i = 0; i < totalSlides; i++) {
    videoSlides.push(shuffled.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide));
  }

  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!track) return;

  videoSlides.forEach((group, slideIndex) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-slide';

    group.forEach(video => {
      const card = document.createElement('a');
      card.className = 'video-card';
      card.href = video.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.innerHTML = `
        <div class="video-thumb" style="background-image: url('${video.thumb}');"></div>
        <div class="video-overlay"><div class="play-icon"><i class="fas fa-play"></i></div></div>
        <div class="video-title">${video.title}</div>
      `;
      slideDiv.appendChild(card);
    });

    track.appendChild(slideDiv);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para slide ${slideIndex + 1}`);
    if (slideIndex === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToVideoSlide(slideIndex));
    dotsContainer.appendChild(dot);
  });

  prevBtn.addEventListener('click', () => goToVideoSlide(videoCarouselCurrent - 1));
  nextBtn.addEventListener('click', () => goToVideoSlide(videoCarouselCurrent + 1));
  goToVideoSlide(0);
}

function goToVideoSlide(index) {
  if (index < 0 || index >= videoSlides.length) return;
  videoCarouselCurrent = index;

  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === videoSlides.length - 1;
}

/* ── INIT ── */
function initPaginaFilme() {
  initHeroCarousel(PRADO.filme.heroSlides);
  initVideoCarousel();
  observeFadeInElements();
  initMobileMenu();
  initSmoothScroll();
}

document.addEventListener('DOMContentLoaded', initPaginaFilme);
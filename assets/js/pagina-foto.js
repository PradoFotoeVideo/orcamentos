/* 
   PÁGINA DE FOTOGRAFIA — Hero + Galeria + Paginação + Lightbox
    */

/* ── MENU MOBILE ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* ── SCROLL SUAVE ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── FADE-IN OBSERVER ── */
function observeFadeInElements() {
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}

/* ── SHUFFLE ── */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ── PRÉ-CARREGAR PROPORÇÕES REAIS DAS FOTOS ── */
function preCarregarProporcoes(urls) {
  return Promise.all(urls.map(url => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ url, ratio: img.naturalWidth / img.naturalHeight });
      img.onerror = () => resolve({ url, ratio: 1.5 });
      img.src = url;
    });
  }));
}

/* 
   GALERIA + PAGINAÇÃO
    */

const FOTOS_POR_PAGINA = 10;
let fotosCarregadas = 0;
let eventoAtual = 'todos';
let todasAsFotos = [];
let todasAsFotosEvento = [];
let lightboxFotos = [];
let lightboxCurrentIndex = 0;

/* ── INICIALIZAR ── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();

  if (!PRADO?.foto?.galleryPhotos) return;
  todasAsFotos = [...PRADO.foto.galleryPhotos];
  construirSeletorEventos();
  renderizarGaleria();

  observeFadeInElements();
  window.addEventListener('scroll', observeFadeInElements);

  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');
  const lb = document.getElementById('lightbox');

  if (lbClose) lbClose.addEventListener('click', fecharLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => mudarSlideLightbox(-1));
  if (lbNext) lbNext.addEventListener('click', () => mudarSlideLightbox(1));
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) fecharLightbox();
    });
  }
});

/* ── CONSTRUIR ABAS DE EVENTOS ── */
function construirSeletorEventos() {
  const container = document.getElementById('eventFilter');
  if (!container) return;

  container.appendChild(criarBtnEvento('Todos', 'todos', true));

  (PRADO.foto.eventos || []).forEach(ev => {
    container.appendChild(criarBtnEvento(ev.nome, ev.nome, false));
  });
}

function criarBtnEvento(label, valor, ativo) {
  const btn = document.createElement('button');
  btn.className = `event-filter-btn${ativo ? ' active' : ''}`;
  btn.textContent = label;
  btn.dataset.evento = valor;
  btn.addEventListener('click', () => selecionarEvento(valor));
  return btn;
}

/* ── SELECIONAR EVENTO ── */
function selecionarEvento(evento) {
  eventoAtual = evento;
  fotosCarregadas = 0;

  document.querySelectorAll('.event-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.evento === evento);
  });

  renderizarGaleria();
}

/* ── OBTER FATIA DE FOTOS DO EVENTO ── */
function obterFotosDoEvento() {
  if (eventoAtual === 'todos' || !PRADO.foto.eventos) return [...todasAsFotos];

  const eventos = PRADO.foto.eventos;
  const idx = eventos.findIndex(e => e.nome === eventoAtual);
  if (idx === -1) return [...todasAsFotos];

  let offset = 0;
  for (let i = 0; i < idx; i++) offset += eventos[i].total;

  return todasAsFotos.slice(offset, offset + eventos[idx].total);
}

/* ── RENDERIZAR GALERIA ── */
async function renderizarGaleria() {
  const grid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  const fotos = obterFotosDoEvento();
  todasAsFotosEvento = shuffleArray([...fotos]);

  const lote = todasAsFotosEvento.slice(0, FOTOS_POR_PAGINA + fotosCarregadas);
  fotosCarregadas = lote.length;

  const proporcoes = await preCarregarProporcoes(lote);

  let html = '';
  let colAtual = 0;
  const colunas = 4;

  for (let i = 0; i < proporcoes.length; i++) {
    const { url: foto, ratio } = proporcoes[i];
    const idx = i;

    if (colAtual >= colunas) colAtual = 0;

    const isVertical = ratio < 0.85;
    const isHorizontal = ratio > 1.35;

    let spanClass = '';
    let spanCols = 1;

    if (isVertical) {
      spanClass = 'grid-vertical';
      spanCols = 1;
    } else if (isHorizontal && colAtual <= 2) {
      spanClass = 'grid-horizontal';
      spanCols = 2;
    } else {
      spanClass = '';
      spanCols = 1;
    }

    colAtual += spanCols;

    html += `
      <div class="grid-item fade-in ${spanClass}" style="aspect-ratio: ${ratio}" onclick="abrirLightbox(${idx})">
        <img src="${foto}" alt="Foto de casamento" loading="lazy" />
        <div class="expand-icon"><i class="fas fa-expand"></i></div>
      </div>`;
  }

  grid.innerHTML = html;

  const restantes = fotos.length - fotosCarregadas;
  if (loadMoreBtn) {
    loadMoreBtn.style.display = restantes > 0 ? 'inline-flex' : 'none';
    if (restantes > 0) {
      const proxLote = Math.min(restantes, FOTOS_POR_PAGINA);
      loadMoreBtn.querySelector('span').textContent =
        `Carregar mais ${proxLote} fotos (${restantes} restantes)`;
      loadMoreBtn.onclick = () => renderizarGaleria();
    }
  }

  const counter = document.getElementById('galleryCounter');
  if (counter) {
    const nomeExibicao = eventoAtual === 'todos'
      ? 'todas as categorias'
      : eventoAtual;
    counter.textContent = `${fotosCarregadas} de ${fotos.length} fotos — ${nomeExibicao}`;
  }

  requestAnimationFrame(() => observeFadeInElements());
}

/* 
   LIGHTBOX
    */

function abrirLightbox(index) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  if (!lb || !img) return;

  lightboxCurrentIndex = index;
  lightboxFotos = todasAsFotosEvento;

  img.src = lightboxFotos[index];
  img.alt = 'Foto de casamento';

  if (counter) counter.textContent = `${index + 1} de ${lightboxFotos.length}`;

  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
  initKeyboardNav();
}

function fecharLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

function mudarSlideLightbox(direcao) {
  const img = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  if (!img || !lightboxFotos.length) return;

  lightboxCurrentIndex = (lightboxCurrentIndex + direcao + lightboxFotos.length) % lightboxFotos.length;
  img.src = lightboxFotos[lightboxCurrentIndex];
  if (counter) counter.textContent = `${lightboxCurrentIndex + 1} de ${lightboxFotos.length}`;
}

function initKeyboardNav() {
  document.removeEventListener('keydown', handleKeyboardNav);
  document.addEventListener('keydown', handleKeyboardNav);
}

function handleKeyboardNav(e) {
  if (e.key === 'Escape') fecharLightbox();
  if (e.key === 'ArrowLeft') mudarSlideLightbox(-1);
  if (e.key === 'ArrowRight') mudarSlideLightbox(1);
}

window.abrirLightbox = abrirLightbox;
window.fecharLightbox = fecharLightbox;
window.mudarSlideLightbox = mudarSlideLightbox;

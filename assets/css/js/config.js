/* ═══════════════════════════════════════
   CONFIG — Dados centralizados
   ═══════════════════════════════════════ */

const PRADO = {

  /* ── WHATSAPP ── */
  whatsapp: '5518981832328',

  /* ── REDES SOCIAIS ── */
  social: {
    instagram: 'https://instagram.com/pradofotoevideo',
    instagramHandle: '@pradofotoevideo',
    youtube: 'https://www.youtube.com/@pradofotoevideo5164'
  },

  /* ── PÁGINA DE FOTOGRAFIA ── */
  foto: {
    heroSlides: [
      'assets/images/SlideFotos/01.webp',
      'assets/images/SlideFotos/02.webp',
      'assets/images/SlideFotos/03.webp',
      'assets/images/SlideFotos/04.webp',
      'assets/images/SlideFotos/05.webp'
    ],
	
	eventos: [
    { nome: 'Andrezza & Glaucom', total: 19 },
    { nome: 'Larissa & Paulo', total: 26 },
	{ nome: 'Bianca & Hugo', total: 30 }
	],

    /* ── GALERIA ORGANIZADA POR PASTAS DE EVENTO ── */
	galleryPhotos: [

		// ═══════ CASAMENTO — Andrezza & Glaucom (19 fotos) ═══════
	  ...Array.from({ length: 19 }, (_, i) =>
		`assets/images/GaleriaFotos/casamentos/Casamento-Andrezza-Glaucom/foto (${i + 1}).jpg`),
		
		// ═══════ Ensaio — Larissa & Paulo (26 fotos) ═══════
	  ...Array.from({ length: 26 }, (_, i) =>
		`assets/images/GaleriaFotos/casamentos/larissa-paulo/foto (${i + 1}).jpg`),
		
		// ═══════ Ensaio — Bianca & Hugo (30 fotos) ═══════
	  ...Array.from({ length: 30 }, (_, i) =>
		`assets/images/GaleriaFotos/casamentos/bianca-hugo/foto (${i + 1}).jpg`)

	  // ═══════ ADICIONE OS DEMAIS EVENTOS AQUI ═══════
	  // Use sempre: `foto (${i + 1}).webp` ← esse é o padrão do Windows
	]
  },

  /* ── PÁGINA DE FILMAGEM ── */
  filme: {
    heroSlides: [
      'assets/images/SlideFotos/01.webp',
      'assets/images/SlideFotos/02.webp',
      'assets/images/SlideFotos/03.webp',
      'assets/images/SlideFotos/04.webp',
      'assets/images/SlideFotos/05.webp'
    ],
    videos: [
      { title: 'Pre-Wedding — Ianara & Thiago',    url: 'https://www.youtube.com/watch?v=yan7sjaHUw4', thumb: 'assets/images/GaleriaVideos/ianaraethiago.png' },
      { title: 'Casamento — Letícia & Vithor',      url: 'https://www.youtube.com/watch?v=uLsoSJD2FOs', thumb: 'assets/images/GaleriaVideos/leticiaevithor.png' },
      { title: 'Pre-Wedding — Bruna & Matheus',     url: 'https://youtu.be/GPrGZruopMg',                 thumb: 'assets/images/GaleriaVideos/brunaematheus.png' },
      { title: 'Teaser — Mayara & David',           url: 'https://youtu.be/ChXnyyCiPIs',                 thumb: 'assets/images/GaleriaVideos/mayaraedavid.png' },
      { title: 'Teaser — Debora & Gabriel',         url: 'https://youtu.be/oMmg1ATsDng',                 thumb: 'assets/images/GaleriaVideos/deboraegabriel.png' },
      { title: 'Pre-Wedding — Bárbara & Henrique',  url: 'https://youtu.be/xl-fdsO54sc',                 thumb: 'assets/images/GaleriaVideos/barbaraehenrique.png' },
      { title: 'Pre-Wedding — Leticia & Vithor',    url: 'https://youtu.be/Jt-C9sHe2UY',                 thumb: 'assets/images/GaleriaVideos/leticiaevithor2.png' },
      { title: 'Sameday — Bárbara & Henrique',      url: 'https://youtu.be/PC6snMlgx5o',                 thumb: 'assets/images/GaleriaVideos/barbaraehenrique2.png' },
      { title: 'Love Story — Nathália & Guilherme', url: 'https://youtu.be/34UHiZUetX0',                 thumb: 'assets/images/GaleriaVideos/nathaliaeguilherme.png' },
      { title: 'Teaser — Nathália & Henrique',      url: 'https://youtu.be/NIIwOGdlO3M',                 thumb: 'assets/images/GaleriaVideos/NATHALIAE HENRIQUE.png' },
      { title: 'Teaser — Andressa & Renato',        url: 'https://youtu.be/kOCNkmMSRlQ',                 thumb: 'assets/images/GaleriaVideos/andressaerenato.png' },
      { title: 'Love Story — Cris & Gu',            url: 'https://youtu.be/2aRooxBq3tQ',                 thumb: 'assets/images/GaleriaVideos/crisegu.png' },
      { title: 'Teaser — Rebeca & Fábio',           url: 'https://youtu.be/33Y_EK4UObQ',                 thumb: 'assets/images/GaleriaVideos/rebecaefabio.png' },
      { title: 'Sameday — Vivi & Sandro',           url: 'https://youtu.be/snwbdrxoHTU',                 thumb: 'assets/images/GaleriaVideos/viviesandro.png' },
      { title: 'Teaser — Nathália & Guilherme',     url: 'https://youtu.be/IUWf2Dk1Olo',                 thumb: 'assets/images/GaleriaVideos/nathaliaeguilheme.png' },
      { title: 'Pre-Wedding — Rebeca & Fábio',      url: 'https://youtu.be/IBapF1tVFY0',                 thumb: 'assets/images/GaleriaVideos/rebecaefabio (2).png' }
      // ➕ ADICIONE NOVOS VÍDEOS AQUI
    ]
  }

};
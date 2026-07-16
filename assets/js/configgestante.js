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
      'assets/images/SlideGestante/foto (1).jpg',
      'assets/images/SlideGestante/foto (2).jpg',
      'assets/images/SlideGestante/foto (3).jpg',
      'assets/images/SlideGestante/foto (4).jpg',
      'assets/images/SlideGestante/foto (5).jpg',
	  'assets/images/SlideGestante/foto (6).jpg',
	  'assets/images/SlideGestante/foto (7).jpg',
	  'assets/images/SlideGestante/foto (8).jpg',
	  'assets/images/SlideGestante/foto (9).jpg',
	  'assets/images/SlideGestante/foto (10).jpg',
	  'assets/images/SlideGestante/foto (11).jpg',
	  'assets/images/SlideGestante/foto (12).jpg',
	  'assets/images/SlideGestante/foto (13).jpg'
    ],

    eventos: [
      { nome: 'Album', total: 62 }
    ],

    /* ── GALERIA ORGANIZADA POR PASTAS DE EVENTO ── */
    galleryPhotos: [
      // ═══════ GESTANTE — Album (19 fotos) ═══════
      ...Array.from({ length: 62 }, (_, i) =>
        `assets/images/GaleriaFotos/gestante/Album/foto (${i + 1}).jpg`
      )
      // ═══════ ADICIONE OS DEMAIS EVENTOS AQUI ═══════
    ]
  }
};
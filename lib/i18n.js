export const locales = ['ca', 'es', 'en'];
export const defaultLocale = 'ca';

export const t = {
  ca: {
    nav: {
      projects: 'Projectes',
      about: 'Sobre mi',
      contact: 'Contacte',
    },
    hero: {
      eyebrow: 'Costa Brava · Fotògrafa',
      title1: 'Fotografia',
      title2: 'natural',
      title3: 'i sensible',
      sub: 'Bodas, sessions d\'embaràs i parelles.\nSense posats, amb llum natural.',
      stat1num: '+100', stat1label: 'Històries felices',
      stat2num: '10',   stat2label: 'Anys d\'experiència',
      stat3num: '∞',    stat3label: 'Moments únics',
    },
    filters: {
      all: 'Tots',
      categories: ['Tots', 'Bodas', 'Embaràs', 'Parelles', 'Família'],
    },
    project: {
      back: 'Tots els projectes',
    },
    about: {
      eyebrow: 'Sobre mi',
    },
    contact: {
      eyebrow: 'Contacte',
      title1: 'Parlem',
      title2: 'de la teva',
      title3: 'història',
      labelName: 'Nom',
      labelEmail: 'Correu electrònic',
      labelMsg: 'Missatge',
      placeholderName: 'El teu nom',
      placeholderEmail: 'hola@example.com',
      placeholderMsg: 'Explica\'m la teva idea...',
      send: 'Enviar missatge',
      sending: 'Enviant...',
      successTitle: 'Missatge enviat!',
      successSub: 'Et respondré el més aviat possible.',
      error: 'Hi ha hagut un error. Prova per email directament.',
      labelPhone: 'Telèfon',
    },
    footer: {
      copy: '© {year} Laia Fornaguera',
    },
    loading: 'Carregant projectes...',
    empty: {
      title: 'Aviat hi haurà contingut aquí',
      sub: 'Afegeix una carpeta a Google Drive per veure el projecte.',
    },
  },

  es: {
    nav: {
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Costa Brava · Fotógrafa',
      title1: 'Fotografía',
      title2: 'natural',
      title3: 'y sensible',
      sub: 'Bodas, sesiones de embarazo y parejas.\nSin poses, con luz natural.',
      stat1num: '+100', stat1label: 'Historias felices',
      stat2num: '10',   stat2label: 'Años de experiencia',
      stat3num: '∞',    stat3label: 'Momentos únicos',
    },
    filters: {
      all: 'Todos',
      categories: ['Todos', 'Bodas', 'Embarazo', 'Parejas', 'Familia'],
    },
    project: {
      back: 'Todos los proyectos',
    },
    about: {
      eyebrow: 'Sobre mí',
    },
    contact: {
      eyebrow: 'Contacto',
      title1: 'Hablemos',
      title2: 'de tu',
      title3: 'historia',
      labelName: 'Nombre',
      labelEmail: 'Correo electrónico',
      labelMsg: 'Mensaje',
      placeholderName: 'Tu nombre',
      placeholderEmail: 'hola@example.com',
      placeholderMsg: 'Cuéntame tu idea...',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      successTitle: '¡Mensaje enviado!',
      successSub: 'Te responderé lo antes posible.',
      error: 'Ha habido un error. Prueba por email directamente.',
      labelPhone: 'Teléfono',
    },
    footer: {
      copy: '© {year} Laia Fornaguera',
    },
    loading: 'Cargando proyectos...',
    empty: {
      title: 'Próximamente habrá contenido aquí',
      sub: 'Añade una carpeta a Google Drive para ver el proyecto.',
    },
  },

  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Costa Brava · Photographer',
      title1: 'Natural',
      title2: 'and',
      title3: 'heartfelt photography',
      sub: 'Weddings, maternity and couples.\nUnposed, natural light.',
      stat1num: '+100', stat1label: 'Happy stories',
      stat2num: '10',   stat2label: 'Years of experience',
      stat3num: '∞',    stat3label: 'Unique moments',
    },
    filters: {
      all: 'All',
      categories: ['All', 'Weddings', 'Maternity', 'Couples', 'Family'],
    },
    project: {
      back: 'All projects',
    },
    about: {
      eyebrow: 'About me',
    },
    contact: {
      eyebrow: 'Contact',
      title1: 'Let\'s talk',
      title2: 'about your',
      title3: 'story',
      labelName: 'Name',
      labelEmail: 'Email',
      labelMsg: 'Message',
      placeholderName: 'Your name',
      placeholderEmail: 'hello@example.com',
      placeholderMsg: 'Tell me about your idea...',
      send: 'Send message',
      sending: 'Sending...',
      successTitle: 'Message sent!',
      successSub: 'I\'ll get back to you as soon as possible.',
      error: 'Something went wrong. Try emailing directly.',
      labelPhone: 'Phone',
    },
    footer: {
      copy: '© {year} Laia Fornaguera',
    },
    loading: 'Loading projects...',
    empty: {
      title: 'Content coming soon',
      sub: 'Add a folder to Google Drive to see the project.',
    },
  },
};

// Detecta el idioma del navegador
export function detectLocale() {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language?.slice(0, 2).toLowerCase();
  return locales.includes(lang) ? lang : defaultLocale;
}

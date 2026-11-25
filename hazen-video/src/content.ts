// Contenido inventado por rubro: resultados de búsqueda, perfil y landing de ejemplo.

export type Rubro = 'dentista' | 'abogado' | 'contador';

export type SearchResult = {
  name: string;
  url: string;
  rating: string;
  reviews: number;
  color: string;
};

export type RubroContent = {
  icon: 'tooth' | 'briefcase' | 'calculator';
  results: [SearchResult, SearchResult, SearchResult];
  instagram: {handle: string; name: string; bio: [string, string]};
  landing: {
    header: string;
    hero: string;
    sub: string;
    servicesTitle: string;
    services: [string, string, string];
    cta: string;
    address: string;
    hours: string;
  };
};

export const RUBROS: Record<Rubro, RubroContent> = {
  dentista: {
    icon: 'tooth',
    results: [
      {name: 'Consultorio Dental Sonríe', url: 'sonriedental.com.ar', rating: '4,9', reviews: 214, color: '#2F80ED'},
      {name: 'Dra. Paula Ríos – Odontología', url: 'drapaularios.com.ar', rating: '4,8', reviews: 167, color: '#9B51E0'},
      {name: 'Centro Odontológico Norte', url: 'odontonorte.com.ar', rating: '4,7', reviews: 98, color: '#F2994A'},
    ],
    instagram: {
      handle: 'tu.consultorio',
      name: 'Tu Consultorio',
      bio: ['Odontología general', 'Turnos por mensaje directo'],
    },
    landing: {
      header: 'Consultorio Dra. Martínez',
      hero: 'Tu sonrisa en buenas manos',
      sub: 'Odontología integral en Resistencia',
      servicesTitle: 'Servicios',
      services: ['Limpieza', 'Ortodoncia', 'Implantes'],
      cta: 'Pedir turno por WhatsApp',
      address: 'Resistencia, Chaco',
      hours: 'Lun a Vie · 8 a 20 h',
    },
  },
  abogado: {
    icon: 'briefcase',
    results: [
      {name: 'Estudio Jurídico Ferreyra & Asoc.', url: 'ferreyraabogados.com.ar', rating: '4,9', reviews: 132, color: '#2F80ED'},
      {name: 'Dr. Martín Gómez – Abogado', url: 'drmartingomez.com.ar', rating: '4,8', reviews: 88, color: '#27AE60'},
      {name: 'Estudio Legal Chaco', url: 'estudiolegalchaco.com.ar', rating: '4,7', reviews: 61, color: '#EB5757'},
    ],
    instagram: {
      handle: 'tu.estudio.juridico',
      name: 'Tu Estudio Jurídico',
      bio: ['Derecho laboral y familia', 'Consultas por mensaje directo'],
    },
    landing: {
      header: 'Estudio Jurídico Dr. Sosa',
      hero: 'Defendemos lo que es tuyo',
      sub: 'Asesoramiento legal en Resistencia',
      servicesTitle: 'Áreas',
      services: ['Laboral', 'Familia', 'Sucesiones'],
      cta: 'Consultar por WhatsApp',
      address: 'Resistencia, Chaco',
      hours: 'Lun a Vie · 8 a 18 h',
    },
  },
  contador: {
    icon: 'calculator',
    results: [
      {name: 'Estudio Contable Ramírez', url: 'contableramirez.com.ar', rating: '4,9', reviews: 156, color: '#2F80ED'},
      {name: 'Cra. Laura Benítez – Contadora', url: 'crabenitez.com.ar', rating: '4,8', reviews: 102, color: '#9B51E0'},
      {name: 'Contadores del Nordeste', url: 'contadoresnea.com.ar', rating: '4,7', reviews: 73, color: '#F2994A'},
    ],
    instagram: {
      handle: 'tu.estudio.contable',
      name: 'Tu Estudio Contable',
      bio: ['Monotributo y sueldos', 'Consultas por mensaje directo'],
    },
    landing: {
      header: 'Estudio Contable Cr. Acosta',
      hero: 'Tus números, en orden',
      sub: 'Contabilidad e impuestos en Resistencia',
      servicesTitle: 'Servicios',
      services: ['Monotributo', 'Sueldos', 'Impuestos'],
      cta: 'Consultar por WhatsApp',
      address: 'Resistencia, Chaco',
      hours: 'Lun a Vie · 9 a 18 h',
    },
  },
};

// Si no se pasa `rubro`, se deduce del texto de búsqueda.
export const resolveRubro = (searchText: string, rubro?: Rubro): Rubro => {
  if (rubro) return rubro;
  const t = searchText.toLowerCase();
  if (t.includes('abogad')) return 'abogado';
  if (t.includes('contad')) return 'contador';
  return 'dentista';
};

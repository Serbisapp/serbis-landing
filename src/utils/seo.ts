type JsonLd = Record<string, unknown>;

type LandingSeoConfig = {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  robots: string;
  locale: 'es' | 'en' | 'pt';
  alternates: Array<{ hrefLang: string; href: string }>;
  structuredData: JsonLd[];
};

const DEFAULT_LOCALE: LandingSeoConfig['locale'] = 'es';
const MARKETING_BASE_URL = stripTrailingSlash(import.meta.env.VITE_MARKETING_BASE_URL || 'https://serbis.app');
const APP_BASE_URL = stripTrailingSlash(import.meta.env.VITE_APP_BASE_URL || 'https://app.serbis.app');
const ENABLE_EN_LOCALE = String(import.meta.env.VITE_ENABLE_LOCALE_EN || '').toLowerCase() === 'true';
const ENABLE_PT_LOCALE = String(import.meta.env.VITE_ENABLE_LOCALE_PT || '').toLowerCase() === 'true';
const DEFAULT_SOCIAL_IMAGE = `${APP_BASE_URL}/icons/icon-512.png`;

const FAQ_ITEMS = [
  {
    question: 'Que perfiles pueden cubrir con Serbis?',
    answer:
      'Serbis conecta empresas con talento operativo para logistica, eventos, produccion, limpieza, mantenimiento y tareas de carga y descarga.',
  },
  {
    question: 'En cuanto tiempo se puede cubrir un turno?',
    answer:
      'El modelo esta pensado para cobertura rapida. El sistema prioriza perfiles disponibles y confirmaciones en minutos.',
  },
  {
    question: 'Como se trabaja el impacto social?',
    answer:
      'El servicio integra fundaciones aliadas para crear oportunidades laborales formales y acompanar la empleabilidad sostenible.',
  },
];

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function ensureMeta(attribute: 'name' | 'property', key: string, content: string) {
  const existing = Array.from(document.head.querySelectorAll('meta')).find(
    (meta) => meta.getAttribute(attribute) === key
  );
  const node = existing || document.createElement('meta');
  if (!existing) {
    node.setAttribute(attribute, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function ensureLink(
  rel: string,
  href: string,
  extraAttributes?: Record<string, string>,
  marker = 'canonical'
) {
  const existing = Array.from(document.head.querySelectorAll('link')).find(
    (link) => link.getAttribute('rel') === rel && link.getAttribute('data-seo-marker') === marker
  );
  const node = existing || document.createElement('link');
  if (!existing) {
    node.setAttribute('rel', rel);
    node.setAttribute('data-seo-marker', marker);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
  if (extraAttributes) {
    Object.entries(extraAttributes).forEach(([key, value]) => node.setAttribute(key, value));
  }
}

function appendAlternateLink(hrefLang: string, href: string) {
  const node = document.createElement('link');
  node.setAttribute('rel', 'alternate');
  node.setAttribute('data-seo-marker', 'alternate');
  node.setAttribute('hreflang', hrefLang);
  node.setAttribute('href', href);
  document.head.appendChild(node);
}

function resetAlternates() {
  Array.from(document.head.querySelectorAll('link[data-seo-marker="alternate"]')).forEach((link) =>
    link.remove()
  );
}

function resetStructuredData() {
  Array.from(document.head.querySelectorAll('script[data-seo-jsonld="true"]')).forEach((script) =>
    script.remove()
  );
}

function applyStructuredData(data: JsonLd[]) {
  resetStructuredData();
  data.forEach((item) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-jsonld', 'true');
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

function buildAlternates(pathname: string) {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const alternates: Array<{ hrefLang: string; href: string }> = [
    { hrefLang: 'es', href: `${MARKETING_BASE_URL}${path}` },
    { hrefLang: 'x-default', href: `${MARKETING_BASE_URL}${path}` },
  ];
  if (ENABLE_EN_LOCALE) {
    alternates.push({ hrefLang: 'en', href: `${MARKETING_BASE_URL}/en${path === '/' ? '' : path}` });
  }
  if (ENABLE_PT_LOCALE) {
    alternates.push({ hrefLang: 'pt', href: `${MARKETING_BASE_URL}/pt${path === '/' ? '' : path}` });
  }
  return alternates;
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Serbis',
    url: MARKETING_BASE_URL,
    logo: `${APP_BASE_URL}/icons/icon-512.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'contacto@serbis.com',
        availableLanguage: ['es'],
      },
    ],
  };
}

function serviceSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Serbis Workforce Platform',
    serviceType: 'Contratacion de personal operativo eventual',
    provider: {
      '@type': 'Organization',
      name: 'Serbis',
      url: MARKETING_BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Argentina',
    },
    url,
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function getSeoConfig(pathname: string): LandingSeoConfig {
  const canonicalPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const canonicalUrl = `${MARKETING_BASE_URL}${canonicalPath}`;
  return {
    title: 'Serbis | Contratacion de personal operativo de impacto',
    description:
      'Contrata personal operativo eventual con velocidad, trazabilidad y foco en impacto social para tu operacion.',
    canonicalUrl,
    imageUrl: DEFAULT_SOCIAL_IMAGE,
    robots: 'index,follow',
    locale: DEFAULT_LOCALE,
    alternates: buildAlternates(canonicalPath),
    structuredData: [organizationSchema(), serviceSchema(canonicalUrl), faqSchema()],
  };
}

export function applyLandingSeo(pathname = window.location.pathname) {
  const seo = getSeoConfig(pathname);
  document.title = seo.title;
  document.documentElement.setAttribute('lang', seo.locale);

  ensureMeta('name', 'description', seo.description);
  ensureMeta('name', 'robots', seo.robots);
  ensureMeta('property', 'og:type', 'website');
  ensureMeta('property', 'og:locale', seo.locale === 'es' ? 'es_AR' : `${seo.locale}_US`);
  ensureMeta('property', 'og:title', seo.title);
  ensureMeta('property', 'og:description', seo.description);
  ensureMeta('property', 'og:url', seo.canonicalUrl);
  ensureMeta('property', 'og:image', seo.imageUrl);
  ensureMeta('name', 'twitter:card', 'summary_large_image');
  ensureMeta('name', 'twitter:title', seo.title);
  ensureMeta('name', 'twitter:description', seo.description);
  ensureMeta('name', 'twitter:image', seo.imageUrl);
  ensureMeta('name', 'twitter:url', seo.canonicalUrl);

  ensureLink('canonical', seo.canonicalUrl, undefined, 'canonical');
  resetAlternates();
  seo.alternates.forEach((alternate) => {
    appendAlternateLink(alternate.hrefLang, alternate.href);
  });

  applyStructuredData(seo.structuredData);
}

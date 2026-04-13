import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE, SITE_LANGUAGE, SITE_LOCALE, SITE_NAME, SITE_URL } from './site';

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, nofollow, noarchive';
const STRUCTURED_DATA_ID = 'serbis-json-ld';

type SchemaObject = Record<string, unknown>;

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
  structuredData?: SchemaObject | SchemaObject[];
}

function toAbsoluteUrl(urlOrPath: string): string {
  if (/^https?:\/\//i.test(urlOrPath)) {
    return urlOrPath;
  }

  return `${SITE_URL}${urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`}`;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', href);
}

function upsertAlternate(href: string, hreflang: string): void {
  let alternate = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  );

  if (!alternate) {
    alternate = document.createElement('link');
    alternate.setAttribute('rel', 'alternate');
    alternate.setAttribute('hreflang', hreflang);
    document.head.appendChild(alternate);
  }

  alternate.setAttribute('href', href);
}

function upsertStructuredData(data?: SchemaObject | SchemaObject[]): void {
  const existing = document.getElementById(STRUCTURED_DATA_ID);

  if (!data) {
    existing?.remove();
    return;
  }

  let script = existing as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function SeoHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Serbis',
  type = 'website',
  keywords,
  noindex = false,
  structuredData,
}: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image);
    const robotsValue = noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS;

    document.title = title;
    document.documentElement.setAttribute('lang', SITE_LANGUAGE);

    upsertCanonical(canonicalUrl);
    upsertAlternate(canonicalUrl, SITE_LANGUAGE);
    upsertAlternate(canonicalUrl, 'x-default');
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robotsValue);
    upsertMeta('name', 'googlebot', robotsValue);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', SITE_LOCALE);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');

    if (keywords && keywords.length > 0) {
      upsertMeta('name', 'keywords', keywords.join(', '));
    }

    upsertStructuredData(structuredData);
  }, [description, image, imageAlt, keywords, noindex, path, structuredData, title, type]);

  return null;
}

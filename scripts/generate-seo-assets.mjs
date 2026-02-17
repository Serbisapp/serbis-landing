import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'seo', 'sitemap.config.json');

const rawConfig = await readFile(configPath, 'utf8');
const config = JSON.parse(rawConfig);

const siteUrl = stripTrailingSlash(String(config.siteUrl || '').trim());
if (!siteUrl) {
  throw new Error(`Missing siteUrl in ${configPath}`);
}

const today = new Date().toISOString().slice(0, 10);
const routeEntries = Array.isArray(config.routes) ? config.routes : [];
const contentEntries = Array.isArray(config.content) ? config.content : [];

const sitemapEntries = [...routeEntries, ...contentEntries]
  .filter((entry) => entry && entry.indexable === true)
  .map((entry) => {
    const routePath = normalizePath(String(entry.path || '/'));
    return {
      loc: `${siteUrl}${routePath}`,
      changefreq: String(entry.changefreq || 'weekly'),
      priority: Number(entry.priority ?? 0.5).toFixed(1),
      lastmod: String(entry.lastmod || today),
    };
  });

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries.map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n    <changefreq>${escapeXml(entry.changefreq)}</changefreq>\n    <priority>${escapeXml(entry.priority)}</priority>\n  </url>`
  ),
  '</urlset>',
  '',
].join('\n');

const disallowRules = Array.isArray(config.disallow)
  ? config.disallow.filter((item) => typeof item === 'string' && item.trim().length > 0)
  : [];
const allowRules = Array.isArray(config.allow)
  ? config.allow.filter((item) => typeof item === 'string' && item.trim().length > 0)
  : ['/'];

const robotsTxt = [
  'User-agent: *',
  ...allowRules.map((rule) => `Allow: ${rule}`),
  ...disallowRules.map((rule) => `Disallow: ${rule}`),
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n');

const sitemapOut = path.join(projectRoot, String(config.sitemapPath || 'public/sitemap.xml'));
const robotsOut = path.join(projectRoot, String(config.robotsPath || 'public/robots.txt'));

await mkdir(path.dirname(sitemapOut), { recursive: true });
await mkdir(path.dirname(robotsOut), { recursive: true });
await writeFile(sitemapOut, sitemapXml, 'utf8');
await writeFile(robotsOut, robotsTxt, 'utf8');

console.log(`Generated sitemap: ${sitemapOut}`);
console.log(`Generated robots: ${robotsOut}`);
console.log(`Indexed URLs: ${sitemapEntries.length}`);

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function normalizePath(routePath) {
  if (!routePath) return '/';
  const withLeadingSlash = routePath.startsWith('/') ? routePath : `/${routePath}`;
  const withoutTrailing = withLeadingSlash.replace(/\/+$/, '');
  return withoutTrailing || '/';
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

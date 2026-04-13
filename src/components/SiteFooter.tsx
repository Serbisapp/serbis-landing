import { CONTACT_EMAIL } from '../seo/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Serbis {year}</p>
        <p>Software, operaciones y proyectos reales.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}

import { CONTACT_EMAIL } from '../seo/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Serbis SAS</p>
        <p>2026</p>
        <p>Software, operaciones y proyectos reales.</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}

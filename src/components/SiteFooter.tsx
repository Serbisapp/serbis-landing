import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../seo/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Serbis SAS</p>
        <p>2026</p>
        <p>Software, operaciones y proyectos reales.</p>
        <div className="site-footer__links">
          <Link to="/proyectos" className="text-link">
            Proyectos
          </Link>
          <Link to="/proyectos/espartanos" className="text-link">
            Caso Espartanos
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

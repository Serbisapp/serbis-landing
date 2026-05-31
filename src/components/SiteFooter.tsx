import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../seo/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Serbis SAS</p>
        <p>Software a medida, automatización y sistemas operativos para organizaciones.</p>
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

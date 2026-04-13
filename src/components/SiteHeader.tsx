import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link to="/" className="site-brand" aria-label="Ir al inicio de Serbis">
          <img src="/favicon.ico" alt="Logo Serbis" className="site-brand__mark" />
          <span className="site-brand__text">Serbis</span>
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="site-nav">
            <li>
              <a href="/#proyectos">Proyectos</a>
            </li>
            <li>
              <a href="/#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

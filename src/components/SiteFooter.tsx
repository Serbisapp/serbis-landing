export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Serbis {year}</p>
        <p>Software, operaciones y proyectos reales.</p>
        <a href="mailto:hola@serbis.app" className="text-link">
          hola@serbis.app
        </a>
      </div>
    </footer>
  );
}

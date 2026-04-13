import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="shell not-found__inner">
        <p className="section-head__index">404</p>
        <h1>Página no encontrada</h1>
        <p>El contenido solicitado no está disponible en esta ruta.</p>
        <Link to="/" className="button button--solid">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

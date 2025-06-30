import { Link } from "react-router-dom";

export default function NotFoundLayout() {
  return (
    <main className="w-100 d-flex align-items-center justify-content-center flex-column">
        
      <h1 className="text-warning">Not Found</h1>
        <p className="lead">La página que buscas no existe.</p>
      <i className="bi bi-patch-question text-warning display-1 opacity-50" />
      <div className="mt-3">
        <Link className="btn btn-warning fw-bold" to={"/"}>
          <i className="bi bi-arrow-left-short"></i> Volver al inicio
        </Link>
      </div>
    </main>
  );
}

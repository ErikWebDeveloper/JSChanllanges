export default function ToastMessage({}) {
  return (
    <div className="alert alert-danger d-flex flex-column gap-3 position-absolute" role="alert">
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">ERROR</span>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      Ha ocurrido un error al cargar los datos. Por favor, inténtalo de nuevo
      más tarde.
    </div>
  );
}

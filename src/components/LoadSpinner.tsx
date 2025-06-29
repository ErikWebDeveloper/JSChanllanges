export default function LoadSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-ceenter p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

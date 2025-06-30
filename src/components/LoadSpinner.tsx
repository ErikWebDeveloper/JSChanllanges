export default function LoadSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-ceenter p-5 flex-column ">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

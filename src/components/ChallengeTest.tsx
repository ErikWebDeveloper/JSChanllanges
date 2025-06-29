interface ChallengeTestProps {
  error: string | null;
  testResults: TestResult[];
}

export default function ChallengeTest({
  error,
  testResults,
}: ChallengeTestProps) {
  return (
    <div className="container-fluid p-0">
      {/* Header con estilo Bootstrap */}
      <header className="p-3 mb-4 border-bottom">
        <h1 className="h4 mb-0">Resultados de Tests</h1>
      </header>

      {/* Contenedor principal */}
      <div className="px-3">
        {error ? (
          <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>
              <strong>Error en la ejecución:</strong>
              <div className="font-monospace mt-1">{error}</div>
            </div>
          </div>
        ) : testResults.length === 0 ? (
          <div className="text-center py-5 rounded">
            <i className="bi bi-code-square fs-1 text-muted mb-3"></i>
            <p className="lead text-muted">
              Presiona "Ejecutar Tests" para ver los resultados
            </p>
            <button className="btn btn-outline-success mt-2" disabled>
              <i className="bi bi-play-fill me-2"></i>
              Ejecutar Tests
            </button>
          </div>
        ) : (
          <ul className="list-group">
            {testResults.map((result, i) => (
              <li
                key={i}
                className={`list-group-item d-flex align-items-start ${
                  result.isSuccess
                    ? "list-group-item-success"
                    : "list-group-item-danger"
                }`}
              >
                <span className="me-2 fs-5">
                  {result.isSuccess ? (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill text-danger"></i>
                  )}
                </span>
                <div>
                  <span className="font-monospace">{result.message}</span>
                  <div className="text-muted small mt-1">
                    Test #{i + 1} - {result.isSuccess ? "Éxito" : "Fallido"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {testResults.length > 0 && (
          <div className="mt-3 text-center">
            <span className="badge bg-success me-2">
              {testResults.filter((r) => r.isSuccess).length} éxitos
            </span>
            <span className="badge bg-danger">
              {testResults.filter((r) => !r.isSuccess).length} fallos
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const difficulties: Record<DifficultyLevel, string> = {
  Fácil: "text-bg-success",
  Intermedio: "text-bg-warning",
  Difícil: "text-bg-danger",
};

export default function ChallengeMeta({ challenge }: ChallengeMetaProps) {
  return (
    <>
      <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
        <h1 className="h4 mb-0">{challenge.title}</h1>
        <span className={`badge ${difficulties[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
      </header>

      <div>
        <p>{challenge.description}</p>
      </div>

      <div>
        <h4>Restricciones</h4>
        {challenge.constraints.map((constraint) => (
          <p
            key={constraint}
            className="badge text-bg-secondary opacity-50 me-2"
          >
            {constraint}
          </p>
        ))}
      </div>

      <div>
        <h4>Ejemplos</h4>
        <div className="card my-3">
          <div className="card-body">
            {challenge.examples.map((example: Example, index: number) => (
              <div key={index}>
                <p>
                  Input: <code>{example.input}</code>
                </p>
                <p>
                  Output: <code>{example.output}</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-end opacity-50">
        <span className="badge text-bg-primary me-2">{challenge.usageOf}</span>
        <span className="badge text-bg-secondary">{challenge.category}</span>
      </div>
    </>
  );
}

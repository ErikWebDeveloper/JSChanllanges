const difficulties: Record<DifficultyLevel, string> = {
  Fácil: "text-bg-success",
  Intermedio: "text-bg-warning",
  Difícil: "text-bg-danger",
};

export default function ChallengeMeta({ challenge }: ChallengeMetaProps) {
  return (
    <>
      <header className="d-flex justify-content-between align-items-center p-3 mb-4 border-bottom">
        <h1 className="h4 mb-0">{challenge.title}</h1>
        <span className={`badge ${difficulties[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
      </header>

      <p>{challenge.description}</p>

      <div className="card mb-3">
          <div className="card-header">
            <h4 className="h5">Ejemplos</h4>
          </div>
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

      <div className="text-end opacity-50">
        <span className="badge text-bg-secondary">{challenge.category}</span>
      </div>
    </>
  );
}

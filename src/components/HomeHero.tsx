import JSLogo from "@/assets/img/javascript-logo.svg";

export default function HomeHero() {
  return (
    <>
      <header className="container-fluid text-center mb-5 ">
        <h1 className="display-4 fw-bold d-flex align-items-center justify-content-center gap-3">
          <img src={JSLogo} className="img-thumbnail border-0 p-0" width={60} />{" "}
          Challenges
        </h1>
        <p className="lead">
          Mejora tus habilidades de programación en JavaScript
        </p>
        <div>
            <a role="button" href="#challenges" className="btn btn-warning fw-bold pulsar-hero">Empezar ahora</a>
        </div>
      </header>

      {/*<article className="container text-center mb-5">
        <p className="lead text-secondary">
          Aquí encontrarás una lista de desafíos de programación en JavaScript.
          Cada desafío está clasificado por dificultad y categoría.
        </p>
      </article>*/}
    </>
  );
}

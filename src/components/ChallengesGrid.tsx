import useChallengers from "@/hooks/useChallengers";
import { Link } from "react-router-dom";
import LoadSpinner from "./LoadSpinner";
import ToastMessage from "./ToastMessage";

const difficulties: Record<DifficultyLevel, string> = {
  Fácil: "text-bg-success",
  Intermedio: "text-bg-warning",
  Difícil: "text-bg-danger",
};

const difficultyFilterOptions: Record<DifficultyFilter, string> = {
  Todos: "",
  Fácil: "Fácil",
  Intermedio: "Intermedio",
  Difícil: "Difícil",
};

const categoryFilterOptions: Record<CategoryFilter, string> = {
  Todos: "",
  Arrays: "Arrays",
  Funciones: "Funciones",
  Async: "Async",
};

export default function ChallengesGrid() {
  const {
    filteredChallenges,
    difficultyFilter,
    categoryFilter,
    loading,
    error,
    filterByType,
  } = useChallengers();

  const handleFilter = ({ type, filter }: FilterTypeProps) => {
    filterByType({ type, filter });
  };

  return (
    <div id="challenges" className="container">
      <header className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="btn-group" role="group">
          {(
            Object.entries(difficultyFilterOptions) as [
              DifficultyFilter,
              string
            ][]
          ).map(([key]) => (
            <button
              key={key}
              type="button"
              className={`btn btn-outline-secondary ${
                difficultyFilter === key ? "active" : ""
              }`}
              onClick={() =>
                handleFilter({
                  type: "Difficulty",
                  filter: key,
                })
              }
            >
              {key}
            </button>
          ))}
        </div>

        <select
          className="form-select"
          style={{ width: "250px" }}
          value={categoryFilter}
          onChange={(e) =>
            handleFilter({
              type: "Category",
              filter: e.target.value as CategoryFilter,
            })
          }
        >
          {(
            Object.entries(categoryFilterOptions) as [CategoryFilter, string][]
          ).map(([key]) => (
            <option key={key} value={key}>
              {key === "Todos" ? "Todas las categorías" : key}
            </option>
          ))}
        </select>
      </header>

      {loading && <LoadSpinner />}

      {error && <ToastMessage />}

      {!error && filteredChallenges.length > 0 && (
        <ul className="list-group" style={{minHeight: "400px"}}>
          {filteredChallenges.map((challenge) => (
            <li
              key={challenge.id}
              className="list-group-item d-flex align-items-center justify-content-between py-3"
            >
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="text-decoration-none text-white fw-bold"
                >
                  {challenge.title}
                </Link>
                <span className="badge bg-secondary d-none d-md-block opacity-50">
                  {challenge.category}
                </span>
              </div>

              <span
                className={`badge me-2 ${difficulties[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && filteredChallenges.length === 0 && (
        <div className="alert alert-warning">
          No se encontraron challenges con los filtros seleccionados
        </div>
      )}
    </div>
  );
}

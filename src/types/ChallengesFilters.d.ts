type DifficultyLevel = "Fácil" | "Intermedio" | "Difícil";
type DifficultyFilter = "Todos" | DifficultyLevel;
type CategoryFilter = "Todos" | "Arrays" | "Funciones" | "Async";
type TypeFilter = "Category" | "Difficulty";
type FilterTypeProps = {
  type: TypeFilter;
  filter: CategoryFilter | DifficultyFilter;
};

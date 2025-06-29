import challengeData from "../challanges.json";

const difficultyOrder: Record<DifficultyLevel, number> = {
  Fácil: 1,
  Intermedio: 2,
  Difícil: 3,
};

type FilterProps = {
  challenges: Challenges;
  difficultyFilter: DifficultyFilter;
  categoryFilter: CategoryFilter;
};

type DifficultyLevel = "Fácil" | "Intermedio" | "Difícil";
type DifficultyFilter = "Todos" | DifficultyLevel;
type CategoryFilter = "Todos" | "Arrays" | "Funciones" | "Async";

// Obtener y ordenar challenges (Servicio)
export const getChallenges = async () => {
  try {
    const challenges = challengeData as Challenge[];
    return challenges;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Error desconocido");
  }
};

export const sortByDifficulty = async (challanges: Challenges) => {
  return challanges.sort((a, b) => {
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
};

export const filterChallenges = async ({
  challenges,
  difficultyFilter,
  categoryFilter,
}: FilterProps) => {
  if (!challenges.length) return [];

  const filtered = challenges.filter((challenge) => {
    const matchesDifficulty =
      difficultyFilter === "Todos" || challenge.difficulty === difficultyFilter;
    const matchesCategory =
      categoryFilter === "Todos" || challenge.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  return filtered;
};

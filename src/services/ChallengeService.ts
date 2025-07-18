import challengeData from "@/challanges.json";

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

export const getChallenges = async () => {
  try {
    const challenges = challengeData as Challenge[];
    return challenges;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Error desconocido");
  }
};

export const getChallenge = async (id: string) => {
  if (!id) return;
  try {
    const selectedChallenge = challengeData.find(
      (challenge) => challenge.id === id
    );

    if (selectedChallenge) {
      return selectedChallenge as Challenge;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading challenges:", error);
  }
};

export const getNextChallenge = async (id: string | undefined) => {
  if (!id) return null;

  const nextChallengeId = `js-${Number(id.split("-")[1]) + 1}`;

  try {
    const next = challengeData.find(
      (challenge) => challenge.id === nextChallengeId
    );

    if (next) return nextChallengeId;
    else return null;
  } catch (error) {
    return null;
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

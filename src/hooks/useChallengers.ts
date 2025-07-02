import { useState, useEffect } from "react";
import {
  getChallenges,
  sortByDifficulty,
  filterChallenges,
} from "@/services/ChallengeService";

export default function useChallengers() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("Todos");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Todos");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const filterByType = ({ type, filter }: FilterTypeProps) => {
    switch (type) {
      case "Category":
        if (isCategoryFilter(filter)) setCategoryFilter(filter);
        break;
      case "Difficulty":
        if (isDifficultyFilter(filter)) setDifficultyFilter(filter);
        break;
    }
  };

  // Funciones de tipo guard (type guards)
  function isCategoryFilter(filter: any): filter is CategoryFilter {
    return ["Todos", "Arrays", "Funciones", "Async"].includes(filter);
  }

  function isDifficultyFilter(filter: any): filter is DifficultyFilter {
    return ["Todos", "Fácil", "Intermedio", "Difícil"].includes(filter);
  }

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getChallenges();
        const sortedData = await sortByDifficulty(data);
        setChallenges(sortedData);
        setFilteredChallenges(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Aplicar filtros cuando cambian
  useEffect(() => {
    if (!challenges.length) return;

    const filter = async () => {
      let filtered = await filterChallenges({
        challenges,
        difficultyFilter,
        categoryFilter,
      });
      setFilteredChallenges(filtered);
    };
    filter();
  }, [difficultyFilter, categoryFilter, challenges]);

  return {
    challenges,
    filteredChallenges,
    difficultyFilter,
    categoryFilter,
    error,
    loading,
    filterByType,
  };
}

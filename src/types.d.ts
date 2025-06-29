interface UserEditorProps {
  defaultCode?: string;
  defaultTests?: string;
}

interface ChallengeMetaProps {
  challenge: Challenge;
}

type Challenges = Challenge[];

type DifficultyLevel = "Fácil" | "Intermedio" | "Difícil";
type DifficultyFilter = "Todos" | DifficultyLevel;
type CategoryFilter = "Todos" | "Arrays" | "Funciones" | "Async";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  usageOf: string;
  constraints: string[];
  examples: Example[];
  defaultCode: string;
  defaultTest: string;
  solution: string;
  createdAt: string;
  createdBy: string;
}

interface Example {
  input: string;
  output: string;
}

// src/types.ts
interface TestResult {
  message: string;
  isSuccess: boolean;
}

const PAGES = {
  META: "Descripción",
  TEST: "Resultados",
} as const;

type PageType = keyof typeof PAGES;
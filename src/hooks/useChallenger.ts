import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChallenge } from "../services/ChallengeService";
import { runTests } from "../services/TestService";

export default function useChallenge() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [win, setWin] = useState<boolean>(false);

  const handleRunTests = (code: string) => {
    if (!challenge) return;

    setError(null);
    setTestResults([]);

    const { results, allTestsPassed, error } = runTests(code, challenge);

    if (error) return setError(error);
    setTestResults(results as TestResult[]);
    setWin(allTestsPassed);
  };

  // Carga inicial del challenge
  useEffect(() => {
    const loadChallenge = async () => {
      if (!challengeId) return setChallenge(null);
      try {
        const selectedChallenge = await getChallenge(challengeId);

        if (selectedChallenge) {
          setChallenge(selectedChallenge as Challenge);
        } else {
          setChallenge(null);
        }
      } catch (error) {
        console.error("Error loading challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, []);

  return { challenge, error, testResults, win, loading, handleRunTests, setWin };
}

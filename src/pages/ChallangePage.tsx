import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import challengesData from "../challanges.json";
import NotFoundLayout from "../layouts/NotFoundLayout";
import EditorPanel from "../components/EditorPanel";
import ExcercicePanel from "../components/ExercicePanel";
import WinModal from "../components/WinModal";
import LoadSpinner from "../components/LoadSpinner";

export default function ChallengePage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [screen, setScreen] = useState<PageType>("META");
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        if (!challengeId) return;
        const selectedChallenge = challengesData.find(
          (challenge) => challenge.id === challengeId
        );

        if (selectedChallenge) {
          setChallenge(selectedChallenge as Challenge);
        } else {
          setChallenge(null); // o manejar el caso de no encontrado
        }
      } catch (error) {
        console.error("Error loading challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, []);

  const handleSetScreen = (screen: PageType) => {
    setScreen(screen);
  };

  /*const handleRunTests = (code: string) => {
    if (!challenge) return;

    setError(null);
    setTestResults([]);

    try {
      const originalConsoleLog = console.log;
      const results: TestResult[] = [];

      console.log = (...args) => {
        const message = args.join(" ");
        results.push({
          message,
          isSuccess: message.includes("✓"),
        });
        originalConsoleLog(...args);
      };

      // Combinamos el código del usuario con los tests del challenge
      const fullCode = `${code}\n${challenge.defaultTest}`;
      new Function(fullCode)();

      console.log = originalConsoleLog;
      setTestResults(results);
      setScreen("TEST");
      setWin(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };*/

  const handleRunTests = (code: string) => {
    if (!challenge) return;

    setError(null);
    setTestResults([]);

    try {
      const originalConsole = {
        log: console.log,
        error: console.error,
      };

      const results: TestResult[] = [];
      let allTestsPassed = true;

      // Interceptamos console
      console.log = (...args) => {
        const message = args.join(" ");
        const isSuccess = message.includes("✓"); // Detectamos checkmarks
        results.push({ message, isSuccess });
        if (!isSuccess) allTestsPassed = false;
        originalConsole.log(...args);
      };

      console.error = (...args) => {
        results.push({ message: args.join(" "), isSuccess: false });
        allTestsPassed = false;
        originalConsole.error(...args);
      };

      // Creamos un assert básico para el navegador
      const assert = {
        equal: (actual: any, expected: any, message?: string) => {
          if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
          }
          console.log(`✓ ${message || "Assertion passed"}`);
        },
      };

      // Contexto seguro para la ejecución
      const sandbox = {
        assert,
        console: {
          log: console.log,
          error: console.error,
        },
      };

      // Ejecutamos en modo estricto para mejor seguridad
      const testCode = `
        'use strict';
        ${code}
        ${challenge.defaultTest}
      `;

      const testFn = new Function("assert", "console", testCode);

      testFn(sandbox.assert, sandbox.console);

      // Restauramos console original
      console.log = originalConsole.log;
      console.error = originalConsole.error;

      setTestResults(results);
      setWin(allTestsPassed); // Solo true si todos pasaron
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setWin(false); // Asegurar que en errores sea false
    } finally {
      setScreen("TEST");
    }
  };

  if (loading) {
    return (
      <main className="w-100 d-flex align-items-center justify-content-center flex-column">
        <LoadSpinner />
      </main>
    );
  }

  if (!challenge) {
    return <NotFoundLayout />;
  }

  return (
    <>
      {/*win && <Celebration />*/}
      <WinModal show={win} onClose={() => setWin(false)} />
      <EditorPanel
        defaultCode={challenge.defaultCode}
        onRunTests={handleRunTests}
      />

      <ExcercicePanel
        challenge={challenge}
        testResults={testResults}
        error={error}
        screen={screen}
        changeScreen={handleSetScreen}
      />
    </>
  );
}

// Tipos necesarios (puedes moverlos a types.ts)
interface TestResult {
  message: string;
  isSuccess: boolean;
}

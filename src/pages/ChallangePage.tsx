import { useState } from "react";
import useChallenge from "../hooks/useChallenger";
import NotFoundLayout from "../layouts/NotFoundLayout";
import EditorPanel from "../components/EditorPanel";
import ExcercicePanel from "../components/ExercicePanel";
import WinModal from "../components/WinModal";
import LoadSpinner from "../components/LoadSpinner";

/*interface TestResult {
  message: string;
  isSuccess: boolean;
}*/

export default function ChallengePage() {
  const {
    challenge,
    error,
    testResults,
    win,
    loading,
    handleRunTests: runTest,
    setWin,
  } = useChallenge();
  //const [error, setError] = useState<string | null>(null);
  //const [testResults, setTestResults] = useState<TestResult[]>([]);
  //const [win, setWin] = useState<boolean>(false);
  const [screen, setScreen] = useState<PageType>("META");

  const handleSetScreen = (screen: PageType) => {
    setScreen(screen);
  };

  const handleRunTests = (code: string) => {
    runTest(code)
    setScreen("TEST");
  }

  /*const handleRunTests = (code: string) => {
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
  };*/

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

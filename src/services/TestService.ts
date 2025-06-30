/*type Response = {
  result: string;
  allTestsPassed: boolean;
  error: Error;
};*/

export function runTests(code: string, challenge: Challenge) {
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

    return {
      results,
      allTestsPassed,
      error: null,
    };
  } catch (err) {
    return {
      results: null,
      allTestsPassed: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

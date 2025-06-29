// src/components/RightColumn.tsx
import { useState } from "react";
import ChallengeMeta from "./ChallengeMeta";
import ChallengeTest from "./ChallengeTest";

const PAGES = {
  META: "Descripción",
  TEST: "Resultados",
} as const;

interface RightColumnProps {
  challenge: Challenge;
  testResults: TestResult[];
  error: string | null;
  screen: PageType;
  changeScreen: (page: PageType) => void;
}

export default function ExcercicePanel({
  challenge,
  testResults,
  error,
  screen,
  changeScreen,
}: RightColumnProps) {
  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav>
        <ul className="nav nav-tabs">
          {(Object.entries(PAGES) as [PageType, string][]).map(
            ([key, value]) => (
              <li key={key} className="nav-item">
                <button
                  className={`nav-link ${screen === key ? "active" : ""}`}
                  onClick={() => changeScreen(key)}
                  aria-current={screen === key ? "page" : undefined}
                >
                  {value}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      <div
        className="tab-content p-3 border border-top-0 rounded-bottom"
        style={{ flex: 1, overflow: "auto" }}
      >
        {screen === "META" ? (
          <ChallengeMeta challenge={challenge} />
        ) : (
          <ChallengeTest error={error} testResults={testResults} />
        )}
      </div>
    </div>
  );
}

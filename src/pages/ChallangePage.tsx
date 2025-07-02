import { useState, useEffect } from "react";
import useChallenge from "@/hooks/useChallenger";
import NotFoundLayout from "@/layouts/NotFoundLayout";
import EditorPanel from "@/components/EditorPanel";
import ExcercicePanel from "@/components/ExercicePanel";
import WinModal from "@/components/WinModal";
import LoadSpinner from "@/components/LoadSpinner";

export default function ChallengePage() {
  const {
    challenge,
    error,
    testResults,
    win,
    loading,
    handleRunTests: runTest,
    setWin,
    nextChallenge,
  } = useChallenge();

  const [btnRunTest, setBtnRunTest] = useState(false);
  const [screen, setScreen] = useState<PageType>("META");

  const handleSetScreen = (screen: PageType) => {
    setScreen(screen);
  };

  const handleRunTests = (code: string) => {
    setBtnRunTest(true);
    runTest(code);
    setBtnRunTest(false);
    setScreen("TEST");
  };

  useEffect(() => {
    setScreen("META");
  }, [challenge]);

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
      <WinModal
        show={win}
        onClose={() => setWin(false)}
        nextChallenge={nextChallenge}
      />

      <EditorPanel
        key={challenge.id}
        defaultCode={challenge.defaultCode}
        onRunTests={handleRunTests}
        btnState={btnRunTest}
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

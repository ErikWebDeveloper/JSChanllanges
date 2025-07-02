import AppLayout from "@/layouts/AppLayout.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import ChallengePage from "@/pages/ChallangePage.tsx";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<AppLayout />}>
            <Route
              path="/challenges/:challengeId"
              element={<ChallengePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

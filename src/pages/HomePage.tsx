import FullPageLayout from "../layouts/FullPageLayout";
import HomeHero from "../components/HomeHero";
import ChallengesGrid from "../components/ChallengesGrid";

export default function HomePage() {
  return (
    <main>
      <FullPageLayout className="hero-background">
        <HomeHero />
      </FullPageLayout>

      <FullPageLayout>
        <ChallengesGrid />
      </FullPageLayout>
    </main>
  );
}

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CountdownExperience from "@/components/CountdownExperience";
import CelebrationReveal from "@/components/CelebrationReveal";
import BabyCard from "@/components/BabyCard";

type Stage = "loading" | "countdown" | "celebration" | "card";

const Index = () => {
  const [stage, setStage] = useState<Stage>("loading");

  const handleLoadingComplete = () => setStage("countdown");
  const handleCountdownComplete = () => setStage("celebration");
  const handleCelebrationComplete = () => setStage("card");

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {stage === "countdown" && (
          <CountdownExperience key="countdown" onComplete={handleCountdownComplete} />
        )}
        {stage === "celebration" && (
          <CelebrationReveal key="celebration" onComplete={handleCelebrationComplete} />
        )}
        {stage === "card" && (
          <BabyCard key="card" />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;

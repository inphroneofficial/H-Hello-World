import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import babyImage from "@/assets/baby-girl.png";
import AudioPlayer from "./AudioPlayer";

interface CelebrationRevealProps {
  onComplete: () => void;
}

const CelebrationReveal = ({ onComplete }: CelebrationRevealProps) => {
  const [showBaby, setShowBaby] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const colors = ["#d4a574", "#e8b4b8", "#f5e6d3", "#c9a86c", "#f0d4d6"];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.5, 0.5),
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
        colors,
        shapes: ["circle", "square"],
        gravity: 0.8,
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.5, 0.5),
      });
    }, 250);
  }, []);

  useEffect(() => {
    // Start celebration sequence
    fireConfetti();
    
    setTimeout(() => setShowBaby(true), 800);
    setTimeout(() => setShowMessage(true), 2000);
    setTimeout(onComplete, 5000);
  }, [fireConfetti, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-celebration flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Audio player */}
      <AudioPlayer autoPlay />

      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(350, 50%, 85%, 0.4) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold/40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main content */}
      <AnimatePresence>
        {showBaby && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10"
          >
            {/* Glowing ring around image */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, transparent 45%, hsla(350, 50%, 75%, 0.3) 50%, transparent 55%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Baby image */}
            <motion.div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-elevated border-4 border-cream"
              animate={{ 
                boxShadow: [
                  "0 25px 80px -20px hsla(350, 50%, 65%, 0.3)",
                  "0 25px 100px -20px hsla(350, 50%, 65%, 0.5)",
                  "0 25px 80px -20px hsla(350, 50%, 65%, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src={babyImage}
                alt="Baby Girl"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center z-10"
          >
            <motion.p
              className="text-sm md:text-base font-elegant tracking-[0.5em] text-muted-foreground uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to the World
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-display font-semibold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              It's a <span className="text-gradient-rose">Girl!</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl font-elegant text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              December 15, 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hearts floating */}
      {showBaby && [...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl"
          initial={{ 
            opacity: 0,
            x: "50%",
            y: "50%",
          }}
          animate={{ 
            opacity: [0, 1, 0],
            x: `${30 + Math.random() * 40}%`,
            y: `${20 + Math.random() * 60}%`,
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          💕
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CelebrationReveal;

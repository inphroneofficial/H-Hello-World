import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-cinematic flex flex-col items-center justify-center z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Large H with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.span
            className="text-8xl md:text-9xl font-display font-bold text-gold"
            style={{
              textShadow: "0 0 60px hsla(38, 70%, 55%, 0.5), 0 0 120px hsla(38, 70%, 55%, 0.3)",
            }}
            animate={{
              textShadow: [
                "0 0 60px hsla(38, 70%, 55%, 0.5), 0 0 120px hsla(38, 70%, 55%, 0.3)",
                "0 0 80px hsla(38, 70%, 55%, 0.7), 0 0 160px hsla(38, 70%, 55%, 0.4)",
                "0 0 60px hsla(38, 70%, 55%, 0.5), 0 0 120px hsla(38, 70%, 55%, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            H
          </motion.span>
        </motion.div>

        {/* Hello World text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <span className="text-2xl md:text-3xl font-elegant tracking-[0.3em] text-cream/80">
           Hello World, Baby ! 🌍✨
          </span>
        </motion.div>

        {/* Meaning reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="space-y-3 mb-16"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-lg font-elegant text-rose-light tracking-wider"
          >
            <span className="text-gold font-semibold">H</span>
            <span className="text-cream/70">abeeb</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-lg font-elegant text-rose-light tracking-wider"
          >
            <span className="text-gold font-semibold">H</span>
            <span className="text-cream/70">ussainaiah</span>
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "200px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto"
        >
          <div className="h-[2px] bg-charcoal-soft rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold via-rose-gold to-gold"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-cream/40 mt-3 font-elegant tracking-widest"
          >
            {progress}%
          </motion.p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gold/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gold/30"
      />
    </motion.div>
  );
};

export default LoadingScreen;

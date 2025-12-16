import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Baby } from "lucide-react";
import { useEffect, useRef } from "react";

interface HomeSectionProps {
  onContinue: () => void;
}

const HomeSection = ({ onContinue }: HomeSectionProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const quotes = [
    "A new star Queen is born ✨",
    "Love multiplied, blessings magnified 💕",
    "The tiniest feet make the biggest footprints in our hearts 👣",
  ];

  // 🔥 Auto continue after 2 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onContinue();
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onContinue]);

  // ❌ Cancel auto-continue if user clicks
  const handleContinue = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-celebration flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-primary/30" />
            ) : i % 3 === 1 ? (
              <Star className="w-3 h-3 text-accent/40" />
            ) : (
              <Sparkles className="w-3 h-3 text-gold/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        {/* Baby icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Baby className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <span className="text-sm font-elegant tracking-[0.4em] text-muted-foreground uppercase">
            Welcome to a
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-4xl md:text-6xl font-display font-semibold text-foreground mb-6"
        >
          Beautiful <span className="text-gradient-rose">Celebration</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-lg md:text-xl font-elegant text-muted-foreground mb-10 leading-relaxed"
        >
          Join us in celebrating the arrival of our precious little angel.
          A moment of pure joy and endless love.
        </motion.p>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <motion.div
            className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-lg font-elegant italic text-foreground/80">
              “{quotes[0]}”
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="group relative px-10 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-wider text-lg shadow-glow transition-all duration-300 hover:shadow-elevated hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <span className="relative flex items-center gap-2">
            Celebrate This Joy ✨
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>

        {/* Auto-continue hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.7 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Continuing automatically…
        </motion.p>
      </motion.div>

      {/* Bottom dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HomeSection;

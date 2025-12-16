import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface DeveloperButtonProps {
  onOpenDeveloper: () => void;
}

const DeveloperButton = ({ onOpenDeveloper }: DeveloperButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={onOpenDeveloper}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border/30 shadow-soft text-muted-foreground hover:text-foreground transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-xs font-elegant tracking-wider opacity-70 group-hover:opacity-100">
            Developed by
          </span>
          <span className="text-xs font-display font-semibold">
            Thangella
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default DeveloperButton;

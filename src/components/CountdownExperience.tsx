import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownExperienceProps {
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownExperience = ({ onComplete }: CountdownExperienceProps) => {
  const targetDate = new Date("2025-12-15T15:40:00").getTime();
  const startDate = new Date("2025-04-01T00:00:00").getTime();
  const totalDuration = targetDate - startDate;
  
  const [displayTime, setDisplayTime] = useState<TimeLeft>({
    days: 258,
    hours: 15,
    minutes: 40,
    seconds: 0,
  });
  
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Accelerated countdown - complete in ~10 seconds
    const accelerationFactor = totalDuration / 10000;
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += 50 * accelerationFactor;
      const remaining = Math.max(0, totalDuration - elapsed);
      const newProgress = (elapsed / totalDuration) * 100;
      
      setProgress(Math.min(newProgress, 100));
      
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      setDisplayTime({ days, hours, minutes, seconds });
      
      if (remaining <= 0) {
        clearInterval(interval);
        setIsComplete(true);
        setTimeout(onComplete, 1500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, totalDuration]);

  const timeBlocks = [
    { value: displayTime.days, label: "Days" },
    { value: displayTime.hours, label: "Hours" },
    { value: displayTime.minutes, label: "Minutes" },
    { value: displayTime.seconds, label: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-celebration flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(350, 50%, 65%, 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(38, 70%, 55%, 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12 z-10"
      >
        <h2 className="text-sm md:text-base font-elegant tracking-[0.4em] text-muted-foreground uppercase mb-4">
          A Special Moment Awaits
        </h2>
        <h1 className="text-4xl md:text-6xl font-display font-semibold text-foreground">
          Counting Down
        </h1>
        <p className="mt-4 text-lg font-elegant text-muted-foreground">
          April - December 15, 2025 • 3:40 PM
        </p>
      </motion.div>

      {/* Countdown blocks */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 z-10"
      >
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="relative"
          >
            <div className="w-20 h-24 md:w-28 md:h-32 bg-card rounded-2xl shadow-card flex flex-col items-center justify-center border border-border/50 backdrop-blur-sm">
              <motion.span
                key={block.value}
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-display font-bold text-foreground"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs md:text-sm font-elegant text-muted-foreground tracking-wider mt-1">
                {block.label}
              </span>
            </div>
            
            {/* Separator */}
            {index < 3 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 flex-col gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "300px" }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="z-10"
      >
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3 font-elegant tracking-wider">
          {isComplete ? "The moment has arrived!" : "Journey to joy..."}
        </p>
      </motion.div>

      {/* Completion flash */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-warm-white z-20"
        />
      )}
    </motion.div>
  );
};

export default CountdownExperience;

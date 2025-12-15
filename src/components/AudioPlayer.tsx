import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

const AudioPlayer = ({ autoPlay = true }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // ✅ Autoplay muted (browser-allowed)
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlay]);

  // ✅ First user interaction ANYWHERE unlocks sound
  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioRef.current || unlocked) return;

      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsMuted(false);
        setIsPlaying(true);
        setUnlocked(true);
      } catch {
        // ignore
      }
    };

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [unlocked]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/Sound 1.mp3"
        loop
        preload="auto"
      />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-soft flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="sound"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Volume2 className="w-5 h-5 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isMuted && isPlaying && (
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
};

export default AudioPlayer;

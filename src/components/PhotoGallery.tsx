import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery photos
  const photos = [
    { src: "/H-Hello World.png", caption: "Hello World, Baby Girl 👶🎀✨, A tiny miracle 💖, Welcome to our world 🌍👧" },
  ];

  const nextPhoto = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const prevPhoto = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      {/* Open Gallery Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 hover:bg-secondary transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Images className="w-4 h-4" />
        <span className="text-sm font-elegant tracking-wider">
          Photo Gallery
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card/30 flex items-center justify-center text-white hover:bg-card/50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative 
                w-[260px] sm:w-[320px] md:w-[360px]
                aspect-square
                rounded-[28px]
                overflow-hidden
                bg-card
                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                border border-white/20
              "
            >
              {/* 3D Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-xl opacity-70" />

              {/* Image */}
              <motion.img
                key={currentIndex}
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full object-cover rounded-[24px]"
              />

              {/* Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-0 right-0 text-center text-white font-elegant text-sm tracking-wide px-3"
              >
                {photos[currentIndex].caption}
              </motion.p>

              {/* Navigation */}
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-10 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;

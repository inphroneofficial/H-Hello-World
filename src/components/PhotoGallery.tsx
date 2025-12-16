import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import babyImage from "@/assets/baby-girl.png";

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { src: babyImage, caption: "First moments of joy" },
    { src: "/H-Hello World.png", caption: "Hello World, Baby Girl 👶🎀✨, A tiny miracle 💖, Welcome to our world 🌍👧" },
  ];

  // Auto-slide
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, photos.length]);

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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-secondary-foreground hover:bg-secondary transition-all duration-300"
      >
        <Images className="w-4 h-4" />
        <span className="text-sm tracking-wider">Photo Gallery</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto"
            >
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-lg sm:text-2xl font-semibold text-white mb-3 sm:mb-6"
              >
                ✨ Precious Moments ✨
              </motion.h2>

              {/* Image Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="
                  relative aspect-[4/3] sm:aspect-[16/10]
                  rounded-2xl overflow-hidden
                  bg-neutral-900
                  shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]
                  ring-1 ring-white/10
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={photos[currentIndex].src}
                      alt={photos[currentIndex].caption}
                      className="w-full h-full object-cover"
                    />

                    {/* Depth overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none" />

                    {/* Caption */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-white text-sm sm:text-lg tracking-wide"
                    >
                      {photos[currentIndex].caption}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute top-3 left-3 right-3 flex gap-1.5">
                  {photos.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-white/80"
                        initial={{ width: "0%" }}
                        animate={{
                          width:
                            index === currentIndex
                              ? "100%"
                              : index < currentIndex
                              ? "100%"
                              : "0%",
                        }}
                        transition={{
                          duration: index === currentIndex ? 5 : 0,
                          ease: "linear",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                  className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                  className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                {photos.map((photo, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? "border-white scale-110 shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;

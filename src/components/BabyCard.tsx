import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Users,
  Sparkles,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import babyImage from "@/assets/baby-girl.png";

import ShareButtons from "./ShareButtons";
import PhotoGallery from "./PhotoGallery";
import GuestBook from "./GuestBook";
import DeveloperModal from "./DeveloperModal";
import DeveloperButton from "./DeveloperButton";
import ThemeToggle from "./ThemeToggle";
import AudioPlayer from "./AudioPlayer";

const BabyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

  /* ✅ IMAGE SLIDESHOW (AS REQUESTED) */
  const images = ["/H-Hello World.png", babyImage];
  const [imageIndex, setImageIndex] = useState(0);

  /* DETAILS VISIBILITY */
  const [visibleDetails, setVisibleDetails] = useState<Record<string, boolean>>({
    Gender: true,
    "Birth Place": true,
    Time: true,
    Date: true,
    Father: true,
    Mother: true,
  });

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleDetail = (label: string) => {
    setVisibleDetails((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "baby-announcement.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setIsDownloading(false);
  };

  const details = [
    { icon: Heart, label: "Gender", value: "Baby Girl (Female)", color: "text-primary" },
    { icon: MapPin, label: "Birth Place", value: "Nandyal Hospital" },
    { icon: Clock, label: "Time", value: "3:51 PM" },
    { icon: Calendar, label: "Date", value: "15-12-2025" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-celebration dark:bg-gradient-cinematic flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* TOP CONTROLS */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
        <div className="pointer-events-auto">
          <AudioPlayer />
        </div>
      </div>

      {/* CARD */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-card rounded-3xl shadow-elevated border border-border/30 overflow-hidden mt-16"
      >
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* IMAGE SLIDESHOW */}
        <div className="relative h-52 md:h-60 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />

          {/* ARROWS */}
          <button
            onClick={() =>
              setImageIndex((prev) => (prev - 1 + images.length) % images.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/60 backdrop-blur flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              setImageIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/60 backdrop-blur flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <Sparkles className="mx-auto w-5 h-5 text-accent mb-2" />
            <h1 className="text-2xl md:text-3xl font-display font-semibold">
              ✨ Name Coming Soon ✨
            </h1>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/30 min-h-[72px]"
              >
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <detail.icon className={`w-4 h-4 ${detail.color || "text-muted-foreground"}`} />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase">
                    {detail.label}
                  </p>
                  <p className="text-sm font-medium">
                    {visibleDetails[detail.label] ? detail.value : "••••••"}
                  </p>
                </div>

                <button onClick={() => toggleDetail(detail.label)}>
                  {visibleDetails[detail.label] ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* PARENTS */}
          <div className="border-t pt-4 text-center">
            <Users className="mx-auto w-4 h-4 mb-2 text-muted-foreground" />
            <div className="flex justify-center gap-8">
              {[
                { label: "Father", value: "Hussainaiah" },
                { label: "Mother", value: "Habeeb Hunnisa" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{p.label}</p>
                    <p className="font-medium">
                      {visibleDetails[p.label] ? p.value : "••••••••"}
                    </p>
                  </div>
                  <button onClick={() => toggleDetail(p.label)}>
                    {visibleDetails[p.label] ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
      </motion.div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button onClick={handleDownload} disabled={isDownloading} className="px-8 py-6 rounded-full">
          <Download className="w-5 h-5 mr-2" />
          {isDownloading ? "Downloading..." : "Download Card"}
        </Button>

        <ShareButtons targetRef={cardRef} />

        <div className="flex gap-3">
          <PhotoGallery />
          <GuestBook />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground text-center">
        A moment forever cherished. Welcome to the family, little one 💕
      </p>

      <div className="mt-6">
        <DeveloperButton onOpenDeveloper={() => setIsDeveloperOpen(true)} />
      </div>

      <DeveloperModal
        isOpen={isDeveloperOpen}
        onClose={() => setIsDeveloperOpen(false)}
      />
    </motion.div>
  );
};

export default BabyCard;

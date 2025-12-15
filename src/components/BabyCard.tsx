import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import babyImage from "@/assets/baby-girl.png";
import ShareButtons from "./ShareButtons";
import PhotoGallery from "./PhotoGallery";
import GuestBook from "./GuestBook";
import DeveloperModal from "./DeveloperModal";

const images = [
  "/H-Hello World.png",
  babyImage,
];

const BabyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  /* 🔁 Slideshow */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* 🪄 Mouse Parallax Tilt (disabled during export) */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExporting || window.innerWidth < 768 || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    cardRef.current.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  /* 📥 Download Card (EXPORT SAFE) */
  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    setIsExporting(true);

    await new Promise((r) => setTimeout(r, 120)); // allow DOM update

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "baby-announcement.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setIsExporting(false);
    setIsDownloading(false);
  };

  const details = [
    { icon: Heart, label: "Gender", value: "Baby Girl 👶🎀" },
    { icon: MapPin, label: "Place", value: "Nandyal Hospital" },
    { icon: Clock, label: "Time", value: "3:40 PM" },
    { icon: Calendar, label: "Date", value: "15-12-2025" },
    { icon: Scale, label: "Weight", value: "4.2 kg" },
  ];

  return (
    <motion.div
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ✨ Floating background effects (hidden during export) */}
      {!isExporting && (
        <>
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
          />
        </>
      )}

      {/* 🃏 Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`
          relative w-full
          max-w-[320px] sm:max-w-md
          rounded-3xl
          border border-border/30
          overflow-hidden
          shadow-[0_40px_120px_rgba(0,0,0,0.45)]
          ${isExporting ? "bg-card" : "bg-card/85 backdrop-blur-xl"}
        `}
      >
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="p-6 sm:p-8">
          {/* 🧸 Name Reveal */}
          <div className="text-center mb-6">
            <span className="text-xs tracking-widest text-muted-foreground">
              Welcome to the World 🌍
            </span>

            <motion.h1 className="text-2xl sm:text-3xl font-display mt-2 relative z-10">
  <motion.span
    animate={!isExporting ? { opacity: [0.6, 1, 0.6] } : {}}
    transition={{ duration: 2.5, repeat: Infinity }}
    className="
      relative
      inline-block
      px-2
      bg-gradient-to-r from-primary via-accent to-primary
      bg-clip-text text-transparent
      isolate
    "
  >
    ✨ Name Coming Soon ✨
  </motion.span>
</motion.h1>

          </div>

          {/* 🖼️ Image Slideshow */}
          <div className="flex justify-center mb-6">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-[24px] overflow-hidden border border-white/20 bg-white"
            >
              <img
                src={images[currentImage]}
                alt="Baby"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* 📋 Details */}
          <div className="space-y-3">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/40"
              >
                <d.icon className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs uppercase">{d.label}</p>
                  <p className="font-medium text-sm">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 👨‍👩‍👧 Parents */}
          <div className="text-center mt-6 border-t pt-4">
            <p className="text-xs text-muted-foreground">Proud Parents</p>
            <p className="font-semibold text-sm">
              Hussainaiah & Habeeb Hunnisa
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
      </motion.div>

      {/* 🔘 Actions */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button onClick={handleDownload} disabled={isDownloading}>
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Preparing..." : "Download Card"}
        </Button>

        <ShareButtons cardRef={cardRef} />

        <div className="flex gap-3">
          <PhotoGallery />
          <GuestBook />
        </div>
      </div>

      <DeveloperModal />
    </motion.div>
  );
};

export default BabyCard;

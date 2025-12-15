import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Scale,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import babyImage from "@/assets/baby-girl.png";
import ShareButtons from "./ShareButtons";
import PhotoGallery from "./PhotoGallery";
import GuestBook from "./GuestBook";
import DeveloperModal from "./DeveloperModal";

const BabyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  /* 🔁 Image slideshow */
  const images = ["/H-Hello World.png", babyImage];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    { icon: Heart, label: "Gender", value: "Female" },
    { icon: MapPin, label: "Birth Place", value: "Nandyal Hospital" },
    { icon: Clock, label: "Time", value: "3:40 PM" },
    { icon: Calendar, label: "Date", value: "15-12-2025" },
    { icon: Scale, label: "Weight", value: "4.2 kg" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-celebration flex flex-col items-center justify-center px-4 py-12"
    >
      {/* 3D Card */}
      <motion.div
        ref={cardRef}
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          rotateX: 6,
          rotateY: -6,
          scale: 1.02,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="
          relative w-full max-w-md
          rounded-3xl
          bg-card/90
          backdrop-blur-xl
          border border-border/30
          shadow-[0_40px_120px_rgba(0,0,0,0.45)]
          overflow-hidden
        "
      >
        {/* Gradient borders */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="p-6">
  {/* Header */}
  <div className="text-center mb-4">
    <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
      Welcome
    </p>

    <h1 className="mt-2 text-lg sm:text-xl font-display font-medium leading-relaxed">
      ✨ Hello World, Baby Girl 👶🎀✨  
      <span className="block text-sm sm:text-base text-muted-foreground mt-1">
        A tiny miracle 💖, welcome to our world 🌍👧
      </span>
    </h1>
  </div>

          {/* 🖼️ 3D Image Slideshow */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="
                relative w-44 h-44
                rounded-[28px]
                overflow-hidden
                bg-muted
                border border-white/20
                shadow-[0_25px_60px_rgba(0,0,0,0.5)]
              "
              animate={{
                rotateY: [0, 4, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />

              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/30"
              >
                <d.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs uppercase text-muted-foreground">
                    {d.label}
                  </p>
                  <p className="font-medium">{d.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Parents */}
          <div className="text-center mt-6 border-t border-border/50 pt-4">
            <Users className="w-4 h-4 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Proud Parents</p>
            <p className="font-semibold">
              Hussainaiah & Habeeb Hunnisa
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
      </motion.div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-4 items-center">
        <Button onClick={handleDownload} disabled={isDownloading}>
          <Download className="w-4 h-4 mr-2" />
          Download Card
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

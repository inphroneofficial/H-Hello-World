import { motion } from "framer-motion";
import {
  Share2,
  MessageCircle,
  Image as ImageIcon,
  Instagram,
} from "lucide-react";
import html2canvas from "html2canvas";

interface ShareButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const ShareButtons = ({ cardRef }: ShareButtonsProps) => {
  const shareText = `👶💖✨ We are blessed with a beautiful baby girl!

Born on 15 December 2025 at 3:40 PM
Nandyal Hospital 🏥

A Memorable Moment 🌸🕊️`;

  /* ---------------- MESSAGE ONLY ---------------- */

  const shareMessageWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const shareMessageInstagram = () => {
    alert(
      "Instagram does not support direct message sharing from browser.\nMessage copied to clipboard."
    );
    navigator.clipboard.writeText(shareText);
  };

  /* ---------------- IMAGE SHARE ---------------- */

  const createImageFile = async (): Promise<File | null> => {
    if (!cardRef.current) return null;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null);
        resolve(
          new File([blob], "baby-announcement.png", { type: "image/png" })
        );
      });
    });
  };

  const shareImage = async () => {
    const file = await createImageFile();
    if (!file) return;

    // ✅ Mobile share (best experience)
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        text: shareText,
      });
      return;
    }

    // ❌ Desktop fallback
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();

    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const buttons = [
    {
      label: "WhatsApp Message",
      icon: MessageCircle,
      onClick: shareMessageWhatsApp,
      color: "hover:bg-green-500/10 hover:text-green-600",
    },
    {
      label: "WhatsApp Image",
      icon: ImageIcon,
      onClick: shareImage,
      color: "hover:bg-green-500/10 hover:text-green-600",
    },
    {
      label: "Instagram Message",
      icon: Instagram,
      onClick: shareMessageInstagram,
      color:
        "hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-orange-500/10 hover:text-pink-600",
    },
    {
      label: "Instagram Image",
      icon: ImageIcon,
      onClick: shareImage,
      color:
        "hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-orange-500/10 hover:text-pink-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="flex items-center gap-1 text-muted-foreground">
        <Share2 className="w-4 h-4" />
        <span className="text-xs font-elegant tracking-wider uppercase">
          Share
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {buttons.map((btn) => (
          <motion.button
            key={btn.label}
            onClick={btn.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl bg-card/80 border border-border/50 flex items-center gap-2 text-sm transition-all ${btn.color}`}
          >
            <btn.icon className="w-4 h-4" />
            {btn.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ShareButtons;

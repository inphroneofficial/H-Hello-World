import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import {
  Share2,
  MessageCircle,
  Image as ImageIcon,
  Copy,
} from "lucide-react";

interface ShareButtonsProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const shareText = `🎀 We're blessed with a baby girl! ✨

📍 Birth Place: Nandyal Hospital
📅 Date: 15-12-2025
⏰ Time: 3:40 PM

👨 Father: Hussainaiah
👩 Mother: Habeeb Hunnisa

💕 Welcome to our little angel!`;

const ShareButtons = ({ targetRef }: ShareButtonsProps) => {
  /* Capture card as FILE (not download) */
  const captureImageFile = async (): Promise<File | null> => {
    if (!targetRef.current) return null;

    const canvas = await html2canvas(targetRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null);
        resolve(new File([blob], "baby-announcement.png", { type: "image/png" }));
      });
    });
  };

  /* 🟢 WhatsApp Message */
  const waMessage = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  /* 🟢 WhatsApp / 🟣 Instagram Image */
  const shareImage = async () => {
    const file = await captureImageFile();
    if (!file) return;

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Baby Announcement",
        text: shareText,
      });
    } else {
      alert("Image sharing works only on mobile browsers.");
    }
  };

  /* 🟣 Instagram Message (Copy only – limitation) */
  const instaMessage = async () => {
    await navigator.clipboard.writeText(shareText);
    alert("Message copied. Paste it in Instagram caption or story.");
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-1 text-muted-foreground">
        <Share2 className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider">Share</span>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-green-600 w-20">
          WhatsApp
        </span>

        <motion.button
          onClick={waMessage}
          whileHover={{ scale: 1.1 }}
          className="share-btn text-green-600"
        >
          <MessageCircle className="w-4 h-4" /> Message
        </motion.button>

        <motion.button
          onClick={shareImage}
          whileHover={{ scale: 1.1 }}
          className="share-btn text-green-600"
        >
          <ImageIcon className="w-4 h-4" /> Image
        </motion.button>
      </div>

      {/* Instagram */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-pink-600 w-20">
          Instagram
        </span>

        <motion.button
          onClick={shareImage}
          whileHover={{ scale: 1.1 }}
          className="share-btn text-pink-600"
        >
          <ImageIcon className="w-4 h-4" /> Image
        </motion.button>

        <motion.button
          onClick={instaMessage}
          whileHover={{ scale: 1.1 }}
          className="share-btn text-pink-600"
        >
          <Copy className="w-4 h-4" /> Message
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShareButtons;

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageSquareHeart, X, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const GuestBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    const phoneNumber = "9666265849";

    const whatsappMessage = `Hello 👶💗✨
Sending love, blessings, and warm wishes on this beautiful new beginning 🌸🕊️

👤 My Name:
${name.trim()}

💌 Blessings:
${message.trim()}

— Sent with love from the H-Hello World Application 🎀`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    // Clear & close
    setName("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Leave a Wish Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9 }}
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquareHeart className="w-4 h-4" />
        <span className="text-sm font-elegant tracking-wider">
          Leave a Wish
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card rounded-3xl shadow-elevated overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquareHeart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold">
                        Guest Book
                      </h2>
                      <p className="text-xs text-muted-foreground font-elegant">
                        Leave your blessings & wishes
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 font-elegant focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />

                  <textarea
                    placeholder="Write your blessing or wish..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 font-elegant focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />

                  <Button
                    type="submit"
                    className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-wider"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Send Blessings
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>

              {/* Bottom Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuestBook;

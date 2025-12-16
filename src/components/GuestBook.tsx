import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageSquareHeart, X, Send, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

const GuestBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Family & Friends",
      message: "Congratulations on this beautiful blessing! 💕",
      timestamp: new Date(),
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      // Add to local messages
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: name.trim(),
          message: message.trim(),
          timestamp: new Date(),
        },
      ]);

      // Create WhatsApp message with details
      const whatsappMessage = `🎀 *Baby Blessing Message*\n\n👤 *From:* ${name.trim()}\n\n💌 *Message:*\n${message.trim()}\n\n✨ Sent with love from the Baby Announcement App`;
      
      // Redirect to WhatsApp with the phone number
      const phoneNumber = "919666265849"; // Added country code
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      window.open(whatsappUrl, "_blank");

      // Clear form
      setName("");
      setMessage("");
    }
  };

  return (
    <>
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
        <span className="text-sm font-elegant tracking-wider">Send Blessings</span>
      </motion.button>

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
              {/* Header */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquareHeart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground">
                        Send Blessings
                      </h2>
                      <p className="text-xs text-muted-foreground font-elegant">
                        Your message will be sent via WhatsApp
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Messages list */}
                <div className="max-h-48 overflow-y-auto space-y-4 mb-6 pr-2">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-2xl bg-muted/50 border border-border/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-display font-medium text-foreground">
                          {msg.name}
                        </span>
                      </div>
                      <p className="text-sm font-elegant text-muted-foreground pl-8">
                        {msg.message}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground font-elegant focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Write your blessing or wish..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground font-elegant focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-display tracking-wider"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>

              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuestBook;

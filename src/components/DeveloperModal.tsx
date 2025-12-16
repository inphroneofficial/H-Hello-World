import { motion, AnimatePresence } from "framer-motion";
import { Instagram, X, Sparkles } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperModal = ({ isOpen, onClose }: DeveloperModalProps) => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/g_thangella_k",
      label: "Instagram",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-lg
                     flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-card/95 backdrop-blur-xl rounded-3xl
                         shadow-elevated overflow-hidden
                         border border-border/30"
            >
              {/* Top gradient */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full
                           bg-muted/50 flex items-center justify-center
                           text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 text-center">
                {/* Profile */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div
                    className="absolute -inset-1 rounded-2xl
                               bg-gradient-to-br from-primary via-accent to-primary
                               blur opacity-60"
                  />
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden
                               bg-muted border border-white/20"
                  >
                    <img
                      src="/GTK.png"
                      alt="Developer Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-display font-semibold mb-1">
                  G. Thangella
                </h3>

                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-sm font-elegant tracking-wider">
                    Creator of this moment
                  </span>
                  <Sparkles className="w-3 h-3 text-accent" />
                </div>

                <p className="text-sm font-elegant text-muted-foreground mb-8 max-w-xs mx-auto">
                  This application was lovingly crafted by me, her mama,
                  to celebrate the birth of a beautiful baby girl —
                  a once-in-a-lifetime moment.
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-muted/50
                                 flex items-center justify-center
                                 text-muted-foreground
                                 hover:text-primary hover:bg-primary/10
                                 transition-all duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Bottom gradient */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperModal;

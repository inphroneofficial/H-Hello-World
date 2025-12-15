import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Instagram, X, Sparkles } from "lucide-react";

const DeveloperModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200); // 👈 show after scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/thangella",
      label: "Instagram",
    },
  ];

  return (
    <>
      {/* Developer credit button (shows only after scroll) */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-40 group"
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border/30 shadow-soft text-muted-foreground hover:text-foreground transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xs font-elegant tracking-wider opacity-70 group-hover:opacity-100">
                Developed by
              </span>
              <span className="text-xs font-display font-semibold">
                Thangella
              </span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl shadow-elevated overflow-hidden border border-border/30">
                {/* Top gradient */}
                <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>

                <div className="p-8 text-center">
                  {/* Profile */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary blur opacity-60" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted border border-white/20">
                      <img
                        src="/GTK.png"
                        alt="Developer Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-semibold mb-1">
                    G.Thangella
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-sm font-elegant tracking-wider">
                      Creator of this moment
                    </span>
                    <Sparkles className="w-3 h-3 text-accent" />
                  </div>

                  <p className="text-sm font-elegant text-muted-foreground mb-8 max-w-xs mx-auto">
                    This application was lovingly crafted by me, her mama, to celebrate the birth of a beautiful baby girl—her entry into the world and a once-in-a-lifetime moment.
                  </p>

                  <div className="flex justify-center">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center hover:text-primary hover:bg-primary/10"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5" />
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
    </>
  );
};

export default DeveloperModal;

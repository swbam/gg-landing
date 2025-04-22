import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import MobileForm from './MobileForm';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled 20% of the page
      const showThreshold = windowHeight * 0.2;
      
      // Hide when near the bottom of the page to avoid overlapping with footer
      const hideThreshold = documentHeight - windowHeight - 100;
      
      setIsVisible(scrollY > showThreshold && scrollY < hideThreshold);
    };

    checkMobile();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="flex gap-2 p-3 bg-white border-t border-gray-200">
            <a
              href="tel:6154511550"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-primary font-medium px-3 py-3 rounded-[1px] hover:bg-accent/90 transition-colors text-center whitespace-nowrap text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-3 py-3 rounded-[1px] hover:bg-primary/90 transition-colors whitespace-nowrap text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Free Consultation</span>
            </button>
          </div>
        </motion.div>
      )}
      <MobileForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </AnimatePresence>
  );
};

export default FloatingCTA;
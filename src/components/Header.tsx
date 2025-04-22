import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import logoWhite from '@/assets/logo.webp';
import skylineBg from '@/assets/george-and-george-nashville-skyline-jpg.webp';
import headshot from '@/assets/chris-about-headshot.png';
import HeroForm from './HeroForm';
import { useInView } from '@/hooks/use-in-view';

const Header = ({ headline, subheadline, cta }: { headline: string; subheadline: string; cta: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={ref} className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={skylineBg} 
          alt="Nashville Skyline" 
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-primary/60 -[2px]"></div>
      </motion.div>

      {/* Navbar */}
      <nav 
        className={`fixed top-[88px] sm:top-[px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
        }`}
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <img src={logoWhite} alt="George & George Disability Law" className="h-10 md:h-12" />
          </div>

          <a 
            href="tel:+16154511550" 
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[1px] hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>(615) 451-1550</span>
          </a>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 sm:pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {headline}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+16154511550"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors text-center"
              >
                {cta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-[1px] shadow-2xl p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 mb-6 p-4 border border-gray-300 rounded-[1px]"
              >
                <img src={headshot} alt="Chris George" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h3 className="text-2xl font-medium mb-1">Chris George</h3>
                  <p className="text-gray-600">Dedicated Disability Attorney for Middle Tennessee & Southern Kentucky</p>
                </div>
              </motion.div>
              <HeroForm id="hero-contact-form" location="hero" />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
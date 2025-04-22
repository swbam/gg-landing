import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroForm from '@/components/HeroForm';
import { Phone, CheckCircle2 } from 'lucide-react';
import logoWhite from '@/assets/logo.webp';
import skylineBg from '@/assets/george-and-george-nashville-skyline-jpg.webp';
import headshot from '@/assets/chris-about-headshot.png';

interface HeaderProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
}

const Header = ({
  headline = "Get the Disability Benefits You Deserve",
  subheadline = "Our experienced attorneys will fight for your rights and help you navigate the complex disability system. Let us handle your case while you focus on your health.",
  cta = "Call Now: (615) 451-1550"
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    "50+ Years Combined Experience",
    "Free Case Review",
    "No Fee Unless You Win",
    "Local Tennessee & Kentucky Experts"
  ];

  return (
    <header className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={skylineBg} 
          alt="Nashville Skyline" 
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logoWhite} alt="George & George Disability Law" className="h-12 md:h-16" />
          </div>

          <a 
            href="tel:+16154511550" 
            className="hidden md:flex items-center gap-2 font-medium text-white hover:text-accent transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>(615) 451-1550</span>
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white  mb-6 leading-tight">
              {headline}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {subheadline}
            </p>

            <div className="grid gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>

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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-[1px] shadow-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={headshot} alt="Chris George" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg ">Chris George</h3>
                  <p className="text-gray-600">Disability Attorney</p>
                </div>
              </div>
              <HeroForm id="hero-contact-form" location="hero" />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
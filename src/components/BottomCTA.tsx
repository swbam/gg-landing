import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import HeroForm from './HeroForm';
import skylineBg from '@/assets/george-and-george-nashville-skyline-jpg.webp';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  "50+ Years Combined Experience",
  "Free Case Review",
  "No Fee Unless You Win",
  "Local Tennessee & Kentucky Experts",
  "Specialized Disability Law Focus",
  "Compassionate, Personal Service"
];

const BottomCTA = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={skylineBg} 
          alt="Nashville Skyline" 
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-primary/80 -[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading mb-4">
                  Get Help With Your Disability Case Today
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  Take the first step toward securing your benefits. Share your contact info below, and we'll reach out to discuss your case.
                </p>
              </div>

              <div className="grid gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
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
                  href="tel:6154511550"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors text-center"
                >
                  Call Now: (615) 451-1550
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-[1px] shadow-2xl p-6">
              <HeroForm id="bottom-contact-form" location="bottom" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
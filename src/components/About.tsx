import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { Check } from 'lucide-react';
import chrisHeadshot from '@/assets/chris-about-headshot.png';

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="w-[400px] h-[400px] rounded-full overflow-hidden">
              <img 
                src={chrisHeadshot} 
                alt="Attorney Chris George" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              Meet Attorney Chris George
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              With over two decades of experience in disability law, Chris George has dedicated his career to helping individuals navigate the complex Social Security Disability system and secure the benefits they deserve.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Extensive experience</span> in Social Security Disability law, helping hundreds of clients
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Personal approach</span> to every case, ensuring clients get the individualized attention they deserve
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Proven track record</span> of successful appeals and hearings before Administrative Law Judges
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Compassionate advocacy</span> that treats clients with the dignity and respect they deserve
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
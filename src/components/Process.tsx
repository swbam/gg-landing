import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { FileCheck, FileSearch, Scale, Users } from 'lucide-react';

const steps = [
  {
    icon: <FileSearch className="h-8 w-8 text-accent" />,
    title: "Free Case Review",
    description: "We'll evaluate your case at no cost, explain your options, and develop a strategy tailored to your situation.",
  },
  {
    icon: <FileCheck className="h-8 w-8 text-accent" />,
    title: "Application & Documentation",
    description: "We handle all paperwork, gather medical evidence, and ensure your application is complete and compelling.",
  },
  {
    icon: <Scale className="h-8 w-8 text-accent" />,
    title: "Appeals & Hearings",
    description: "If needed, we'll appeal denials and represent you at hearings, using our expertise to present your case effectively.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "Ongoing Support",
    description: "We stay with you throughout the process, keeping you informed and fighting for the benefits you deserve.",
  }
];

const Process = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading  text-primary mb-4">
            How We Help You Win Your Case
          </h2>
          <p className="text-lg -foreground max-w-3xl mx-auto">
            Our proven process has helped thousands of clients secure their disability benefits. Here's how we'll work together:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%_-_2rem)] w-full h-[2px] bg-accent/20">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent" />
                </div>
              )}

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border/50 h-full">
                <div className="bg-primary/5 rounded-lg p-4 w-fit mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-heading  text-primary mb-2">
                  {step.title}
                </h3>
                <p className="-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-primary font-medium mb-4">
            Don't Wait to Get Help with Your Disability Claim
          </p>
          <a 
            href="#contact-form"
            className="inline-flex items-center justify-center bg-accent text-primary font-medium px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Start Your Free Case Review
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
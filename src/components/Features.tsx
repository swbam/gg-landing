import { motion } from 'framer-motion';
import { 
  Scale, 
  Award, 
  Clock, 
  DollarSign,
  Users,
  Briefcase,
  HeartHandshake,
  MapPin
} from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const features = [
  {
    icon: <Scale className="h-10 w-10 text-accent" />,
    title: "Specialized Disability Law Expertise",
    description: "Our practice is 100% focused on Social Security Disability law, ensuring you get the most knowledgeable representation possible.",
  },
  {
    icon: <Award className="h-10 w-10 text-accent" />,
    title: "50+ Years Combined Experience",
    description: "With over five decades of combined experience, we've successfully helped thousands of clients secure their disability benefits.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Personal Attention",
    description: "You'll work directly with our experienced attorneys who will guide you through every step of your disability claim.",
  },
  {
    icon: <Clock className="h-10 w-10 text-accent" />,
    title: "Timely Case Handling",
    description: "We understand the urgency of your situation and work efficiently to move your case forward as quickly as possible.",
  },
  {
    icon: <DollarSign className="h-10 w-10 text-accent" />,
    title: "No Fee Unless You Win",
    description: "We only get paid if we win your case. There are no upfront costs or hidden fees – guaranteed.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-accent" />,
    title: "Local Tennessee & Kentucky Expertise",
    description: "We know the local Social Security offices, judges, and processes, giving you a significant advantage.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: "Full-Service Representation",
    description: "From initial application to appeals and hearings, we handle every aspect of your disability claim.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-accent" />,
    title: "Compassionate Advocacy",
    description: "We treat every client with the respect and compassion they deserve while fighting tirelessly for their benefits.",
  }
];

const Features = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading  text-primary mb-4">
            Why Choose George & George Disability Law?
          </h2>
          <p className="text-lg -foreground max-w-3xl mx-auto">
            With over 50 years of combined experience, we've helped thousands of Tennessee and Kentucky residents secure their disability benefits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border/50"
            >
              <div className="bg-primary/5 rounded-lg p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading  text-primary mb-2">
                {feature.title}
              </h3>
              <p className="-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
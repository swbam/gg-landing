import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  date: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    text: "Chris George and his team were absolutely amazing! They helped me navigate through the complex disability process and won my case. I couldn't be more grateful for their expertise and dedication.",
    date: "2 weeks ago",
    rating: 5
  },
  {
    name: "Michael T.",
    text: "I was denied twice before coming to George & George. They took over my case and got me approved. Their knowledge of the system is incredible. Thank you!",
    date: "1 month ago",
    rating: 5
  },
  {
    name: "Patricia D.",
    text: "The best disability lawyers in Tennessee! They were always available to answer my questions and kept me informed throughout the entire process. Highly recommend!",
    date: "1 month ago",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what clients have to say about their experience working with George & George Disability Law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-[1px] shadow-sm flex flex-col h-full"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 flex-grow mb-4">{testimonial.text}</p>

              {/* Author Info */}
              <div className="mt-auto">
                <p className="font-medium text-primary">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
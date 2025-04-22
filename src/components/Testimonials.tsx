import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // In a real implementation, this would be an API call to your backend
        // which would then fetch reviews from Google's API
        const mockGoogleReviews: Review[] = [
          {
            name: "Sarah J.",
            rating: 5,
            text: "Chris George and his team were absolutely amazing! They helped me navigate through the complex disability process and won my case. I couldn't be more grateful for their expertise and dedication.",
            date: "2 weeks ago"
          },
          {
            name: "Michael T.",
            rating: 5,
            text: "I was denied twice before coming to George & George. They took over my case and got me approved. Their knowledge of the system is incredible. Thank you!",
            date: "1 month ago"
          },
          {
            name: "Patricia D.",
            rating: 5,
            text: "The best disability lawyers in Tennessee! They were always available to answer my questions and kept me informed throughout the entire process. Highly recommend!",
            date: "1 month ago"
          },
          {
            name: "Robert W.",
            rating: 5,
            text: "Professional, knowledgeable, and caring. They truly understand the challenges we face and fight hard for their clients. So glad I chose them to represent me.",
            date: "2 months ago"
          },
          {
            name: "Jennifer M.",
            rating: 5,
            text: "After being denied multiple times, George & George helped me win my case. Their experience and dedication made all the difference. Thank you for everything!",
            date: "2 months ago"
          },
          {
            name: "David A.",
            rating: 5,
            text: "Outstanding service from start to finish. They explained everything clearly and fought hard for my rights. I'm now receiving the benefits I deserve.",
            date: "3 months ago"
          }
        ];

        setReviews(mockGoogleReviews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= reviews.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? Math.max(0, reviews.length - 3) : prevIndex - 3
    );
  };

  const currentReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section ref={ref} className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg -foreground max-w-3xl mx-auto">
            Read what clients have to say about their experience working with George & George Disability Law.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex gap-6 mb-8">
              {currentReviews.map((review, index) => (
                <motion.div
                  key={currentIndex + index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-1 bg-white p-6 rounded-[1px] shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-700">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-primary">
                        {review.name}
                      </div>
                      <div className="text-sm -foreground">
                        {review.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </div>

         
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
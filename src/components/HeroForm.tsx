import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGTMEvents } from '@/hooks/use-gtm-events';
import { submitToGoogleSheet } from '@/lib/form-utils';

interface HeroFormProps {
  location: 'hero' | 'bottom';
  id?: string;
}

const HeroForm = ({ location, id = 'contact-form' }: HeroFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const gtm = useGTMEvents();

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    benefitType: '',
    name: '',
    message: ''
  });

  // Track form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted && !isLoading && !isSuccess) {
        gtm.trackFormAbandonment(location, step);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formStarted, isLoading, step, location, gtm, isSuccess]);

  const resetForm = () => {
    setFormData({
      phone: '',
      email: '',
      benefitType: '',
      name: '',
      message: ''
    });
    setStep(1);
    setFormStarted(false);
    setIsSuccess(false);
    setError(null);
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Track step 1 completion
      gtm.trackFormStepComplete(location, 1, formData.benefitType);
      
      // Save partial lead data
      await submitToGoogleSheet(formData, true);
      
      // Move to next step
      setStep(2);
    } catch (error) {
      console.error('Error saving partial lead:', error);
      setError('There was an error submitting your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Track final form submission
      gtm.trackFormSubmit(location);
      
      // Submit complete form data
      await submitToGoogleSheet(formData, false);
      
      setIsSuccess(true);
      
      // Reset form after 5 seconds
      setTimeout(resetForm, 5000);
    } catch (error) { 
      console.error('Error submitting form:', error);
      setError('There was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (!formStarted) {
      setFormStarted(true);
      gtm.trackFormStart(location);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-600">We'll be in touch with you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={step === 1 ? handleInitialSubmit : handleFinalSubmit} id={id} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-[1px] mb-4 text-sm">
          {error}
        </div>
      )}
      
      {isSuccess ? (
        <div className="text-green-600 text-center p-4 bg-green-50 rounded-[1px]">
          Thank you! We'll be in touch shortly.
        </div>
      ) : (
        <>
          <p className="text-gray-600 text-sm mb-6">
            Take the first step toward securing your benefits. Share your contact info, and we'll reach out to help.
          </p>
          
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number*"
                  required
                  className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  required
                  className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <select
                  name="benefitType"
                  value={formData.benefitType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select Benefit Type*</option>
                  <option value="SSDI">Social Security Disability (SSDI)</option>
                  <option value="SSI">Supplemental Security Income (SSI)</option>
                  <option value="Both">Both SSDI & SSI</option>
                  <option value="Unknown">I'm Not Sure</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your case..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Submit'
                )}
              </button>
            </motion.div>
          )}
        </>
      )}
    </form>
  );
};

export default HeroForm;
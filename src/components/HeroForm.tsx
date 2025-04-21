import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGTMEvents } from '@/hooks/use-gtm-events';

interface HeroFormProps {
  location: 'hero' | 'bottom';
  id?: string;
}

const HeroForm = ({ location, id = 'contact-form' }: HeroFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        gtm.trackFormAbandonment(location, step, formData.benefitType);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formStarted, isLoading, step, location, formData.benefitType, gtm, isSuccess]);

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
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Track step 1 completion
      gtm.trackFormStepComplete(location, 1, formData.benefitType);
      
      // Save partial lead data first
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Partial lead saved:', {
        email: formData.email,
        phone: formData.phone,
        benefitType: formData.benefitType
      });
      
      // Move to next step
      setStep(2);
    } catch (error) {
      console.error('Error saving partial lead:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Track final form submission
      gtm.trackFormSubmit(location, formData.benefitType);
      
      // Submit complete form data
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Complete form submitted:', formData);
      
      setIsSuccess(true);
      
      // Reset form after 5 seconds
      setTimeout(resetForm, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Track form start on first interaction
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
        className="w-full text-center py-8 px-4"
      >
        <div className="mb-4 flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-heading text-primary mb-2">
          Thank You for Reaching Out!
        </h3>
        <p className="text-lg mb-6">
          We'll contact you within 24 hours to discuss your case.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={resetForm}
          className="text-sm underline hover:text-primary"
        >
          Submit another inquiry
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading text-primary mb-2">
          {location === 'hero' ? 'Get Your Free Case Review' : 'Start Your Free Consultation'}
        </h2>
        <p className="-foreground">
          {step === 1 ? 'Quick 30-second evaluation to check your eligibility.' : 'Tell us more about your case.'}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleInitialSubmit} className="space-y-4" id={`${id}-step1`}>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
              required
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              title="Please enter a valid 10-digit phone number"
              className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-base"
              disabled={isLoading}
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
              className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <select
              name="benefitType"
              value={formData.benefitType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-base bg-white"
              disabled={isLoading}
            >
              <option value="">Select Benefit Type*</option>
              <option value="SSDI">Social Security Disability (SSDI)</option>
              <option value="SSI">Supplemental Security Income (SSI)</option>
              <option value="UNSURE">Not Sure/Need Help Deciding</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Checking Eligibility...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="space-y-4" id={`${id}-step2`}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name*"
              required
              className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Brief description of your case*"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-[1px] border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-base resize-none"
              disabled={isLoading}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-accent text-primary font-medium px-6 py-3 rounded-[1px] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Get Free Consultation'
            )}
          </motion.button>
        </form>
      )}

      <p className="text-xs -foreground text-center mt-4">
        By submitting this form, you agree to be contacted about your case.
      </p>
    </div>
  );
};

export default HeroForm;
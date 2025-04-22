import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGTMEvents } from '@/hooks/use-gtm-events';
import { submitToGoogleSheet } from '@/lib/form-utils';

interface MobileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileForm = ({ isOpen, onClose }: MobileFormProps) => {
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
        gtm.trackFormAbandonment('mobile', step);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formStarted, isLoading, step, gtm, isSuccess]);

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
      gtm.trackFormStepComplete('mobile', 1, formData.benefitType);
      
      // Save partial lead data
      await submitToGoogleSheet({
        ...formData,
        location: 'mobile-fullscreen',
        timestamp: new Date().toISOString()
      }, 'mobile-fullscreen', true);
      
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
      gtm.trackFormSubmit('mobile');
      
      // Submit complete form data
      await submitToGoogleSheet({
        ...formData,
        location: 'mobile-fullscreen',
        timestamp: new Date().toISOString()
      }, 'mobile-fullscreen', false);
      
      setIsSuccess(true);
      
      // Reset form and close after 3 seconds
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('There was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!formStarted) setFormStarted(true);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="relative min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-heading">Free Consultation</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {isSuccess ? (
                <div className="text-center p-6 bg-green-50 rounded-[1px]">
                  <h3 className="text-xl text-green-600 mb-2">Thank You!</h3>
                  <p className="text-green-600">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={step === 1 ? handleInitialSubmit : handleFinalSubmit} className="space-y-5">
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="space-y-5">
                        <label className="block">
                          <span className="text-base mb-1.5 block text-gray-700">Phone Number</span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3.5 border border-gray-300 rounded-[1px] text-base"
                            placeholder="(___) ___-____"
                          />
                        </label>

                        <label className="block">
                          <span className="text-base mb-1.5 block text-gray-700">Benefit Type</span>
                          <select
                            name="benefitType"
                            required
                            value={formData.benefitType}
                            onChange={handleChange}
                            className="w-full p-3.5 border border-gray-300 rounded-[1px] text-base bg-white"
                          >
                            <option value="">Select One</option>
                            <option value="SSDI">Social Security Disability (SSDI)</option>
                            <option value="SSI">Supplemental Security Income (SSI)</option>
                            <option value="Both">Both SSDI & SSI</option>
                            <option value="Unknown">Not Sure</option>
                          </select>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="space-y-5">
                        <label className="block">
                          <span className="text-base mb-1.5 block text-gray-700">Full Name</span>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3.5 border border-gray-300 rounded-[1px] text-base"
                            placeholder="Your Name"
                          />
                        </label>

                        <label className="block">
                          <span className="text-base mb-1.5 block text-gray-700">Email Address</span>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3.5 border border-gray-300 rounded-[1px] text-base"
                            placeholder="your@email.com"
                          />
                        </label>

                        <label className="block">
                          <span className="text-base mb-1.5 block text-gray-700">Additional Details (Optional)</span>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3.5 border border-gray-300 rounded-[1px] text-base h-24"
                            placeholder="Tell us briefly about your case..."
                          />
                        </label>
                      </div>
                    </motion.div>
                  )}

                  <div className="sticky bottom-0 left-0 right-0 pt-4 pb-safe bg-white border-t border-gray-200 mt-auto">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-accent text-primary font-medium p-3.5 rounded-[1px] text-base disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : step === 1 ? (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <CheckCircle2 className="h-5 w-5" />
                        </>
                      )}
                    </button>

                    {/* Step Indicators */}
                    <div className="flex justify-center gap-2 pt-3">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i === step ? 'bg-accent' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileForm;

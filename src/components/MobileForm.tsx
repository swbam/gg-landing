import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { submitForm } from '@/lib/form-utils';

interface MobileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileForm = ({ isOpen, onClose }: MobileFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    benefitType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitForm({
        ...formData,
        location: 'mobile-form',
        timestamp: new Date().toISOString()
      });
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormData({ phone: '', email: '', benefitType: '' });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
    setIsSubmitting(false);
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
          <div className="relative min-h-screen p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading">Free Consultation</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1">
              {isSuccess ? (
                <div className="text-center p-6 bg-green-50 rounded-[1px]">
                  <h3 className="text-xl text-green-600 mb-2">Thank You!</h3>
                  <p className="text-green-600">We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-lg mb-2 block">Phone Number</span>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-4 border border-gray-300 rounded-[1px] text-lg"
                            placeholder="(___) ___-____"
                          />
                        </label>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-lg mb-2 block">Email Address</span>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 border border-gray-300 rounded-[1px] text-lg"
                            placeholder="your@email.com"
                          />
                        </label>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <label className="block">
                          <span className="text-lg mb-2 block">Select Benefit Type</span>
                          <select
                            required
                            value={formData.benefitType}
                            onChange={(e) => setFormData({ ...formData, benefitType: e.target.value })}
                            className="w-full p-4 border border-gray-300 rounded-[1px] text-lg bg-white"
                          >
                            <option value="">Select One</option>
                            <option value="SSDI">Social Security Disability (SSDI)</option>
                            <option value="SSI">Supplemental Security Income (SSI)</option>
                            <option value="Both">Both SSDI & SSI</option>
                            <option value="Unknown">Not Sure</option>
                          </select>
                        </label>
                      </motion.div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent text-primary font-medium p-4 rounded-[1px] text-lg disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : step === 3 ? 'Submit' : 'Continue'}
                    </button>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex justify-center gap-2 pt-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i === step ? 'bg-accent' : 'bg-gray-300'
                        }`}
                      />
                    ))}
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

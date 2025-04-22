import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { checkFormStatus } from './lib/form-utils';
import VariantNav from './components/VariantNav';
import Features from './components/Features';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import BottomCTA from './components/BottomCTA';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import Header from './components/Header';

// Variant Data
const variants = {
  '/variant/1': {
    headline: "Facing the System Alone? Not Anymore.",
    subheadline: "Spare yourself confusion and frustration. Our team guides you every step of the way.",
    cta: "Call (615) 451-1550"
  },
  '/variant/2': {
    headline: "Your Disability Claim Approved",
    subheadline: "Or You Pay Nothing. Start with a Free Consultation Today.",
    cta: "Call (615) 451-1550"
  },
  '/variant/3': {
    headline: "Disability Benefits Shouldn't Be a Battle",
    subheadline: "We Change That. Let Our Experience Guide Your Success.",
    cta: "Call (615) 451-1550"
  },
  '/variant/4': {
    headline: "Can't Work Due to Disability?",
    subheadline: "Get Your Free Case Review Now. We'll Fight for Your Benefits.",
    cta: "Call (615) 451-1550"
  }
};

function MainLayout() {
  const location = useLocation();
  const currentVariant = variants[location.pathname as keyof typeof variants] || variants['/variant/1'];
  const { toast } = useToast();

  useEffect(() => {
    const status = checkFormStatus();
    if (status === 'success') {
      toast({
        title: "Form Submitted Successfully",
        description: "Thank you! We'll be in touch with you shortly.",
        duration: 5000,
      });
    } else if (status === 'error') {
      toast({
        title: "Form Submission Error",
        description: "There was an error submitting your form. Please try again.",
        duration: 5000,
        variant: 'destructive',
      });
    }
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <VariantNav />
      <Header 
        headline={currentVariant.headline}
        subheadline={currentVariant.subheadline}
        cta={currentVariant.cta}
      />
      <Features />
      <About />
      <Process />
      <Testimonials />
      <BottomCTA />
      <FloatingCTA />
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/variant/1" replace />} />
        <Route path="/variant/:id" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
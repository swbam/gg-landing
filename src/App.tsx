import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Features from './components/Features';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import About from './components/About';
import BottomCTA from './components/BottomCTA';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import { checkFormStatus } from './lib/form-utils';
import VariantNav from './components/VariantNav';

// Variants
import Variant1 from './variants/Variant1';
import Variant2 from './variants/Variant2';
import Variant3 from './variants/Variant3';
import Variant4 from './variants/Variant4';

function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Check for form submission status from URL params
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
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <VariantNav />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/variant/1" replace />} />
            <Route path="/variant/1" element={<Variant1 />} />
            <Route path="/variant/2" element={<Variant2 />} />
            <Route path="/variant/3" element={<Variant3 />} />
            <Route path="/variant/4" element={<Variant4 />} />
          </Routes>
          <Features />
          <About />
          <Process />
          <Testimonials />
          <BottomCTA />
        </main>
        <FloatingCTA />
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
import { useEffect } from 'react';
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main>
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
  );
}

export default App;
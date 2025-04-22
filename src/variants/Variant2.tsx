import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BottomCTA from '../components/BottomCTA';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';

export default function Variant2() {
  return (
    <>
      <Header
        headline="Your Disability Claim Approved"
        subheadline="Or You Pay Nothing. Start with a Free Consultation Today."
        cta="Start Free Consultation"
      />
      <Features />
      <About />
      <Process />
      <Testimonials />
      <BottomCTA />
      <FloatingCTA />
      <Footer />
    </>
  );
}

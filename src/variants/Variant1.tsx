import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BottomCTA from '../components/BottomCTA';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';

export default function Variant1() {
  return (
    <>
      <Header
        headline="Facing the System Alone? Not Anymore."
        subheadline="Spare yourself confusion and frustration. Our team guides you every step of the way."
        cta="Get Your Free Case Review"
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

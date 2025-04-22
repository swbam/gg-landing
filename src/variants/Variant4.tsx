import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BottomCTA from '../components/BottomCTA';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';

export default function Variant4() {
  return (
    <>
      <Header
        headline="Can't Work Due to Disability?"
        subheadline="Get Your Free Case Review Now. We'll Fight for Your Benefits."
        cta="Start Your Free Review"
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

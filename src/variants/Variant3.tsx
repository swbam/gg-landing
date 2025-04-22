import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BottomCTA from '../components/BottomCTA';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';

export default function Variant3() {
  return (
    <>
      <Header
        headline="Disability Benefits Shouldn't Be a Battle"
        subheadline="We Change That. Let Our Experience Guide Your Success."
        cta="Get Expert Help Now"
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

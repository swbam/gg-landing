import { Phone, MapPin, Mail } from 'lucide-react';
import logoWhite from '@/assets/logo.webp';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+16154511550" className="hover:text-accent transition-colors">
                  (615) 451-1550
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                <a 
                  href="https://maps.google.com/?q=665+Nashville+Pike,+Gallatin,+TN+37066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  665 Nashville Pike<br />
                  Gallatin, TN 37066
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:info@georgeandgeorge.com" className="hover:text-accent transition-colors">
                  info@georgeandgeorge.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg  mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="#process" className="hover:text-accent transition-colors">Our Process</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-accent transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg  mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-accent transition-colors">Legal Disclaimer</a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div>
            <img src={logoWhite} alt="George & George Disability Law" className="h-16 mb-6" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/70">
          <p> {new Date().getFullYear()} George & George Disability Law. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
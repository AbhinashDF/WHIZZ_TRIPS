import { Link } from "wouter";
import { Plane, Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative">
                <Plane className="text-primary text-3xl mr-3" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="whizz-logo text-white">WHIZZ TRAVELS</span>
                <span className="whizz-tagline">Your Journey Begins Here</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Creating unforgettable travel experiences since 2010. Your journey begins with us.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/whizztravels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
                data-testid="link-facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/whizztravels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
                data-testid="link-instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.twitter.com/whizztravels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
                data-testid="link-twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.youtube.com/c/whizztravels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Subscribe to our YouTube channel"
                data-testid="link-youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-gray-400 hover:text-white transition-colors">
                  Trip Plans
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Book a Ticket
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Maldives
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Japan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Europe
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Africa Safari
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Caribbean
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Phone size={16} className="mr-2" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@whizztravels.com
              </p>
              <p className="flex items-center">
                <MapPin size={16} className="mr-2" />
                123 Travel Street, NY 10001
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 WHIZZ TRAVELS. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}

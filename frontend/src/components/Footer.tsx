import { Link } from 'react-router-dom';
import { FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-400">KUDU</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting timeless leather goods with heritage techniques and modern design. 
              Each piece tells a story of quality, durability, and style.
            </p>
            <p className="text-gray-400 text-xs">
              © 2024 KUDU. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-gray-300 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-300 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/gifts" className="text-gray-300 hover:text-white transition-colors">
                  Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <InstagramLogo className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FacebookLogo className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <TwitterLogo className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <LinkedinLogo className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { ArrowUp, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.svg";
interface FooterProps {
  onContactClick: () => void;
  onBookClick: () => void;
}

export default function Footer({ onContactClick, onBookClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-white py-16 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1">
          <img
            src={logo}
            alt="Company Logo"
            className="w-15 object-contain mb-4"
          />
          <p className="text-white font-sans text-s leading-relaxed max-w-xs mb-6">
            Neutral Marketing Discovery & Safe Engagement.
          </p>
          <a
            href="mailto:business@martechadda.com"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-[#ff5a1f] transition-colors"
          >
            business@martechadda.com
          </a>
        </div>

        {/* Home links */}
        <div>
          <h5 className="text-white font-sans text-sm font-semibold tracking-wide text-slate-200 mb-4 uppercase tracking-wider opacity-75">
            Home
          </h5>
          <ul className="space-y-3 text-s text-white">
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-white font-sans text-sm font-semibold tracking-wide text-slate-200 mb-4 uppercase tracking-wider opacity-75">
            Privacy Policy
          </h5>
          <ul className="space-y-3 text-s text-white">
            <li>
              <button
                onClick={onContactClick}
                className="hover:text-[#ff5a1f] transition-colors text-left focus:outline-none cursor-pointer"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={onBookClick}
                className="hover:text-[#ff5a1f] transition-colors text-left focus:outline-none cursor-pointer"
              >
                Book a Call
              </button>
            </li>
            {/*<li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ff5a1f] transition-colors"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ff5a1f] transition-colors"
              >
                LinkedIn
              </a>
            </li>*/}
          </ul>
        </div>

        {/* Resources links */}
        <div>
          <h5 className="text-white font-sans text-sm font-semibold tracking-wide text-slate-200 mb-4 uppercase tracking-wider opacity-75">
            Resources
          </h5>
          <ul className="space-y-3 text-s text-white">
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#ff5a1f] transition-colors">
                Community
              </a>
            </li>
          </ul>
        </div>
        {/* Social links */}
        <div>
          <h5 className="text-white font-sans text-sm font-semibold tracking-wide text-slate-200 mb-4 uppercase tracking-wider opacity-75">
            Social
          </h5>

          <div className="flex flex-col gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white hover:text-[#ff5a1f] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full border border-white flex items-center justify-center group-hover:border-[#ff5a1f] transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-sm font-sans"></span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white hover:text-[#ff5a1f] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full border border-white flex items-center justify-center group-hover:border-[#ff5a1f] transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-sm font-sans"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 mt-16 pt-8  flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white">
        <p>© 2026 MartechAdda. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-white hover:text-[#ff5a1f] transition-colors font-semibold group cursor-pointer focus:outline-none"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}

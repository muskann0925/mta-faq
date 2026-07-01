import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.svg";
interface HeaderProps {
  onGetStartedClick: () => void;
}

export default function Header({ onGetStartedClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm h-[72px] transition-all">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex justify-between items-center h-full">
        {/* Brand Name & Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative w-15 h-a flex items-center justify-center">
            <img
              src={logo}
              alt="Company Logo"
              className="w-15 object-contain mb-4"
            />
          </div>
          <span className="text-[20px] font-head font-extrabold text-slate-900 tracking-tight">
            MarTechAdda
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-sm font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-sm font-medium"
          >
            Features
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-sm font-medium"
          >
            For Experts
          </a>
          <a
            href="#"
            className="text-[#ff5a1f] border-b-2 border-[#ff5a1f] pb-1 font-sans text-sm font-semibold tracking-wide"
          >
            FAQs
          </a>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onGetStartedClick}
            className="hidden sm:inline-flex bg-slate-900 hover:bg-slate-800 text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[#ff5a1f] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-slate-200 px-6 py-6 space-y-4 flex flex-col shadow-lg z-40 transition-all duration-300">
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-base font-semibold py-2 border-b border-slate-100"
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-base font-semibold py-2 border-b border-slate-100"
          >
            Features
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-[#ff5a1f] transition-colors font-sans text-base font-semibold py-2 border-b border-slate-100"
          >
            For Experts
          </a>
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#ff5a1f] font-sans text-base font-bold py-2 border-b border-slate-100"
          >
            FAQs
          </a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onGetStartedClick();
            }}
            className="w-full text-center bg-[#ff5a1f] hover:bg-[#e04c14] text-white font-sans text-sm font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}

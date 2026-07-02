import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 h-[72px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="Company Logo" className="w-12 object-contain" />
          <span className="text-[18px] font-bold text-slate-900">
            MarTechAdda
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <a
            href="https://www.martechadda.com/v4/home"
            className="px-8 text-slate-600 hover:text-[#ff2e2e] font-medium text-sm border-r border-slate-200"
          >
            Marketing Services
          </a>

          <a
            href="https://www.martechadda.com/v4/home"
            className="px-8 text-slate-600 hover:text-[#ff2e2e] font-medium text-sm border-r border-slate-200"
          >
            How It Works
          </a>

          <a
            href="https://www.martechadda.com/v4/home"
            className="px-8 text-slate-600 hover:text-[#ff2e2e] font-medium text-sm border-r border-slate-200"
          >
            Resources
          </a>

          <a
            href="https://www.martechadda.com/v4/home"
            className="px-8 text-slate-600 hover:text-[#ff2e2e] font-medium text-sm border-r border-slate-200"
          >
            For Experts
          </a>

          <a
            href="https://www.martechadda.com/login"
            className="pl-8 text-slate-700 hover:text-[#ff2e2e] font-medium text-sm"
          >
            Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-slate-200 px-6 py-5 flex flex-col shadow-md">
          <a
            href="https://www.martechadda.com/v4/home"
            className="py-3 border-b border-slate-100 text-slate-700 active:text-[#ff2e2e]"
          >
            Marketing Services
          </a>
          <a
            href="https://www.martechadda.com/v4/home"
            className="py-3 border-b border-slate-100 text-slate-700 active:text-[#ff2e2e]"
          >
            How It Works
          </a>
          <a
            href="https://www.martechadda.com/v4/home"
            className="py-3 border-b border-slate-100 text-slate-700 active:text-[#ff2e2e]"
          >
            Resources
          </a>
          <a
            href="https://www.martechadda.com/v4/home"
            className="py-3 border-b border-slate-100 text-slate-700 active:text-[#ff2e2e]"
          >
            For Experts
          </a>
          <a
            href="https://www.martechadda.com/login"
            className="py-3 text-slate-700 active:text-[#ff2e2e]"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
}

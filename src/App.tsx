import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  Info,
  CreditCard,
  User,
  Settings,
  Shield,
  HelpCircle,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Calendar,
  Frown,
  RefreshCw,
  Clock,
} from "lucide-react";

import { FAQ_DATA } from "./data";
import { FAQCategory, FAQItem } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQAccordionItem from "./components/FAQAccordionItem";
import ContactModal from "./components/ContactModal";
import BookCallModal from "./components/BookCallModal";

export default function App() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Accordion active state
  // We keep track of which FAQ items are open by their ID
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Active Category (for scroll spy and manual click)
  const [activeCategory, setActiveCategory] = useState("general");

  // Refs for tracking manual sidebar navigation
  const isManualNavigating = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modal open states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  // Helper to map category IDs to friendly display titles
  const getCategoryTitle = (id: string) => {
    const category = FAQ_DATA.find((c) => c.id === id);
    return category?.name;
  };

  // Helper to resolve Lucide Icons dynamically
  const getCategoryIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-4 h-4 mr-2.5 transition-colors duration-200 ${
      active ? "text-brand-orange" : "text-secondary"
    }`;
    switch (iconName) {
      case "Info":
        return <Info className={iconClass} />;
      case "CreditCard":
        return <CreditCard className={iconClass} />;
      case "User":
        return <User className={iconClass} />;
      case "Settings":
        return <Settings className={iconClass} />;
      case "Shield":
        return <Shield className={iconClass} />;
      default:
        return <HelpCircle className={iconClass} />;
    }
  };

  // Scroll Spy Logic
  useEffect(() => {
    if (searchQuery.trim() !== "") return; // Disable scroll spy during search mode

    const handleScroll = () => {
      if (isManualNavigating.current) return;

      // Check if we have scrolled near the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveCategory(FAQ_DATA[FAQ_DATA.length - 1].id);
        return;
      }

      const headerOffset = 150;
      let current = "general";

      for (const cat of FAQ_DATA) {
        const element = document.getElementById(cat.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section top has passed the threshold
          if (rect.top <= headerOffset) {
            current = cat.id;
          }
        }
      }
      setActiveCategory(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchQuery]);

  // Smooth scroll handler with header offset
  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategory(categoryId);

    // Disable scroll spy temporarily during manual category click smooth scrolls
    isManualNavigating.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isManualNavigating.current = false;
    }, 1000);

    const element = document.getElementById(categoryId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle accordion toggle - allow only one active at a time
  const toggleAccordion = (itemId: string) => {
    setOpenItems((prev) => {
      const isOpen = prev[itemId];
      return isOpen ? {} : { [itemId]: true };
    });
  };

  // Clear search field
  const clearSearch = () => {
    setSearchQuery("");
    setOpenItems({});
  };

  // Filter items based on search query
  const getFilteredItems = (): { categoryId: string; item: FAQItem }[] => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const results: { categoryId: string; item: FAQItem }[] = [];
    FAQ_DATA.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        ) {
          results.push({ categoryId: cat.id, item });
        }
      });
    });
    return results;
  };

  const filteredResults = getFilteredItems();
  const isSearching = searchQuery.trim() !== "";

  // Automatically open the single matched result or first result if searching
  useEffect(() => {
    if (isSearching && filteredResults.length > 0) {
      // For single open constraint, we can just open the first match
      setOpenItems({ [filteredResults[0].item.id]: true });
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#ff5a1f]/20 flex flex-col font-sans">
      {/* Header */}

      <Header />
      {/* Main Content Area */}
      <main className="pt-[72px] flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-20 text-center relative overflow-hidden border-b border-slate-100">
          {/* Subtle Decorative Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff5a1f]/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff5a1f]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 md:px-16 relative z-10">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f] text-xs font-bold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>FAQs</span>
            </motion.div>

            {/* Display Header */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-head text-4xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-4 max-w-4xl mx-auto"
            >
              How can we help you today?
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Search our knowledge base or browse categories below to find
              answers.
            </motion.p>

            {/* Search Input Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl mx-auto relative group"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5a1f] transition-colors w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/20 text-slate-700 transition-all text-base"
                placeholder="Search for questions, articles..."
              />
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#ff5a1f] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sticky Sidebar Category list */}
            {!isSearching ? (
              <aside className="lg:col-span-3">
                <nav className="lg:sticky lg:top-[100px] h-fit bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="mb-6 ml-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Categories
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {FAQ_DATA.map((category) => {
                      const isActive = activeCategory === category.id;
                      return (
                        <li key={category.id}>
                          <a
                            href={`#${category.id}`}
                            onClick={(e) => handleCategoryClick(category.id, e)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                              isActive
                                ? "bg-[#ff5a1f]/10 text-[#ff5a1f] font-semibold"
                                : "text-slate-600 hover:bg-slate-50 font-medium"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${isActive ? "bg-[#ff5a1f]" : "bg-slate-300"}`}
                            />
                            <span>{category.name}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>
            ) : (
              // Search sidebar placeholder showing statistics
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-[100px] bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Search Results
                  </h3>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400 font-medium">Term:</span>
                      <span className="font-semibold text-[#ff5a1f]">
                        "{searchQuery}"
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400 font-medium">
                        Matches found:
                      </span>
                      <span className="font-bold text-slate-900">
                        {filteredResults.length}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Search</span>
                  </button>
                </div>
              </aside>
            )}

            {/* Accordion List Content */}
            <div className="lg:col-span-9 space-y-12">
              <AnimatePresence mode="wait">
                {!isSearching ? (
                  // Normal Categorized View
                  <motion.div
                    key="categories-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-16"
                  >
                    {FAQ_DATA.map((category) => (
                      <div
                        key={category.id}
                        id={category.id}
                        className="space-y-6 scroll-mt-24"
                      >
                        {/* Section Header */}
                        <div className="border-b border-slate-200 pb-4 mb-8">
                          <h2 className="font-sans text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                            {getCategoryTitle(category.id)}
                          </h2>
                        </div>

                        {/* Expandable items */}
                        <div className="space-y-4">
                          {category.items.map((item) => (
                            <FAQAccordionItem
                              key={item.id}
                              item={item}
                              isOpen={!!openItems[item.id]}
                              onToggle={() => toggleAccordion(item.id)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  // Search Results Flat View
                  <motion.div
                    key="search-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-slate-200 pb-4 mb-8 flex justify-between items-center flex-wrap gap-2">
                      <h2 className="font-sans text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                        Showing results for{" "}
                        <span className="text-[#ff5a1f]">"{searchQuery}"</span>
                      </h2>
                      <span className="text-xs bg-[#ff5a1f]/10 text-[#ff5a1f] px-3 py-1.5 rounded-full font-bold">
                        {filteredResults.length} Items Matching
                      </span>
                    </div>

                    {filteredResults.length > 0 ? (
                      <div className="space-y-4">
                        {filteredResults.map(({ item }) => (
                          <FAQAccordionItem
                            key={item.id}
                            item={item}
                            isOpen={!!openItems[item.id]}
                            onToggle={() => toggleAccordion(item.id)}
                            searchHighlight={searchQuery}
                          />
                        ))}
                      </div>
                    ) : (
                      // Search No results template fallback
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto shadow-sm"
                      >
                        <div className="w-16 h-16 bg-[#ff5a1f]/10 text-[#ff5a1f] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Frown className="w-8 h-8" />
                        </div>
                        <h3 className="font-sans text-lg font-bold text-slate-900 mb-2">
                          No results match your search
                        </h3>
                        <p className="font-sans text-sm text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
                          We couldn't find any FAQs answering that query. Try
                          adjusting your search keywords, or submit a custom
                          support ticket below!
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                          <button
                            onClick={clearSearch}
                            className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-slate-600"
                          >
                            Reset Search
                          </button>
                          <button
                            onClick={() => setIsContactOpen(true)}
                            className="bg-[#ff5a1f] hover:bg-[#e04c14] text-white font-semibold py-2.5 px-5 rounded-full text-xs transition-colors cursor-pointer"
                          >
                            Ask Support Team
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Still Have Questions? Banner CTA */}
              <div className="bg-gradient-to-br from-[#ff6a2a] to-[#ff8455] text-white rounded-[24px] p-8 md:p-10 mt-16 overflow-hidden relative group shadow-xl shadow-[#ff5a1f]/10 border-0">
                {/* Dots overlay background matching design */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left max-w-lg">
                    <h2 className="font-sans text-xl md:text-2xl font-bold text-white mb-2 tracking-tight leading-none">
                      Still have questions?
                    </h2>
                    <p className="text-orange-50 font-sans text-sm leading-relaxed opacity-95">
                      If you couldn't find your answer in our FAQ, please don't
                      hesitate to contact us. Our friendly support team is
                      available 24/7.
                    </p>
                  </div>

                  {/* Trigger buttons */}
                  <div className="flex flex-wrap justify-center gap-3 flex-shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => setIsBookCallOpen(true)}
                      className="px-6 py-2.5 bg-black text-white font-extrabold text-sm rounded-xl hover:bg-[#ff5a1f]  transition-all duration-300 shadow-sm cursor-pointer w-full sm:w-auto text-center hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Book a Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer
        onContactClick={() => setIsContactOpen(true)}
        onBookClick={() => setIsBookCallOpen(true)}
      />
      {/* Contact Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      {/* Call Scheduler Modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </div>
  );
}

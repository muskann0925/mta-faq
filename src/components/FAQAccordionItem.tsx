import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import { FAQItem } from "../types";

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  searchHighlight?: string;
}

export default function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  searchHighlight = "",
}: FAQAccordionItemProps) {
  const [feedback, setFeedback] = useState<"helpful" | "unhelpful" | null>(
    null,
  );

  const handleFeedback = (
    type: "helpful" | "unhelpful",
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Prevent toggling the accordion
    setFeedback(type);
  };

  // Helper to highlight matched search terms
  const highlightText = (text: string, highlight: string): ReactNode => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(
      `(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark
          key={index}
          className="bg-[#ff5a1f]/10 text-[#ff5a1f] font-medium px-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      id={`faq-item-${item.id}`}
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-slate-200 shadow-sm"
          : "border-slate-100 hover:border-slate-200"
      }`}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f]/20 rounded-2xl transition-colors"
      >
        <h4 className="font-display text-base md:text-lg font-semibold text-slate-900 leading-snug">
          {highlightText(item.question, searchHighlight)}
        </h4>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-transform duration-300 hover:bg-slate-100 hover:text-[#ff5a1f]">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </motion.div>
        </div>
      </button>

      {/* Answer Area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 border-t border-slate-100 pt-4">
              <p className="text-slate-600 font-sans text-sm leading-relaxed mb-4">
                {highlightText(item.answer, searchHighlight)}
              </p>

              {/* Helpful Feedback Interactive Section */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                <span className="font-sans text-slate-500">
                  Was this answer helpful?
                </span>
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {!feedback ? (
                      <motion.div
                        key="buttons"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        <button
                          onClick={(e) => handleFeedback("helpful", e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-[#ff5a1f] hover:text-white text-slate-600 transition-colors duration-200 border border-slate-200/60 font-medium cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Yes</span>
                        </button>
                        <button
                          onClick={(e) => handleFeedback("unhelpful", e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-600 hover:text-white text-slate-600 transition-colors duration-200 border border-slate-200/60 font-medium cursor-pointer"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>No</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="thank-you"
                        className="flex items-center gap-1.5 text-[#ff5a1f] font-semibold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-[#ff5a1f]" />
                        <span>Thanks for your feedback!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

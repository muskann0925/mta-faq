import { FAQCategory } from "./types";

export const FAQ_DATA: FAQCategory[] = [
  {
    id: "platform",
    name: "Platform Overview",
    iconName: "Info",
    items: [
      {
        id: "p-1",
        question: "What is MarTechAdda?",
        answer:
          "MarTechAdda is a neutral platform that helps businesses discover, connect, and engage marketing experts in a structured and transparent way. We do not sell services or influence outcomes; instead, we enable direct discovery and engagement between businesses and independent experts.",
      },
      {
        id: "p-2",
        question: "How does MarTechAdda work?",
        answer:
          "MarTechAdda works through an 8-step flow: (1) Seeker searches for experts, (2) relevant experts are discovered, (3) profiles are compared, (4) discussion is scheduled, (5) expert sends quotation, (6) terms are reviewed, (7) secure deposit is made, (8) expert delivers work in milestones.",
      },
      {
        id: "p-3",
        question: "How is MarTechAdda different from a marketing agency?",
        answer:
          "MarTechAdda is not an agency. It is a neutral discovery platform that connects businesses with independent marketing experts. All services are delivered directly by the chosen experts or agencies, not by MarTechAdda itself.",
      },
      {
        id: "p-4",
        question: "Who can use MarTechAdda?",
        answer:
          "MarTechAdda is designed for businesses that want to discover, connect, and engage with marketing experts. It is currently focused on businesses in the Mumbai Metropolitan Region and expanding to other Indian cities.",
      },
    ],
  },

  {
    id: "experts",
    name: "Experts & Matching",
    iconName: "User",
    items: [
      {
        id: "e-1",
        question: "How are experts matched with my requirements?",
        answer:
          "Experts are matched using guided filters such as service category, industry, and location. The platform then surfaces relevant verified experts based on these inputs.",
      },
      {
        id: "e-2",
        question: "What types of marketing experts are available?",
        answer:
          "There are two main types: Strategic Marketing Experts who focus on planning and growth strategy, and Marketing Collateral Experts who create assets like creatives, campaigns, and marketing materials.",
      },
      {
        id: "e-3",
        question: "Are the experts verified?",
        answer:
          "Yes. All experts go through a 4-stage verification process before being listed on the platform.",
      },
      {
        id: "e-4",
        question: "How quickly can I connect with an expert?",
        answer:
          "Once a suitable expert is found, connection can happen quickly. Availability depends on expert onboarding and response time, but most matches happen within a short timeframe.",
      },
    ],
  },

  {
    id: "pricing",
    name: "Pricing & Payments",
    iconName: "CreditCard",
    items: [
      {
        id: "pr-1",
        question: "How much does it cost to hire a marketing expert?",
        answer:
          "Pricing depends on service type, project scope, expert experience, and engagement duration. Each expert sets their own pricing based on requirements.",
      },
      {
        id: "pr-2",
        question: "Which payment methods are accepted?",
        answer:
          "MarTechAdda accepts UPI, credit/debit cards, and net banking through Cashfree. All payments are processed in Indian Rupees (INR).",
      },
      {
        id: "pr-3",
        question: "How are payments handled?",
        answer:
          "Payments follow a deposit-based system. Funds are securely held and released only when milestones are approved. Transactions are processed via Cashfree in INR.",
      },
    ],
  },

  {
    id: "support",
    name: "Support & Trust",
    iconName: "Shield",
    items: [
      {
        id: "s-1",
        question: "What if the expert is not the right fit?",
        answer:
          "You can decline a discussion request by providing a reason. There is no penalty for doing so.",
      },
      {
        id: "s-2",
        question: "Can I request another expert?",
        answer:
          "Yes. You can request another expert whose experience better matches your project needs.",
      },
      {
        id: "s-3",
        question: "How can I contact support?",
        answer:
          "You can contact our support team at support@martechadda.com for any assistance or queries.",
      },
    ],
  },
];

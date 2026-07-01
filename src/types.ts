export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  helpfulCount?: number;
  unhelpfulCount?: number;
}

export interface FAQCategory {
  id: string;
  name: string;
  iconName: string; // lucide-react icon name string
  items: FAQItem[];
}

export interface SupportInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export interface BookingDetails {
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  companySize: string;
  notes?: string;
}

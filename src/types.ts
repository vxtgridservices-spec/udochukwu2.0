export type PageView =
  | 'home'
  | 'about'
  | 'portfolio'
  | 'services'
  | 'industries'
  | 'testimonials'
  | 'audit'
  | 'blog'
  | 'resources'
  | 'learn'
  | 'faq'
  | 'contact'
  | 'dashboard';

export interface ContactPreFill {
  subject?: string;
  message?: string;
}

export interface SiteSettings {
  aboutImageUrl: string;
  heroImageUrl: string;
}

export interface AuditSubmission {
  id: string;
  businessName: string;
  website: string;
  phone: string;
  email: string;
  industry: string;
  challenges: string;
  submittedAt: string;
  status: 'Pending Analysis' | 'Analysis Started' | 'Completed';
  reportId?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
}

export interface BlogComment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Web Design' | 'Business Growth' | 'SEO' | 'Marketing' | 'Branding' | 'AI' | 'Technology';
  readTime: string;
  date: string;
  image: string;
  views: number;
  likes: number;
  comments: BlogComment[];
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  technology: string[];
  results: {
    conversionIncrease: string;
    speedImprovement: string;
    trafficIncrease: string;
    revenueGrowth: string;
  };
  beforeImage: string;
  afterImage: string;
  liveUrl: string;
  highlightText: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  priceRange: string;
  timeline: string;
  targetAudience: string;
  benefits: string[];
  features: string[];
  conversionFocus: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'PDF Guide' | 'Checklist' | 'Template';
  description: string;
  downloadUrl: string;
  fileSize: string;
  downloadCount: number;
}

export interface ClientDashboardProgress {
  projectTitle: string;
  clientName: string;
  currentPhase: 'Discovery' | 'UI/UX Design' | 'Development' | 'SEO & Launch' | 'Support & Handover';
  completionPercent: number;
  timeline: {
    phase: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
    description: string;
  }[];
  files: {
    id: string;
    name: string;
    size: string;
    url: string;
    uploadedAt: string;
    uploadedBy: 'Client' | 'Udochukwu';
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    amount: string;
    status: 'Paid' | 'Outstanding';
    issuedDate: string;
    dueDate: string;
  }[];
  messages: {
    id: string;
    sender: 'Client' | 'Udochukwu';
    content: string;
    sentAt: string;
  }[];
}

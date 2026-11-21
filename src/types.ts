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
  | 'dashboard'
  | 'calculator'
  | 'buyfromudochukwu';

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
  status: 'Pending Review' | 'In Review' | 'Completed';
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
  category: 'Web Design' | 'Business Growth' | 'SEO' | 'Marketing' | 'Branding' | 'Systems' | 'Technology';
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
  deliverables: string[];
  image: string;
  liveUrl: string;
  summaryNote: string;
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

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  projectUrl?: string;
  submittedAt: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'Power & Solar' | 'Gadgets & Tech' | 'Office Systems' | 'Accessories';
  price: number;
  compareAtPrice?: number;
  description: string;
  specs: string[];
  images: string[];
  promoVideoUrl?: string;
  promoType: 'itel-motion-ad' | 'custom-video' | 'showcase';
  inStock: boolean;
  isFeatured: boolean;
  freeDeliveryEnugu: boolean;
  paymentOnDeliveryEnugu: boolean;
  warranty: string;
  createdAt: string;
}

export interface MarketplaceOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  deliveryNotes?: string;
  paymentMethod:
    | 'Payment on Delivery (Enugu - itel Power Tank)'
    | 'Payment on Delivery (Enugu)'
    | 'Bank Transfer'
    | 'Verified Card / Instant Transfer';
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  deliveryFee: number;
  totalAmount: number;
  status: 'Pending Confirmation' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  city?: string;
  rating: number;
  comment: string;
  createdAt: string;
}


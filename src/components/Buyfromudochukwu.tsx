import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart,
  ChevronLeft,
  Plus,
  Minus,
  Star,
  Pencil,
  Save,
  Trash,
  Check,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Truck,
  Shield,
  Sun,
} from 'lucide-react';
import { MarketplaceProduct, MarketplaceOrder, ProductReview } from '../types';
import {
  getMarketplaceProducts,
  updateMarketplaceProduct,
  deleteMarketplaceProduct,
  saveMarketplaceOrder,
  syncMarketplaceFromServer,
  getProductReviews,
  saveProductReview,
  deleteProductReview,
} from '../utils/storage';
import { GENERATED_ASSETS } from '../utils/generatedAssets';
import { trackAction } from '../utils/tracker';

type StoreSubView = 'store' | 'item' | 'checkout' | 'policies';

const DELIVERY_REGIONS = [
  'Lagos State',
  'Abuja (FCT)',
  'Enugu Cities (itel Power Tank Free COD Eligible)',
  'Rivers / Port Harcourt',
  'Anambra (Awka / Onitsha / Nnewi)',
  'Oyo / Ibadan',
  'Other Nigerian States (Courier)',
];

const ENUGU_CITIES = [
  'Independence Layout, Enugu',
  'New Haven, Enugu',
  'GRA, Enugu',
  'Trans-Ekulu, Enugu',
  'Achara Layout, Enugu',
  'Uwani, Enugu',
  'Abakpa Nike, Enugu',
  'Coal Camp, Enugu',
  'Emene, Enugu',
  'Maryland / Enugu South',
  'Enugu North',
  'Enugu East',
  'Nsukka, Enugu State',
  'Agbani, Enugu State',
];

interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

const PROMO_SLIDES = [
  {
    id: 'slide-1',
    label: 'itel Sponsored Flash Sale · 21% OFF',
    title: 'itel Power Tank + 300W Solar + 20m Cable — ₦550,000',
    image: GENERATED_ASSETS.itelEnuguFlyer,
    targetProductId: 'prod-itel-powertank-full',
  },
  {
    id: 'slide-2',
    label: 'Seasonal Markdown · Save up to 22%',
    title: 'Workstations, Studio Audio & Desktop Hardware',
    image: GENERATED_ASSETS.productWorkstationLaptop,
    targetProductId: 'prod-probook-studio-16',
  },
  {
    id: 'slide-3',
    label: 'Audio Drop · Save ₦40,000',
    title: 'Aetheris Studio ANC Wireless Headphones — ₦145,000',
    image: GENERATED_ASSETS.productAudioHeadset,
    targetProductId: 'prod-aetheris-anc-headset',
  },
];

const ITEL_RUNTIME_ROWS = [
  { appliance: 'LED Light Bulb', wattage: '10W', runtime: '~90 hrs' },
  { appliance: 'Smart TV (Small)', wattage: '50W', runtime: '~18 hrs' },
  { appliance: 'Ceiling Fan', wattage: '50W', runtime: '~18 hrs' },
  { appliance: 'Laptop (Charging)', wattage: '65W', runtime: '~13 hrs' },
  { appliance: 'Desktop PC (Idle)', wattage: '100W', runtime: '~9 hrs' },
  { appliance: 'Deep Freezer (Inverter Type)', wattage: '145W', runtime: '~6 hrs' },
];

function getProductImgClass(_src: string | undefined, extra = '') {
  return `w-full h-full object-cover ${extra}`;
}

const MARKETPLACE_POLICIES = [
  {
    id: 'pricing',
    title: 'Pricing & Discount Transparency',
    summary:
      'All seasonal discounts and compare-at prices reflect active verified markdowns on Buyfromudochukwu.',
    clauses: [
      'Discount tags show the verified percentage difference between standard retail pricing and active promotional pricing.',
      'Prices include platform handling with zero hidden checkout fees.',
    ],
  },
  {
    id: 'shipping',
    title: 'Nationwide Shipping & Enugu itel Power Tank Offer',
    summary:
      'General hardware ships nationwide across Nigeria. Free Delivery & Payment on Delivery in Enugu applies strictly to the itel Power Tank Full Setup.',
    clauses: [
      'Workstations, audio equipment, docks, and solar units ship nationwide within 1–5 business days via tracked courier.',
      'Only orders containing the itel Power Tank Full Setup (₦550,000) qualify for complimentary doorstep delivery and Payment on Delivery across Enugu cities.',
      'All other orders nationwide are settled via verified Bank Transfer or Instant Transfer prior to waybill dispatch.',
    ],
  },
  {
    id: 'returns',
    title: 'Inspection, Warranty & 7-Day Returns',
    summary:
      'Every product curated on Buyfromudochukwu carries clear inspection standards and defect replacement protection.',
    clauses: [
      'Enugu itel Power Tank COD orders allow physical doorstep inspection before releasing payment.',
      'Damaged or defective items reported within 48 hours of delivery qualify for a 7-day replacement when returned in original packaging.',
    ],
  },
  {
    id: 'curated',
    title: 'Owner-Curated Quality & Support',
    summary:
      'Listings on Buyfromudochukwu are curated and managed directly by Udochukwu.',
    clauses: [
      'Every unit is vetted for specifications and backed by the warranty stated on its product page.',
      'Direct order support: hello@udochukwu.com.ng or +234 705 219 9651.',
    ],
  },
];

function BrandMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5V10C5.5 11.6569 6.84315 13 8.5 13H12.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="6" r="1.25" fill="currentColor" />
    </svg>
  );
}

function CaretIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M2.5 4.25L6 7.75L9.5 4.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CloseMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function resolveInitialItemId(): string | null {
  const params = new URLSearchParams(window.location.search);
  const queryItem = params.get('item');
  if (queryItem) return queryItem;
  const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (cleanPath.toLowerCase() === 'ad/itel-enugu') {
    return 'prod-itel-powertank-full';
  }
  if (cleanPath.toLowerCase().startsWith('buyfromudochukwu/')) {
    return decodeURIComponent(cleanPath.slice('buyfromudochukwu/'.length));
  }
  return null;
}

export default function Buyfromudochukwu() {
  const [products, setProducts] = useState<MarketplaceProduct[]>(() => getMarketplaceProducts());
  const [allReviews, setAllReviews] = useState<ProductReview[]>(() => getProductReviews());
  const [isAdminLogged] = useState(() => localStorage.getItem('vxt_admin_logged') === 'true');

  // Navigation View State ('store' | 'item' | 'checkout' | 'policies')
  const [subView, setSubView] = useState<StoreSubView>(() =>
    resolveInitialItemId() ? 'item' : 'store'
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() =>
    resolveInitialItemId()
  );

  // Storefront Filter, Dropdown & Sort
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'featured' | 'discount' | 'price-asc' | 'price-desc'>(
    'featured'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement | null>(null);

  // Item View UI State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [previewQty, setPreviewQty] = useState(1);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [shareCopiedState, setShareCopiedState] = useState<string>('idle');

  // Admin Inline Edit State
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [confirmDeleteStep, setConfirmDeleteStep] = useState(false);
  const [adminSaveNotice, setAdminSaveNotice] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    subtitle: '',
    category: 'Gadgets & Tech' as MarketplaceProduct['category'],
    price: '',
    compareAtPrice: '',
    description: '',
    specs: '',
    primaryImage: '',
    secondaryImage: '',
    promoVideoUrl: '',
    warranty: '',
    inStock: true,
    freeDeliveryEnugu: false,
    paymentOnDeliveryEnugu: false,
  });

  // Rating & Review Form (shown ONLY when user decides to rate)
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState('');

  // Stepped Stress-Free Checkout State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'delivery' | 'done'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState(DELIVERY_REGIONS[0]);
  const [selectedEnuguCity, setSelectedEnuguCity] = useState(ENUGU_CITIES[0]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<MarketplaceOrder['paymentMethod']>('Bank Transfer');
  const [confirmedOrder, setConfirmedOrder] = useState<MarketplaceOrder | null>(null);

  // Compact Promo Slide + Flash Deal Clock
  const [isPromoPlaying, setIsPromoPlaying] = useState(true);
  const [activePromoIdx, setActivePromoIdx] = useState(0);
  const [flashCountdownSecs, setFlashCountdownSecs] = useState(4 * 3600 + 38 * 60 + 22);

  // Policies Tab
  const [activePolicyId, setActivePolicyId] = useState<string>(MARKETPLACE_POLICIES[0].id);

  useEffect(() => {
    syncMarketplaceFromServer().then(({ products: syncedProducts }) => {
      if (syncedProducts && syncedProducts.length > 0) {
        setProducts(syncedProducts);
      }
    });
  }, []);

  // Live Flash Sale Countdown Clock
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setFlashCountdownSecs((prev) => (prev > 60 ? prev - 1 : 4 * 3600 + 38 * 60));
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target as Node)) {
        setCategoryMenuOpen(false);
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isPromoPlaying || subView !== 'store') return;
    const timer = setInterval(() => {
      setActivePromoIdx((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPromoPlaying, subView]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  // Listen to clicks from the sitewide floating itel Flash Sale flyer widget
  useEffect(() => {
    const executeItelPendingAction = (mode: 'view' | 'claim') => {
      const target = products.find((p) => p.id === 'prod-itel-powertank-full');
      if (!target) return;
      if (mode === 'claim') {
        addToCart(target, 1, true);
      } else {
        setSelectedProductId(target.id);
        setSubView('item');
        setIsImageZoomOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      sessionStorage.removeItem('vxt_itel_pending_action');
    };

    const initialPending = sessionStorage.getItem('vxt_itel_pending_action') as
      | 'view'
      | 'claim'
      | null;
    if (initialPending) {
      executeItelPendingAction(initialPending);
    }

    const handleCustomAction = (e: Event) => {
      const detail = (e as CustomEvent<{ mode?: 'view' | 'claim' }>).detail;
      if (detail?.mode) {
        executeItelPendingAction(detail.mode);
      }
    };
    window.addEventListener('vxt-itel-action', handleCustomAction);
    return () => window.removeEventListener('vxt-itel-action', handleCustomAction);
  }, [products]);

  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}h:${String(mins).padStart(2, '0')}m:${String(secs).padStart(2, '0')}s`;
  };

  useEffect(() => {
    if (selectedProduct) {
      setEditForm({
        title: selectedProduct.title,
        subtitle: selectedProduct.subtitle,
        category: selectedProduct.category,
        price: String(selectedProduct.price),
        compareAtPrice: selectedProduct.compareAtPrice ? String(selectedProduct.compareAtPrice) : '',
        description: selectedProduct.description,
        specs: selectedProduct.specs.join('\n'),
        primaryImage: selectedProduct.images[0] || '',
        secondaryImage: selectedProduct.images[1] || '',
        promoVideoUrl: selectedProduct.promoVideoUrl || '',
        warranty: selectedProduct.warranty,
        inStock: selectedProduct.inStock,
        freeDeliveryEnugu: selectedProduct.freeDeliveryEnugu,
        paymentOnDeliveryEnugu: selectedProduct.paymentOnDeliveryEnugu,
      });
      const variantParam = new URLSearchParams(window.location.search)
        .get('variant')
        ?.toLowerCase();
      const variantIdxMap: Record<string, number> = {
        setup: 0,
        detail: 1,
        solar: 2,
        flyer: 3,
        lifestyle: 4,
      };
      const resolvedIdx =
        selectedProduct.id === 'prod-itel-powertank-full' &&
        variantParam &&
        variantIdxMap[variantParam] !== undefined &&
        variantIdxMap[variantParam] < selectedProduct.images.length
          ? variantIdxMap[variantParam]
          : 0;
      setActiveImageIdx(resolvedIdx);
      setPreviewQty(1);
      setShowRatingForm(false);
      setIsEditingItem(false);
      setConfirmDeleteStep(false);
      setAdminSaveNotice('');
      setReviewSubmittedNotice('');
    }
  }, [selectedProduct?.id]);

  const openFullPagePreview = (product: MarketplaceProduct) => {
    setSelectedProductId(product.id);
    setSubView('item');
    setShareCopiedState('idle');
    const targetUrl =
      product.id === 'prod-itel-powertank-full'
        ? '/ad/itel-enugu'
        : `/buyfromudochukwu?item=${encodeURIComponent(product.id)}`;
    window.history.replaceState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackAction(`Viewed Product Page: ${product.title}`);
  };

  const openCheckoutPage = () => {
    setCheckoutStep(confirmedOrder && cart.length === 0 ? 'done' : 'bag');
    setSubView('checkout');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openPoliciesPage = () => {
    setSubView('policies');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const backToStore = () => {
    setSubView('store');
    setIsEditingItem(false);
    setConfirmDeleteStep(false);
    window.history.replaceState({}, '', '/buyfromudochukwu');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const getDiscountPercent = (p: MarketplaceProduct) => {
    if (!p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  };

  const getProductRatingStats = (productId: string) => {
    const itemReviews = allReviews.filter((r) => r.productId === productId);
    if (itemReviews.length === 0) return { avg: 0, count: 0, reviews: [] };
    const total = itemReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      avg: Number((total / itemReviews.length).toFixed(1)),
      count: itemReviews.length,
      reviews: itemReviews,
    };
  };

  const categories = ['All', 'On Sale', 'Office Systems', 'Gadgets & Tech', 'Power & Solar', 'Accessories'];

  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      const catOk =
        selectedCategory === 'All' ||
        (selectedCategory === 'On Sale'
          ? getDiscountPercent(p) > 0
          : p.category === selectedCategory);
      const q = searchQuery.trim().toLowerCase();
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    if (sortOrder === 'discount') {
      return [...list].sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
    }
    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortOrder]);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return products.length;
    if (cat === 'On Sale') return products.filter((p) => getDiscountPercent(p) > 0).length;
    return products.filter((p) => p.category === cat).length;
  };

  const sortOptions: { value: 'featured' | 'discount' | 'price-asc' | 'price-desc'; label: string }[] =
    [
      { value: 'featured', label: 'Featured' },
      { value: 'discount', label: 'Biggest Discount' },
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
    ];
  const activeSortLabel =
    sortOptions.find((opt) => opt.value === sortOrder)?.label || 'Featured';

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  const cartQualifiesForEnuguPromo = useMemo(
    () => cart.length > 0 && cart.every((item) => item.product.freeDeliveryEnugu),
    [cart]
  );
  const isEnuguRegionSelected = deliveryRegion.startsWith('Enugu Cities');

  useEffect(() => {
    if (!cartQualifiesForEnuguPromo && paymentMethod.includes('Payment on Delivery')) {
      setPaymentMethod('Bank Transfer');
    }
  }, [cartQualifiesForEnuguPromo, paymentMethod]);

  const addToCart = (product: MarketplaceProduct, quantity = 1, goCheckout = false) => {
    setConfirmedOrder(null);
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    if (product.freeDeliveryEnugu && product.paymentOnDeliveryEnugu) {
      setDeliveryRegion('Enugu Cities (itel Power Tank Free COD Eligible)');
      setPaymentMethod('Payment on Delivery (Enugu - itel Power Tank)');
    }
    trackAction(`Added "${product.title}" (x${quantity}) to Bag`);
    if (goCheckout) {
      setCheckoutStep('bag');
      setSubView('checkout');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !address.trim() || cart.length === 0) {
      return;
    }

    const finalCity = isEnuguRegionSelected ? selectedEnuguCity : deliveryRegion;

    const order = saveMarketplaceOrder({
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      city: finalCity,
      address: address.trim(),
      paymentMethod,
      items: cart.map((c) => ({
        productId: c.product.id,
        title: c.product.title,
        price: c.product.price,
        quantity: c.quantity,
      })),
      deliveryFee: 0,
      totalAmount: cartSubtotal,
    });

    trackAction(
      `Placed Buyfromudochukwu Order ${order.orderNumber} (₦${order.totalAmount.toLocaleString()}) in ${finalCity}`
    );

    setConfirmedOrder(order);
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setCheckoutStep('done');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAdminImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'primaryImage' | 'secondaryImage'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditForm((prev) => ({ ...prev, [field]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdminVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditForm((prev) => ({ ...prev, promoVideoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdminSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const numericPrice = Number(editForm.price.replace(/[^0-9.]/g, ''));
    if (!editForm.title.trim() || !numericPrice || !editForm.description.trim()) return;

    const numericCompare = editForm.compareAtPrice
      ? Number(editForm.compareAtPrice.replace(/[^0-9.]/g, ''))
      : undefined;

    const imagesList = [editForm.primaryImage.trim(), editForm.secondaryImage.trim()].filter(
      Boolean
    );
    const specsList = editForm.specs
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProduct: MarketplaceProduct = {
      ...selectedProduct,
      title: editForm.title.trim(),
      subtitle: editForm.subtitle.trim() || selectedProduct.subtitle,
      category: editForm.category,
      price: numericPrice,
      compareAtPrice: numericCompare && numericCompare > numericPrice ? numericCompare : undefined,
      description: editForm.description.trim(),
      specs: specsList.length > 0 ? specsList : selectedProduct.specs,
      images: imagesList.length > 0 ? imagesList : selectedProduct.images,
      promoVideoUrl: editForm.promoVideoUrl.trim() || undefined,
      promoType: editForm.promoVideoUrl.trim() ? 'custom-video' : selectedProduct.promoType,
      warranty: editForm.warranty.trim() || selectedProduct.warranty,
      inStock: editForm.inStock,
      freeDeliveryEnugu: editForm.freeDeliveryEnugu,
      paymentOnDeliveryEnugu: editForm.paymentOnDeliveryEnugu,
    };

    const updatedCatalog = updateMarketplaceProduct(updatedProduct);
    setProducts(updatedCatalog);
    setIsEditingItem(false);
    setAdminSaveNotice('Changes saved to catalog.');
    setTimeout(() => setAdminSaveNotice(''), 4000);
  };

  const handleAdminDeleteProduct = () => {
    if (!selectedProduct) return;
    if (!confirmDeleteStep) {
      setConfirmDeleteStep(true);
      return;
    }
    const updatedCatalog = deleteMarketplaceProduct(selectedProduct.id);
    setProducts(updatedCatalog);
    setSelectedProductId(null);
    backToStore();
  };

  const handleSubmitItemReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewName.trim() || !reviewComment.trim()) return;

    const updated = saveProductReview({
      productId: selectedProduct.id,
      authorName: reviewName.trim(),
      city: reviewCity.trim() || undefined,
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setAllReviews(updated);
    setReviewName('');
    setReviewCity('');
    setReviewComment('');
    setReviewRating(5);
    setShowRatingForm(false);
    setReviewSubmittedNotice('Thank you! Your rating and review have been added.');
    trackAction(`Rated "${selectedProduct.title}" (${reviewRating}/5)`);
    setTimeout(() => setReviewSubmittedNotice(''), 5000);
  };

  const handleRemoveItemReview = (reviewId: string) => {
    setAllReviews(deleteProductReview(reviewId));
  };

  const renderStoreSubHeader = (secondaryBar?: React.ReactNode) => (
    <div className="border-b border-white/10 bg-[#141824] w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <button
          type="button"
          onClick={backToStore}
          className="inline-flex items-center gap-2 text-white font-semibold cursor-pointer hover:text-slate-300 transition-colors min-w-0 text-[11px] sm:text-xs font-mono tracking-[0.06em] sm:tracking-[0.14em] uppercase"
        >
          <BrandMark />
          <span className="truncate">Buyfromudochukwu</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={openPoliciesPage}
            className={`border px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              subView === 'policies'
                ? 'border-white text-white bg-white/10'
                : 'border-white/15 text-slate-300 hover:text-white hover:border-white/40'
            }`}
          >
            Policies
          </button>

          <button
            type="button"
            onClick={openCheckoutPage}
            className="inline-flex items-center gap-1.5 border border-white bg-white text-slate-950 hover:bg-slate-200 px-2.5 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] transition-colors cursor-pointer whitespace-nowrap tabular-nums"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {secondaryBar && (
        <div className="border-t border-white/10 bg-[#161b28]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
            {secondaryBar}
          </div>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // VIEW A: DEDICATED STRESS-FREE STEPPED CHECKOUT PAGE (No cramped side drawer!)
  // =========================================================================
  if (subView === 'checkout') {
    return (
      <div className="bg-[#141824] text-white min-h-screen w-full overflow-x-hidden pb-24">
        {renderStoreSubHeader(
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={backToStore}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Checkout
            </span>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-6">
          {/* Step Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => checkoutStep !== 'done' && setCheckoutStep('bag')}
                className={`cursor-pointer ${
                  checkoutStep === 'bag' ? 'text-white font-semibold' : 'text-slate-400'
                }`}
              >
                01. Bag ({cartCount})
              </button>
              <span className="text-white/20">/</span>
              <span
                className={
                  checkoutStep === 'delivery' ? 'text-white font-semibold' : 'text-slate-400'
                }
              >
                02. Delivery
              </span>
              <span className="text-white/20">/</span>
              <span
                className={checkoutStep === 'done' ? 'text-white font-semibold' : 'text-slate-400'}
              >
                03. Done
              </span>
            </div>

            <button
              type="button"
              onClick={backToStore}
              className="text-xs font-mono text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

          {checkoutStep === 'done' && confirmedOrder ? (
            <div className="bg-[#191f30] border border-white/15 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 text-emerald-300">
                <Check className="w-5 h-5 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest block">
                    Order Recorded
                  </span>
                  <h1 className="text-xl sm:text-2xl font-sans font-semibold text-white">
                    Reference: {confirmedOrder.orderNumber}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-white/10 py-5 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block">Customer</span>
                  <span className="text-white">{confirmedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <span className="text-white">{confirmedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Destination</span>
                  <span className="text-white">{confirmedOrder.city}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment</span>
                  <span className="text-white">{confirmedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/2347052199651?text=${encodeURIComponent(
                    `Hello Udochukwu, I just placed Order ${confirmedOrder.orderNumber} on Buyfromudochukwu:\n` +
                      confirmedOrder.items
                        .map((i) => `- ${i.title} x${i.quantity} (₦${i.price.toLocaleString()})`)
                        .join('\n') +
                      `\nTotal: ₦${confirmedOrder.totalAmount.toLocaleString()}\nDestination: ${confirmedOrder.city}\nAddress: ${confirmedOrder.address}\nPayment: ${confirmedOrder.paymentMethod}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-white text-slate-950 hover:bg-slate-200 text-center font-mono text-xs font-semibold uppercase tracking-wider py-3.5 transition-colors"
                >
                  Confirm Dispatch on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={backToStore}
                  className="border border-white/25 hover:border-white text-white px-6 py-3.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Back to Store
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-[#191f30] border border-white/15 p-12 text-center space-y-4">
              <p className="text-base font-sans text-white">Your order bag is currently empty.</p>
              <button
                type="button"
                onClick={backToStore}
                className="border border-white bg-white text-slate-950 hover:bg-slate-200 px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : checkoutStep === 'bag' ? (
            /* STEP 1: BAG REVIEW */
            <div className="space-y-6">
              <div className="divide-y divide-white/10 border border-white/15 bg-[#191f30]">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-12 bg-[#0e111a] overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0] || GENERATED_ASSETS.marketplaceHeroCollection}
                          alt={item.product.title}
                          className={getProductImgClass(item.product.images[0])}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-sans font-semibold text-white truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-xs font-mono text-slate-400 tabular-nums mt-0.5">
                          ₦{item.product.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.id, -1)}
                        className="p-2 border border-white/15 hover:border-white text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold w-6 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.id, 1)}
                        className="p-2 border border-white/15 hover:border-white text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#191f30] border border-white/15 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Order Total</span>
                  <span className="text-2xl font-mono font-bold text-white tabular-nums">
                    ₦{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('delivery');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors"
                >
                  Continue to Delivery →
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: CLEAN SHORT DELIVERY FORM (FITS ONE SCREEN) */
            <form
              onSubmit={handleCheckoutSubmit}
              className="bg-[#191f30] border border-white/15 p-5 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-lg font-sans font-semibold text-white">Delivery Details</h2>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Edit Bag (₦{cartSubtotal.toLocaleString()})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase block">
                    State / Region *
                  </label>
                  <select
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  >
                    {DELIVERY_REGIONS.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                {isEnuguRegionSelected ? (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-300 uppercase block">
                      Enugu City / Area *
                    </label>
                    <select
                      value={selectedEnuguCity}
                      onChange={(e) => setSelectedEnuguCity(e.target.value)}
                      className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                    >
                      {ENUGU_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-300 uppercase block">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Verified Card / Instant Transfer">Instant Transfer</option>
                    </select>
                  </div>
                )}
              </div>

              {isEnuguRegionSelected && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase block">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  >
                    {cartQualifiesForEnuguPromo && (
                      <option value="Payment on Delivery (Enugu - itel Power Tank)">
                        Payment on Delivery (Free in Enugu — itel Power Tank Offer)
                      </option>
                    )}
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Verified Card / Instant Transfer">Instant Transfer</option>
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 uppercase block">
                  Street Address &amp; Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, street, nearest bus stop"
                  className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={openPoliciesPage}
                  className="text-[11px] font-mono text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer text-left"
                >
                  View Shipping &amp; Return Policies
                </button>

                <button
                  type="submit"
                  className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors"
                >
                  Confirm Order — ₦{cartSubtotal.toLocaleString()}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: DEDICATED POLICIES PAGE (Clean, never dumped below storefront!)
  // =========================================================================
  if (subView === 'policies') {
    const activePolicy =
      MARKETPLACE_POLICIES.find((p) => p.id === activePolicyId) || MARKETPLACE_POLICIES[0];

    return (
      <div className="bg-[#141824] text-white min-h-screen w-full overflow-x-hidden pb-24">
        {renderStoreSubHeader(
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={backToStore}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Policies
            </span>
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-14 space-y-8">
          <div className="border-b border-white/10 pb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
                Marketplace Policies
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1.5">
                Buyfromudochukwu Buyer Protection, Shipping &amp; Warranty Standards
              </p>
            </div>
            <button
              type="button"
              onClick={backToStore}
              className="border border-white/25 hover:border-white px-4 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer shrink-0"
            >
              Return to Products
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-4 min-w-0 flex flex-col border border-white/15 bg-[#191f30] divide-y divide-white/10">
              {MARKETPLACE_POLICIES.map((pol) => (
                <button
                  key={pol.id}
                  type="button"
                  onClick={() => setActivePolicyId(pol.id)}
                  className={`p-4 text-left text-xs sm:text-sm font-sans font-medium transition-colors cursor-pointer ${
                    activePolicyId === pol.id
                      ? 'bg-white text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {pol.title}
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 min-w-0 bg-[#191f30] border border-white/15 p-5 sm:p-8 space-y-5">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <h2 className="text-lg sm:text-2xl font-sans font-semibold text-white">
                  {activePolicy.title}
                </h2>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {activePolicy.summary}
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-300 font-sans leading-relaxed">
                {activePolicy.clauses.map((clause, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-slate-500 font-mono text-xs mt-1">—</span>
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW C: CALM FULL-PAGE ITEM PREVIEW (Uncluttered, Admin Editable, Rating on Demand)
  // =========================================================================
  if (subView === 'item' && selectedProduct) {
    const discountPct = getDiscountPercent(selectedProduct);
    const ratingStats = getProductRatingStats(selectedProduct.id);
    const galleryImages =
      selectedProduct.images && selectedProduct.images.length > 0
        ? selectedProduct.images
        : [GENERATED_ASSETS.marketplaceHeroCollection];

    return (
      <div className="bg-[#141824] text-white min-h-screen w-full overflow-x-hidden pb-24">
        {renderStoreSubHeader(
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={backToStore}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>All Products</span>
            </button>

            {isAdminLogged && (
              <button
                type="button"
                onClick={() => setIsEditingItem((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-mono cursor-pointer transition-colors shrink-0 ${
                  isEditingItem
                    ? 'border-white bg-white text-slate-950 font-semibold'
                    : 'border-white/25 text-slate-200 hover:border-white'
                }`}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{isEditingItem ? 'Close Edit' : 'Edit Item'}</span>
              </button>
            )}
          </div>
        )}

        {adminSaveNotice && (
          <div className="bg-emerald-950/60 border-b border-emerald-500/30 py-2.5 px-4 text-center text-xs font-mono text-emerald-200 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{adminSaveNotice}</span>
          </div>
        )}

        {/* Admin Inline Editor Panel (Strictly Admin Only) */}
        <AnimatePresence>
          {isAdminLogged && isEditingItem && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#191f30] border-b border-white/15 overflow-hidden"
            >
              <form
                onSubmit={handleAdminSaveProduct}
                className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                    Edit Product Details
                  </h2>
                  <button
                    type="button"
                    onClick={handleAdminDeleteProduct}
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-mono cursor-pointer ${
                      confirmDeleteStep
                        ? 'border-rose-400 bg-rose-600 text-white'
                        : 'border-rose-400/30 text-rose-300 hover:border-rose-400'
                    }`}
                  >
                    <Trash className="w-3.5 h-3.5" />
                    <span>{confirmDeleteStep ? 'Confirm Delete' : 'Delete Item'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Product Title"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Short Subtitle"
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value as any })
                    }
                    className="bg-[#141824] border border-white/20 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  >
                    <option value="Office Systems">Office Systems</option>
                    <option value="Gadgets & Tech">Gadgets &amp; Tech</option>
                    <option value="Power & Solar">Power &amp; Solar</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input
                    type="number"
                    required
                    placeholder="Sale Price (₦)"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Compare Price"
                    value={editForm.compareAtPrice}
                    onChange={(e) =>
                      setEditForm({ ...editForm, compareAtPrice: e.target.value })
                    }
                    className="bg-[#141824] border border-white/20 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Warranty"
                    value={editForm.warranty}
                    onChange={(e) => setEditForm({ ...editForm, warranty: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                    rows={3}
                    required
                    placeholder="Description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none resize-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Specs (one per line)"
                    value={editForm.specs}
                    onChange={(e) => setEditForm({ ...editForm, specs: e.target.value })}
                    className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Primary Image URL"
                      value={editForm.primaryImage}
                      onChange={(e) => setEditForm({ ...editForm, primaryImage: e.target.value })}
                      className="flex-1 bg-[#141824] border border-white/20 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <label className="border border-white/25 px-3 py-2 text-xs font-mono text-white cursor-pointer flex items-center">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleAdminImageUpload(e, 'primaryImage')}
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Second Photo URL"
                      value={editForm.secondaryImage}
                      onChange={(e) =>
                        setEditForm({ ...editForm, secondaryImage: e.target.value })
                      }
                      className="flex-1 bg-[#141824] border border-white/20 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <label className="border border-white/25 px-3 py-2 text-xs font-mono text-white cursor-pointer flex items-center">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleAdminImageUpload(e, 'secondaryImage')}
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Video URL (.mp4)"
                      value={editForm.promoVideoUrl}
                      onChange={(e) => setEditForm({ ...editForm, promoVideoUrl: e.target.value })}
                      className="flex-1 bg-[#141824] border border-white/20 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <label className="border border-white/25 px-3 py-2 text-xs font-mono text-white cursor-pointer flex items-center">
                      <span>MP4</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleAdminVideoUpload}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 text-xs font-mono text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.inStock}
                      onChange={(e) => setEditForm({ ...editForm, inStock: e.target.checked })}
                      className="accent-white"
                    />
                    <span>In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.freeDeliveryEnugu}
                      onChange={(e) =>
                        setEditForm({ ...editForm, freeDeliveryEnugu: e.target.checked })
                      }
                      className="accent-white"
                    />
                    <span>Enugu Free Delivery Eligible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.paymentOnDeliveryEnugu}
                      onChange={(e) =>
                        setEditForm({ ...editForm, paymentOnDeliveryEnugu: e.target.checked })
                      }
                      className="accent-white"
                    />
                    <span>Enugu COD Eligible</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingItem(false)}
                    className="border border-white/20 text-slate-300 px-4 py-2.5 text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Main Calm Product Detail Layout */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Clean Media Gallery with Fullscreen High-Res Viewer */}
            <div className="lg:col-span-6 min-w-0 space-y-3">
              <div className="bg-[#0e111a] border border-white/10 aspect-[4/3] relative overflow-hidden group">
                {selectedProduct.promoVideoUrl && activeImageIdx === -1 ? (
                  <video
                    src={selectedProduct.promoVideoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsImageZoomOpen(true)}
                    className="w-full h-full block cursor-zoom-in relative text-left"
                    title="Click to inspect full high-resolution photo"
                  >
                    <img
                      src={galleryImages[activeImageIdx] || galleryImages[0]}
                      alt={selectedProduct.title}
                      className={getProductImgClass(
                        galleryImages[activeImageIdx] || galleryImages[0],
                        'group-hover:scale-103 transition-transform duration-300'
                      )}
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2.5 right-2.5 bg-[#141824]/90 border border-white/25 text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider">
                      Tap to Zoom ({activeImageIdx + 1}/{galleryImages.length})
                    </span>
                  </button>
                )}
              </div>

              {(galleryImages.length > 1 || selectedProduct.promoVideoUrl) && (
                <div className="flex flex-wrap gap-2.5">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-14 border overflow-hidden cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-white'
                          : 'border-white/15 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className={getProductImgClass(imgUrl)}
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                  {selectedProduct.promoVideoUrl && (
                    <button
                      type="button"
                      onClick={() => setActiveImageIdx(-1)}
                      className={`w-16 h-14 border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer bg-[#191f30] ${
                        activeImageIdx === -1 ? 'border-white text-white' : 'border-white/15 text-slate-400'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 mb-0.5" />
                      <span>Video</span>
                    </button>
                  )}
                </div>
              )}

              {/* Premium Item Photo Lightbox Viewer */}
              <AnimatePresence>
                {isImageZoomOpen && activeImageIdx >= 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsImageZoomOpen(false)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-4xl space-y-4"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="truncate pr-4">
                          {selectedProduct.title} — Photo {activeImageIdx + 1} of {galleryImages.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsImageZoomOpen(false)}
                          className="border border-white/25 hover:border-white text-white p-2 cursor-pointer"
                          aria-label="Close image preview"
                        >
                          <CloseMark />
                        </button>
                      </div>

                      <div className="bg-[#0e111a] border border-white/20 flex items-center justify-center overflow-hidden">
                        <img
                          src={galleryImages[activeImageIdx] || galleryImages[0]}
                          alt={selectedProduct.title}
                          className="w-full max-h-[72vh] object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {galleryImages.length > 1 && (
                        <div className="flex items-center justify-center gap-2.5 flex-wrap">
                          {galleryImages.map((imgUrl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveImageIdx(idx)}
                              className={`w-16 h-12 border overflow-hidden cursor-pointer ${
                                activeImageIdx === idx
                                  ? 'border-white'
                                  : 'border-white/20 opacity-55 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt=""
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clean Editorial Purchase Details (Calm, High-Contrast, Zero Icon Clutter) */}
            <div className="lg:col-span-6 min-w-0 space-y-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span>{selectedProduct.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProduct.inStock ? 'In Stock' : 'Sold Out'}</span>
                  {discountPct > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-200">{discountPct}% off</span>
                    </>
                  )}
                </div>

                <h1 className="text-xl sm:text-3xl font-sans font-semibold text-white tracking-tight leading-snug break-words">
                  {selectedProduct.title}
                </h1>

                <p className="text-sm text-slate-300 font-sans leading-relaxed break-words">
                  {selectedProduct.subtitle}
                </p>

                {/* Quiet Rating Line + Trigger */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-300">
                  <div className="inline-flex items-center gap-1.5">
                    <Star
                      className={`w-3.5 h-3.5 ${
                        ratingStats.count > 0 ? 'text-white fill-white' : 'text-slate-500'
                      }`}
                    />
                    <span>
                      {ratingStats.count > 0
                        ? `${ratingStats.avg} (${ratingStats.count})`
                        : 'No ratings yet'}
                    </span>
                  </div>
                  <span className="text-white/20">·</span>
                  <button
                    type="button"
                    onClick={() => setShowRatingForm(true)}
                    className="text-white underline underline-offset-4 hover:text-slate-300 cursor-pointer"
                  >
                    Rate &amp; review this item
                  </button>
                </div>
              </div>

              {/* Clean Tabular Pricing + Flash Deal Urgency */}
              <div className="border-t border-b border-white/10 py-5 space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-sans font-semibold text-white tabular-nums">
                    ₦{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span className="text-sm font-mono text-slate-500 line-through tabular-nums">
                      ₦{selectedProduct.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                  {discountPct > 0 && selectedProduct.compareAtPrice && (
                    <span className="text-xs font-mono text-emerald-300">
                      Save ₦{(selectedProduct.compareAtPrice - selectedProduct.price).toLocaleString()} ({discountPct}% OFF)
                    </span>
                  )}
                </div>

                {selectedProduct.id === 'prod-itel-powertank-full' && (
                  <div className="bg-[#191f30] border border-amber-400/30 p-3.5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-amber-300 font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>itel Sponsored Flash Deal · 21% OFF</span>
                      </span>
                      <span className="text-slate-300 tabular-nums">
                        Ends in {formatCountdown(flashCountdownSecs)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Enugu Buyer Advantage: <strong className="text-white">₦0 Delivery Fee</strong> across Enugu cities +{' '}
                      <strong className="text-white">Pay Cash or Transfer at Your Gate</strong> only after we test your TV, fan &amp; laptop live.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center border border-white/20 bg-[#191f30]">
                    <button
                      type="button"
                      onClick={() => setPreviewQty((q) => Math.max(1, q - 1))}
                      className="p-3 text-white hover:bg-white/5 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono font-semibold tabular-nums">
                      {previewQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewQty((q) => q + 1)}
                      className="p-3 text-white hover:bg-white/5 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={!selectedProduct.inStock}
                    onClick={() => addToCart(selectedProduct, previewQty, true)}
                    className="flex-1 min-w-[170px] bg-white text-slate-950 hover:bg-slate-200 disabled:opacity-40 py-3.5 px-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                  >
                    {selectedProduct.id === 'prod-itel-powertank-full'
                      ? 'Order — Pay on Delivery (Enugu)'
                      : selectedProduct.inStock
                      ? 'Buy Now'
                      : 'Sold Out'}
                  </button>
                </div>
              </div>

              {/* Description & Clean Hairline Spec List */}
              <div className="space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedProduct.description}
                </p>

                <div className="border-t border-white/10 pt-4 space-y-2.5">
                  <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Specifications &amp; What&apos;s Included
                  </h2>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 font-sans">
                    {selectedProduct.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-slate-500">—</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-slate-400 pt-1">
                      <span className="text-slate-500">—</span>
                      <span>{selectedProduct.warranty}</span>
                    </li>
                  </ul>
                </div>

                {/* Facebook & Social Link Card Sharing */}
                {(() => {
                  const sharePath =
                    selectedProduct.id === 'prod-itel-powertank-full'
                      ? '/ad/itel-enugu'
                      : `/buyfromudochukwu?item=${encodeURIComponent(selectedProduct.id)}`;
                  const shareUrl = `${window.location.origin}${sharePath}`;
                  const fbCaption =
                    selectedProduct.id === 'prod-itel-powertank-full'
                      ? `🔥 21% OFF itel Sponsored Flash Sale — Now ₦${selectedProduct.price.toLocaleString()} (Was ₦696,000, Save ₦146,000)\n\n✅ itel Power Tank 500W Hybrid Inverter + 1,000Wh LiFePO4 Battery\n✅ 300W Monocrystalline Solar Panel + 20m Cable Included\n✅ Free Doorstep Delivery & Pay on Delivery after live testing in Enugu\n\nOrder directly here 👇\n${shareUrl}`
                      : `${selectedProduct.title} — ₦${selectedProduct.price.toLocaleString()} on Buyfromudochukwu.\n${selectedProduct.subtitle}\n\nInspect full specs & order here 👇\n${shareUrl}`;

                  const handleCopyShare = (mode: string, textValue: string) => {
                    navigator.clipboard?.writeText(textValue);
                    setShareCopiedState(mode);
                    setTimeout(() => setShareCopiedState('idle'), 2600);
                  };

                  const variantSlides =
                    selectedProduct.id === 'prod-itel-powertank-full'
                      ? [
                          {
                            id: 'flyer',
                            label: 'Card 1: Graphic Ad Poster (21% OFF)',
                            url: `${window.location.origin}/ad/itel-enugu`,
                            download: '/share/itel-fb-ad-flyer.jpg',
                            filename: 'itel-enugu-21off-ad-flyer.jpg',
                          },
                          {
                            id: 'setup',
                            label: 'Card 2: 3-Piece Solar Bundle',
                            url: `${window.location.origin}/ad/itel-enugu?variant=setup`,
                            download: '/share/itel-powertank-setup.jpg',
                            filename: 'itel-powertank-bundle.jpg',
                          },
                          {
                            id: 'detail',
                            label: 'Card 3: Ports & Hardware Close-Up',
                            url: `${window.location.origin}/ad/itel-enugu?variant=detail`,
                            download: '/share/itel-powertank-detail.jpg',
                            filename: 'itel-powertank-ports.jpg',
                          },
                          {
                            id: 'solar',
                            label: 'Card 4: 300W Panel + 20m Cable',
                            url: `${window.location.origin}/ad/itel-enugu?variant=solar`,
                            download: '/share/itel-solar-kit.jpg',
                            filename: 'itel-300w-solar-20m-cable.jpg',
                          },
                        ]
                      : [];

                  return (
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          Share on Facebook (Ad Poster &amp; Variant Cards)
                        </h2>
                        <a
                          href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-sky-400 hover:text-sky-300 underline underline-offset-4"
                        >
                          Verify / Refresh FB Cache ↗
                        </a>
                      </div>
                      <div className="bg-[#191f30] border border-white/10 p-3 space-y-2.5">
                        <p className="text-[11px] font-mono text-slate-300 break-all select-all">
                          {shareUrl}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyShare('link', shareUrl)}
                            className="bg-white text-slate-950 hover:bg-slate-200 px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {shareCopiedState === 'link' ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Link Copied</span>
                              </>
                            ) : (
                              <span>Copy Ad Link</span>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyShare('post', fbCaption)}
                            className="border border-white/20 text-white hover:bg-white/5 px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {shareCopiedState === 'post' ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Post + Link Copied</span>
                              </>
                            ) : (
                              <span>Copy Facebook Caption + Link</span>
                            )}
                          </button>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-sky-400/40 text-sky-300 hover:bg-sky-500/10 px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider inline-flex items-center"
                          >
                            Post to Facebook ↗
                          </a>
                        </div>

                        {variantSlides.length > 0 && (
                          <div className="border-t border-white/10 pt-3 space-y-2">
                            <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                              For <strong className="text-white">swappable Carousel slides</strong> on a Facebook Page or Meta Ad, add each card URL below (or download the 4 images directly):
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {variantSlides.map((slide) => (
                                <div
                                  key={slide.id}
                                  className="flex items-center justify-between gap-2 bg-[#141824] border border-white/10 px-2.5 py-1.5 text-[10px] font-mono"
                                >
                                  <span className="text-slate-200 truncate">{slide.label}</span>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyShare(`var-${slide.id}`, slide.url)}
                                      className="text-amber-300 hover:text-amber-200 underline underline-offset-2 cursor-pointer"
                                    >
                                      {shareCopiedState === `var-${slide.id}` ? 'Copied' : 'Copy URL'}
                                    </button>
                                    <a
                                      href={slide.download}
                                      download={slide.filename}
                                      className="text-slate-400 hover:text-white underline underline-offset-2"
                                    >
                                      Save JPG
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Dedicated Enugu Conversion Matrix + Appliance Runtime Table for itel Power Tank Bundle */}
          {selectedProduct.id === 'prod-itel-powertank-full' && (
            <div className="border-t border-white/10 pt-10 space-y-8">
              {/* 4 Enugu Conversion Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-[#191f30] border border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold uppercase">
                    <Sun className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>300W Panel + 20m Cable</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Zero extra spending. Includes the 300W Monocrystalline panel and 20m heavy-duty cable straight from roof to your room.
                  </p>
                </div>

                <div className="bg-[#191f30] border border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold uppercase">
                    <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Free Enugu Delivery</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Free doorstep delivery across Independence Layout, New Haven, GRA, Trans-Ekulu, Achara, Abakpa, Emene &amp; Nsukka.
                  </p>
                </div>

                <div className="bg-[#191f30] border border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold uppercase">
                    <Zap className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Test Live Before Paying</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Plug your Smart TV, fan, laptop or router at your gate and confirm 2-hour fast charge performance before paying ₦550,000.
                  </p>
                </div>

                <div className="bg-[#191f30] border border-white/10 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold uppercase">
                    <Shield className="w-4 h-4 text-slate-200 shrink-0" />
                    <span>2-Year itel Warranty</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Class-A LiFePO4 battery lasts 6,000+ cycles (8–10 years) with official 2-year replacement guarantee and zero fuel bills.
                  </p>
                </div>
              </div>

              {/* Exact Jumia Spec Runtime Table + Complete Box Contents */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 bg-[#191f30] border border-white/15 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                      Tested Appliance Runtime (1,000Wh Capacity)
                    </h2>
                    <span className="text-[10px] font-mono text-slate-400">
                      itel IESS-05K10N · Pure Sine Wave
                    </span>
                  </div>
                  <div className="divide-y divide-white/10 text-xs font-mono">
                    <div className="grid grid-cols-3 px-4 py-2.5 text-slate-400 bg-[#141824]/60 uppercase text-[10px]">
                      <span>Appliance</span>
                      <span className="text-center">Wattage</span>
                      <span className="text-right">Est. Runtime</span>
                    </div>
                    {ITEL_RUNTIME_ROWS.map((row) => (
                      <div key={row.appliance} className="grid grid-cols-3 px-4 py-2.5 text-slate-200">
                        <span className="font-sans text-white">{row.appliance}</span>
                        <span className="text-center text-slate-400 tabular-nums">{row.wattage}</span>
                        <span className="text-right font-semibold text-emerald-300 tabular-nums">
                          {row.runtime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#191f30] border border-white/15 p-5 space-y-4">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-white font-semibold border-b border-white/10 pb-2.5">
                    Complete Full-Setup Box Contents
                  </h2>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                      <span>itel IESS-05K10N/P 500W + 1,000Wh Solar Generator (5kg White)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                      <span><strong className="text-white">300W Monocrystalline Solar Panel</strong> (included!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                      <span><strong className="text-white">20m Heavy-Duty Solar Extension Cable</strong> (included!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                      <span>AC Charging Cable, Solar Connector Cable &amp; Mounting Kit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                      <span>User Manual, Replacement Fuse &amp; 2-Year Warranty Card</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() => addToCart(selectedProduct, previewQty, true)}
                    className="w-full bg-white text-slate-950 hover:bg-slate-200 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  >
                    Lock In 21% Flash Price — ₦550,000
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ON-DEMAND RATING & REVIEW SECTION (Form appears ONLY when user clicks Rate!) */}
          <div className="border-t border-white/10 pt-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-sans font-semibold text-white">
                  Buyer Reviews ({ratingStats.count})
                </h2>
                {reviewSubmittedNotice && (
                  <p className="text-xs font-mono text-emerald-300 mt-1">
                    {reviewSubmittedNotice}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowRatingForm((prev) => !prev)}
                className="border border-white/30 hover:border-white text-white px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                {showRatingForm ? 'Close Review Form' : 'Rate This Item'}
              </button>
            </div>

            {/* Rating Form — ONLY rendered when user decides to rate */}
            <AnimatePresence>
              {showRatingForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmitItemReview}
                  className="bg-[#191f30] border border-white/15 p-5 sm:p-6 space-y-4 max-w-xl overflow-hidden"
                >
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-slate-300 uppercase block">
                      Select Star Rating ({reviewRating} / 5)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setReviewRating(starVal)}
                          className="p-2 border border-white/15 bg-[#141824] hover:border-white cursor-pointer"
                          aria-label={`Rate ${starVal} stars`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              starVal <= reviewRating ? 'text-white fill-white' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name *"
                      className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={reviewCity}
                      onChange={(e) => setReviewCity(e.target.value)}
                      placeholder="City (optional)"
                      className="bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full bg-[#141824] border border-white/20 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none resize-none"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRatingForm(false)}
                      className="border border-white/20 text-slate-300 px-4 py-2.5 text-xs font-mono uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Submitted Reviews Feed (compact, zero clutter) */}
            {ratingStats.reviews.length > 0 && (
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {ratingStats.reviews.map((rev) => (
                  <div key={rev.id} className="py-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= rev.rating ? 'text-white fill-white' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-sans font-semibold text-white">{rev.authorName}</span>
                        {rev.city && <span className="font-mono text-slate-400">· {rev.city}</span>}
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                        <span>{rev.createdAt}</span>
                        {isAdminLogged && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItemReview(rev.id)}
                            className="text-rose-300 hover:text-white cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // VIEW D: MAIN STOREFRONT — CLEAN, PREMIUM, PRODUCTS IMMEDIATELY VISIBLE (2-UP MOBILE)
  // =========================================================================
  const activePromo = PROMO_SLIDES[activePromoIdx];

  return (
    <div className="bg-[#141824] text-white min-h-screen w-full overflow-x-hidden pb-24">
      {/* 1. CLEAN BRANDED STORE BAR */}
      {renderStoreSubHeader()}

      {/* 2. COMPACT EDITORIAL PROMO BANNER + RE-OPEN 21% FLASH SALE AD TRIGGER */}
      <section className="relative bg-[#191f30] border-b border-white/10 overflow-hidden">
        {isPromoPlaying && (
          <motion.div
            key={`promo-gleam-${activePromoIdx}`}
            initial={{ x: '-100%', opacity: 0.25 }}
            animate={{ x: '130%', opacity: 0 }}
            transition={{ duration: 2.0, ease: 'easeOut' }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePromo.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                onClick={() => {
                  const match = products.find((p) => p.id === activePromo.targetProductId);
                  if (match) openFullPagePreview(match);
                }}
              >
                <div className="w-12 h-11 sm:w-20 sm:h-16 bg-[#0e111a] border border-white/15 overflow-hidden shrink-0">
                  <img
                    src={activePromo.image}
                    alt={activePromo.title}
                    className={getProductImgClass(activePromo.image)}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block truncate">
                    {activePromo.label}
                  </span>
                  <h1 className="text-xs sm:text-base font-sans font-semibold text-white line-clamp-2 sm:truncate">
                    {activePromo.title}
                  </h1>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const match = products.find((p) => p.id === activePromo.targetProductId);
                  if (match) openFullPagePreview(match);
                }}
                className="bg-white text-slate-950 hover:bg-slate-200 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
              >
                View Deal
              </button>
              <button
                type="button"
                onClick={() => setIsPromoPlaying((p) => !p)}
                className="p-1.5 border border-white/20 hover:border-white text-slate-300 hover:text-white cursor-pointer hidden sm:inline-flex"
                title={isPromoPlaying ? 'Pause rotation' : 'Play rotation'}
              >
                {isPromoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2.5">
            {PROMO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActivePromoIdx(idx);
                  setIsPromoPlaying(false);
                }}
                className={`h-0.5 transition-all cursor-pointer ${
                  activePromoIdx === idx ? 'w-7 bg-white' : 'w-3.5 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Promo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM DROPDOWN CATEGORY & FILTER BAR + 2-UP SIDE-BY-SIDE LISTING GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-5">
        <div
          ref={filterBarRef}
          className="border-b border-white/10 pb-4 space-y-3"
        >
          <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
            {/* Search Input */}
            <div className="col-span-2 md:col-span-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, models, specs..."
                className="w-full h-10 bg-[#191f30] border border-white/15 px-3.5 text-xs font-mono text-white placeholder:text-slate-500 focus:border-white focus:outline-none"
              />
            </div>

            {/* Premium Category Dropdown */}
            <div className="col-span-1 md:col-span-4 relative">
              <button
                type="button"
                onClick={() => {
                  setCategoryMenuOpen((prev) => !prev);
                  setSortMenuOpen(false);
                }}
                aria-expanded={categoryMenuOpen}
                className={`w-full h-10 bg-[#191f30] border px-3 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer ${
                  categoryMenuOpen
                    ? 'border-white text-white'
                    : 'border-white/15 hover:border-white/35 text-slate-200'
                }`}
              >
                <span className="min-w-0 truncate text-xs font-mono">
                  <span className="text-slate-400 hidden sm:inline">Category: </span>
                  <span className="text-white font-medium">{selectedCategory}</span>
                </span>
                <CaretIcon open={categoryMenuOpen} />
              </button>

              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.14 }}
                    className="absolute left-0 top-full mt-1.5 w-full min-w-[210px] bg-[#191f30] border border-white/25 shadow-2xl z-30 divide-y divide-white/10"
                  >
                    {categories.map((cat) => {
                      const active = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setCategoryMenuOpen(false);
                          }}
                          className={`w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs font-mono text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-white text-slate-950 font-semibold'
                              : 'text-slate-200 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{cat}</span>
                          <span
                            className={`text-[10px] shrink-0 tabular-nums ${
                              active ? 'text-slate-700' : 'text-slate-400'
                            }`}
                          >
                            ({getCategoryCount(cat)})
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Sort / Filter Dropdown */}
            <div className="col-span-1 md:col-span-3 relative">
              <button
                type="button"
                onClick={() => {
                  setSortMenuOpen((prev) => !prev);
                  setCategoryMenuOpen(false);
                }}
                aria-expanded={sortMenuOpen}
                className={`w-full h-10 bg-[#191f30] border px-3 flex items-center justify-between gap-2 text-left transition-colors cursor-pointer ${
                  sortMenuOpen
                    ? 'border-white text-white'
                    : 'border-white/15 hover:border-white/35 text-slate-200'
                }`}
              >
                <span className="min-w-0 truncate text-xs font-mono">
                  <span className="text-slate-400 hidden sm:inline">Sort: </span>
                  <span className="text-white font-medium">{activeSortLabel}</span>
                </span>
                <CaretIcon open={sortMenuOpen} />
              </button>

              <AnimatePresence>
                {sortMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 top-full mt-1.5 w-full min-w-[190px] bg-[#191f30] border border-white/25 shadow-2xl z-30 divide-y divide-white/10"
                  >
                    {sortOptions.map((opt) => {
                      const active = sortOrder === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSortOrder(opt.value);
                            setSortMenuOpen(false);
                          }}
                          className={`w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs font-mono text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-white text-slate-950 font-semibold'
                              : 'text-slate-200 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </span>
            {(selectedCategory !== 'All' || searchQuery.trim() !== '' || sortOrder !== 'featured') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortOrder('featured');
                }}
                className="text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-white/15 bg-[#191f30] p-10 text-center space-y-4">
            <p className="text-sm font-mono text-slate-300">No items match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="border border-white text-white px-5 py-2 text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-slate-950 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => {
              const discountPct = getDiscountPercent(product);
              const stats = getProductRatingStats(product.id);
              return (
                <motion.article
                  key={product.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  className="bg-[#191f30] border border-white/10 hover:border-white/35 flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    <div
                      onClick={() => openFullPagePreview(product)}
                      className="aspect-[4/3] bg-[#0e111a] overflow-hidden cursor-pointer relative border-b border-white/10"
                    >
                      <img
                        src={product.images[0] || GENERATED_ASSETS.marketplaceHeroCollection}
                        alt={product.title}
                        className={getProductImgClass(
                          product.images[0],
                          'group-hover:scale-103 transition-transform duration-300'
                        )}
                        referrerPolicy="no-referrer"
                      />
                      {discountPct > 0 && (
                        <span className="absolute top-2 left-2 bg-[#141824]/90 border border-white/25 text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                          {discountPct}% off
                        </span>
                      )}
                    </div>

                    <div className="p-3 sm:p-4 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block truncate">
                        {product.category}
                      </span>

                      <h2
                        onClick={() => openFullPagePreview(product)}
                        className="text-xs sm:text-sm font-sans font-semibold text-white leading-snug line-clamp-2 cursor-pointer hover:text-slate-300 transition-colors"
                      >
                        {product.title}
                      </h2>

                      {stats.count > 0 && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300">
                          <Star className="w-3 h-3 text-white fill-white" />
                          <span>
                            {stats.avg} ({stats.count})
                          </span>
                        </div>
                      )}

                      <div className="pt-1 flex flex-wrap items-baseline gap-2">
                        <span className="text-sm sm:text-base font-sans font-semibold text-white tabular-nums">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] sm:text-xs font-mono text-slate-500 line-through tabular-nums">
                            ₦{product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, true)}
                      disabled={!product.inStock}
                      className="flex-1 bg-white text-slate-950 hover:bg-slate-200 disabled:opacity-40 py-2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {product.inStock ? 'Buy' : 'Sold Out'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openFullPagePreview(product)}
                      className="border border-white/20 hover:border-white text-white px-2.5 sm:px-3 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

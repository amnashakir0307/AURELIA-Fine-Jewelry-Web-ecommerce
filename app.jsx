import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, ShieldCheck, Sparkles, X, ChevronRight,
  Eye, Check, RotateCcw, Truck, Award, CreditCard, Lock, Smartphone,
  Star, ChevronDown, Info, Mail, Phone, MapPin, Download,
  Sliders, Plus, Minus, CheckCircle2, Upload, ExternalLink, RefreshCw,
  HelpCircle, Shield, Award as CertificateIcon, ArrowRight, Menu
} from 'lucide-react';

const ASSETS = {
  logo: 'https://i.pinimg.com/736x/52/1a/b7/521ab767a302213c930adcc6e456af63.jpg',
  heroBg: 'https://i.pinimg.com/736x/9a/c9/c3/9ac9c3874cfa39b0f56614279f06348d.jpg',
  categoryCover: 'https://i.pinimg.com/736x/f0/35/bd/f035bd6a23906439035e57cf214e7485.jpg',
  ringsCover: 'https://i.pinimg.com/736x/44/c6/37/44c63711f39838de65c7835f07e5a5c0.jpg'
};

const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP' },
  AED: { symbol: 'AED ', rate: 3.67, name: 'AED' }
};

const CATEGORIES = [
  {
    id: 'Rings',
    name: 'Rings',
    image: 'https://i.pinimg.com/736x/44/c6/37/44c63711f39838de65c7835f07e5a5c0.jpg',
    tagline: 'Signature Solitaires & Crown Bands'
  },
  {
    id: 'Bracelets',
    name: 'Bracelets',
    image: 'https://i.pinimg.com/736x/5a/c9/57/5ac957ac3182fcc2b33fb62a08fb9046.jpg',
    tagline: 'Delicate Chains & Tennis Diamonds'
  },
  {
    id: 'Bangles',
    name: 'Bangles',
    image: 'https://i.pinimg.com/736x/39/f1/36/39f136cc104ca6c8ba729bdc270d73ba.jpg',
    tagline: 'Solid Handcrafted Gold Stackables'
  },
  {
    id: 'Necklaces',
    name: 'Necklaces',
    image: 'https://img.staticdj.com/e1f33173958096f6ebf2428209643dae_1024x.jpeg',
    tagline: 'Pendants & Regal Statement Chains'
  }
];

const PRODUCTS = [
  // --- RINGS ---
  {
    id: 'ring-1',
    name: 'The Crown Solitaire Oval Ring',
    category: 'Rings',
    priceUSD: 4850,
    rating: 4.9,
    reviewsCount: 48,
    purity: '18K Yellow Gold',
    gemstone: 'Diamond',
    inStock: 3,
    image: 'https://i.pinimg.com/736x/c9/2e/61/c92e61dba4065bb69e1fee5308ba70bd.jpg',
    subtitle: 'Signature 18K Yellow Gold & Oval Diamond',
    description: 'Forged in sustainable 18K solid yellow gold, this ring presents a flawless 2.5-carat oval brilliant cut diamond securely housed in our signature double-prong crown setting.',
    details: ['2.5 Carat Oval Cut Diamond (VVS1, E Color)', '18K Sustainable Yellow Gold', 'GIA Certified Diamond Serial', 'Complementary Custom Sizing & Engraving'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },
  {
    id: 'ring-2',
    name: 'Elysian Sapphire Halo Ring',
    category: 'Rings',
    priceUSD: 6200,
    rating: 5.0,
    reviewsCount: 32,
    purity: 'Platinum 950',
    gemstone: 'Sapphire',
    inStock: 2,
    image: 'https://i.pinimg.com/736x/4f/f9/07/4ff907e0a5b6676f0263ffcd97be9c80.jpg',
    subtitle: 'Solid Platinum with Royal Blue Ceylon Sapphire',
    description: 'A masterpiece showcasing an unheated 3.2-carat Ceylon Sapphire with a pavé diamond halo set in durable solid platinum.',
    details: ['3.2 Carat Natural Ceylon Sapphire', '0.8 ctw Micro-Pavé Accent Diamonds', 'Solid Platinum 950 Framework', 'Gubelin Gem Lab Certified'],
    defaultMetal: 'platinum',
    defaultGem: 'sapphire'
  },
  {
    id: 'ring-3',
    name: 'Aethel Emerald Eternity Band',
    category: 'Rings',
    priceUSD: 3900,
    rating: 4.8,
    reviewsCount: 21,
    purity: '18K Rose Gold',
    gemstone: 'Emerald',
    inStock: 5,
    image: 'https://i.pinimg.com/736x/2b/98/d1/2b98d1f5d9520eead413d5af8eb6aa23.jpg',
    subtitle: '18K Rose Gold with Emerald Cut Colombian Emeralds',
    description: 'A seamless circle of hand-matched vibrant Colombian emeralds encased in warm 18K rose gold.',
    details: ['12 Emerald Cut Emeralds (~3.8 ctw)', 'Comfort-Fit Contoured Band Interior', '18K Fair-mined Rose Gold', 'Official Appraisal & Certificate'],
    defaultMetal: 'rosegold',
    defaultGem: 'emerald'
  },
  {
    id: 'ring-4',
    name: 'Imperial Crimson Ruby Solitaire',
    category: 'Rings',
    priceUSD: 8500,
    rating: 5.0,
    reviewsCount: 17,
    purity: '24K Pure Gold',
    gemstone: 'Ruby',
    inStock: 1,
    image: 'https://i.pinimg.com/736x/c5/ed/d6/c5edd6a98bca31893ddf2466f0aa614b.jpg',
    subtitle: '24K Solid Gold with Burmese Ruby',
    description: 'An exceptionally rare 4.1-carat Burmese "Pigeon Blood" ruby set inside hand-hammered 24K pure solid gold.',
    details: ['4.1 Carat Natural Burmese Ruby', '24K Pure Handcrafted Gold', 'Hand-carved Art Deco setting', 'GIA & SSEF Authenticated'],
    defaultMetal: 'gold',
    defaultGem: 'ruby'
  },
  {
    id: 'ring-5',
    name: 'Lumiere Marquise Diamond Ring',
    category: 'Rings',
    priceUSD: 5100,
    rating: 4.9,
    reviewsCount: 29,
    purity: '18K White Gold',
    gemstone: 'Diamond',
    inStock: 4,
    image: 'https://i.pinimg.com/736x/92/5c/d2/925cd2cd54a8221ae54c93bb699c2a63.jpg',
    subtitle: '18K White Gold Marquise Cut Brilliance',
    description: 'An elongated marquise diamond designed to illuminate the finger, suspended in high-luster 18K white gold.',
    details: ['2.1 Carat Marquise Diamond', '18K White Gold High Polish Band', 'Conflict-Free Sourcing', 'Lifetime Cleaning Warranty'],
    defaultMetal: 'whitegold',
    defaultGem: 'diamond'
  },

  // --- BRACELETS ---
  {
    id: 'brac-1',
    name: 'Seraphina Diamond Tennis Bracelet',
    category: 'Bracelets',
    priceUSD: 7400,
    rating: 5.0,
    reviewsCount: 54,
    purity: '18K White Gold',
    gemstone: 'Diamond',
    inStock: 6,
    image: 'https://i.pinimg.com/736x/5a/c9/57/5ac957ac3182fcc2b33fb62a08fb9046.jpg',
    subtitle: 'Classic 18K White Gold & 8.0 ctw Diamonds',
    description: 'A timeless fluid row of brilliant round diamonds meticulously set in four-prong 18K white gold settings.',
    details: ['8.0 ctw Round Brilliant Cut Diamonds', 'Double-Safety Latch Clasp', '18K Solid White Gold', '7.0 inches Standard Length'],
    defaultMetal: 'whitegold',
    defaultGem: 'diamond'
  },
  {
    id: 'brac-2',
    name: 'Opulent Sapphire Link Bracelet',
    category: 'Bracelets',
    priceUSD: 6800,
    rating: 4.9,
    reviewsCount: 18,
    purity: 'Platinum 950',
    gemstone: 'Sapphire',
    inStock: 3,
    image: 'https://i.pinimg.com/736x/14/42/23/144223df43327b002acd5cd21b816622.jpg',
    subtitle: 'Platinum & Royal Blue Ceylon Sapphires',
    description: 'Alternating emerald-cut sapphires and diamond bar links crafted in heavy solid platinum.',
    details: ['6.5 ctw Natural Blue Sapphires', '2.0 ctw Accent Diamonds', 'Solid Platinum Construction', 'Safety Clasp System'],
    defaultMetal: 'platinum',
    defaultGem: 'sapphire'
  },
  {
    id: 'brac-3',
    name: 'Aurelia Golden Knot Bracelet',
    category: 'Bracelets',
    priceUSD: 3100,
    rating: 4.7,
    reviewsCount: 23,
    purity: '18K Yellow Gold',
    gemstone: 'None',
    inStock: 8,
    image: 'https://i.pinimg.com/736x/26/54/dd/2654dd7a63617d16e226a12d189867be.jpg',
    subtitle: 'Woven 18K Solid Gold Silk Flex Chain',
    description: 'Italian woven gold strands creating an effortlessly flexible yet structural luxury link bracelet.',
    details: ['18K Sustainable Italian Yellow Gold', 'Flexible Ergonomic Fit', 'High-Mirror Mirror Finish', 'Stamped Hallmark 750'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },
  {
    id: 'brac-4',
    name: 'Rose Gold Emerald Chain Bracelet',
    category: 'Bracelets',
    priceUSD: 4200,
    rating: 4.9,
    reviewsCount: 14,
    purity: '18K Rose Gold',
    gemstone: 'Emerald',
    inStock: 2,
    image: 'https://i.pinimg.com/736x/47/21/b1/4721b131665c837bfccaf8c8e1f9959d.jpg',
    subtitle: '18K Rose Gold with Bezel Emerald Drops',
    description: 'Five delicate bezel-set Colombian emeralds dancing along a fine 18K rose gold cable chain.',
    details: ['2.2 ctw Bezel-Set Emeralds', 'Adjustable 6.5 - 7.5 inch length', '18K Solid Rose Gold', 'Handcrafted in Milan'],
    defaultMetal: 'rosegold',
    defaultGem: 'emerald'
  },
  {
    id: 'brac-5',
    name: 'Celestial Diamond Charm Cuff',
    category: 'Bracelets',
    priceUSD: 5600,
    rating: 4.8,
    reviewsCount: 19,
    purity: '18K Yellow Gold',
    gemstone: 'Diamond',
    inStock: 4,
    image: 'https://i.pinimg.com/736x/6f/8b/30/6f8b30c1968fea782fbe85832639663f.jpg',
    subtitle: 'Open Cuff with Diamond Starburst Motifs',
    description: 'An adjustable open gold cuff anchored by pavé diamond starburst charms at either end.',
    details: ['1.5 ctw Pavé Diamond Accents', '18K Yellow Gold Flex Metal', 'Hand-engraved Florentine Finish', 'Custom Gift Packaging'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },

  // --- BANGLES ---
  {
    id: 'bang-1',
    name: 'Imperial Solid 24K Gold Bangle',
    category: 'Bangles',
    priceUSD: 5900,
    rating: 5.0,
    reviewsCount: 39,
    purity: '24K Pure Gold',
    gemstone: 'None',
    inStock: 5,
    image: 'https://i.pinimg.com/736x/39/f1/36/39f136cc104ca6c8ba729bdc270d73ba.jpg',
    subtitle: 'Hand-Hammered 24K Solid Gold Bangle',
    description: 'Solid 24K pure gold forged with subtle organic hammer facets that reflect warm sunlight brilliantly.',
    details: ['100% Pure 24K Gold (approx. 42 grams)', 'Sustainably Refined Metal', 'Subtle Hammered Texture', 'Includes Velvet Vault Box'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },
  {
    id: 'bang-2',
    name: 'Diamond Hinged Oval Bangle',
    category: 'Bangles',
    priceUSD: 6400,
    rating: 4.9,
    reviewsCount: 27,
    purity: '18K Yellow Gold',
    gemstone: 'Diamond',
    inStock: 3,
    image: 'https://i.pinimg.com/1200x/f3/a4/40/f3a440fa4f2ab47adc07a78c7ea49c34.jpg',
    subtitle: '18K Yellow Gold with Channel Diamonds',
    description: 'An elegant hinged oval structure lined with a channel of brilliant white diamonds along the top ridge.',
    details: ['3.0 ctw Channel-Set Diamonds', '18K Solid Yellow Gold', 'Concealed Side Press Safety Button', 'Ergonomic Oval Wrist Contour'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },
  {
    id: 'bang-3',
    name: 'Verdant Emerald Stack Bangle',
    category: 'Bangles',
    priceUSD: 4900,
    rating: 4.8,
    reviewsCount: 16,
    purity: '18K Rose Gold',
    gemstone: 'Emerald',
    inStock: 2,
    image: 'https://i.pinimg.com/736x/35/45/1a/35451af023c3c0c8935808a6a9de3005.jpg',
    subtitle: '18K Rose Gold with Emerald Accents',
    description: 'Sleek geometric rose gold stackable bangle punctuated with square emerald studs.',
    details: ['1.8 ctw Colombian Square Emeralds', '18K Solid Rose Gold', 'Stackable Slim Silhouette', 'Laser-engraved serial number'],
    defaultMetal: 'rosegold',
    defaultGem: 'emerald'
  },
  {
    id: 'bang-4',
    name: 'Royale Sapphire Filigree Bangle',
    category: 'Bangles',
    priceUSD: 7200,
    rating: 5.0,
    reviewsCount: 12,
    purity: 'Platinum 950',
    gemstone: 'Sapphire',
    inStock: 1,
    image: 'https://i.pinimg.com/736x/c7/61/a9/c761a91e40a2b46f3a5f694f9fb98680.jpg',
    subtitle: 'Vintage-Inspired Platinum & Sapphire Bangle',
    description: 'Intricate platinum wire filigree artwork inset with rare blue Ceylon sapphires.',
    details: ['4.5 ctw Royal Blue Ceylon Sapphires', 'Solid Platinum Hand-pierced Filigree', 'Secure Double Clasp', 'Artisan Handcrafted'],
    defaultMetal: 'platinum',
    defaultGem: 'sapphire'
  },
  {
    id: 'bang-5',
    name: 'Aurelia Tri-Color Stack Bangles',
    category: 'Bangles',
    priceUSD: 8100,
    rating: 4.9,
    reviewsCount: 31,
    purity: '18K Gold Set',
    gemstone: 'Diamond',
    inStock: 3,
    image: 'https://i.pinimg.com/736x/e8/f9/c2/e8f9c298b248f36ab779774b23092b94.jpg',
    subtitle: 'Trio Set of Yellow, Rose & White Gold Bangles',
    description: 'A set of three interlocking solid gold bangles representing past, present, and future.',
    details: ['Set of 3 Interlocked Bangles', '18K Yellow, Rose & White Gold', '1.2 ctw Micro-Diamond Pavé Line', 'Weighted Solid Gold Sensation'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  },

  // --- NECKLACES ---
  {
    id: 'neck-1',
    name: 'Lumiere Diamond Solitaire Pendant',
    category: 'Necklaces',
    priceUSD: 3800,
    rating: 4.9,
    reviewsCount: 62,
    purity: '18K White Gold',
    gemstone: 'Diamond',
    inStock: 7,
    image: 'https://img.staticdj.com/e1f33173958096f6ebf2428209643dae_1024x.jpeg',
    subtitle: '18K White Gold Chain & 1.8 ct Diamond',
    description: 'A magnificent cushion-cut diamond hanging suspended from an 18k white gold adjustable cable chain.',
    details: ['1.8 Carat Cushion Cut Diamond', '18K White Gold 18-inch Chain', 'Lobster Claw Clasp with Charm', 'GIA Diamond Certificate Included'],
    defaultMetal: 'whitegold',
    defaultGem: 'diamond'
  },
  {
    id: 'neck-2',
    name: 'Empress Sapphire Regal Choker',
    category: 'Necklaces',
    priceUSD: 9500,
    rating: 5.0,
    reviewsCount: 22,
    purity: 'Platinum 950',
    gemstone: 'Sapphire',
    inStock: 2,
    image: 'https://i.pinimg.com/736x/6f/e0/3c/6fe03ced13af3b44ed09b68ff137c988.jpg',
    subtitle: 'Platinum with Oval Ceylon Sapphire Drops',
    description: 'A regal high-jewelry collar with cascading teardrop Ceylon blue sapphires surrounded by brilliant white diamonds.',
    details: ['12.5 ctw Teardrop Ceylon Sapphires', '4.0 ctw Marquise Diamonds', 'Solid Platinum 950 Framework', 'Vault Masterpiece Certificate'],
    defaultMetal: 'platinum',
    defaultGem: 'sapphire'
  },
  {
    id: 'neck-3',
    name: 'Aethel Colombian Emerald Pendant',
    category: 'Necklaces',
    priceUSD: 5400,
    rating: 4.8,
    reviewsCount: 15,
    purity: '18K Yellow Gold',
    gemstone: 'Emerald',
    inStock: 4,
    image: 'https://i.pinimg.com/1200x/1f/e9/38/1fe938b617631dd945f937b52f7e2846.jpg',
    subtitle: '18K Yellow Gold & Pear Cut Emerald',
    description: 'Vivid green Colombian emerald set in rich gold prongs hanging gracefully along a solid box chain.',
    details: ['2.8 Carat Pear Cut Colombian Emerald', '18K Solid Yellow Gold', 'Adjustable 16 to 20 inch Length', 'Natural Unheated Quality'],
    defaultMetal: 'gold',
    defaultGem: 'emerald'
  },
  {
    id: 'neck-4',
    name: 'Imperial Ruby & Diamond Y-Necklace',
    category: 'Necklaces',
    priceUSD: 8900,
    rating: 5.0,
    reviewsCount: 11,
    purity: '18K Rose Gold',
    gemstone: 'Ruby',
    inStock: 1,
    image: 'https://i.pinimg.com/736x/14/ac/c9/14acc95878526e4f27a8ec06ecb79109.jpg',
    subtitle: '18K Rose Gold Lariat with Burmese Ruby Drop',
    description: 'Dramatic Y-silhouette necklace ending in a deep crimson ruby teardrop stone.',
    details: ['3.5 Carat Burmese Ruby Drop', '1.8 ctw Pavé Diamond Lariat Line', '18K Warm Rose Gold', 'Bespoke Velvet Presentation Box'],
    defaultMetal: 'rosegold',
    defaultGem: 'ruby'
  },
  {
    id: 'neck-5',
    name: 'Celestia Diamond Layering Chain',
    category: 'Necklaces',
    priceUSD: 4300,
    rating: 4.7,
    reviewsCount: 26,
    purity: '18K Yellow Gold',
    gemstone: 'Diamond',
    inStock: 5,
    image: 'https://i.pinimg.com/736x/65/a3/ac/65a3ac69af43dbf66393458cbce21b98.jpg',
    subtitle: 'Diamonds by the Yard 18K Yellow Gold',
    description: 'Station necklace featuring bezel-set diamonds positioned at even intervals along a fluid gold chain.',
    details: ['2.0 ctw Bezel Round Diamonds', '18K Solid Yellow Gold (24-inch)', 'Versatile Layering Piece', 'High Strength Chain Weave'],
    defaultMetal: 'gold',
    defaultGem: 'diamond'
  }
];

const BOUTIQUES = [
  {
    city: 'New York',
    name: 'Fifth Avenue Flagship',
    address: '740 Fifth Avenue, New York, NY 10019',
    phone: '+1 (212) 555-0192',
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    city: 'Paris',
    name: 'Place Vendôme Salon',
    address: '18 Place Vendôme, 75001 Paris, France',
    phone: '+33 1 42 68 55 00',
    hours: 'Mon-Sat: 10:30 AM - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600'
  },
  {
    city: 'London',
    name: 'Mayfair Atelier',
    address: '42 New Bond Street, London W1S 2RY',
    phone: '+44 20 7946 0912',
    hours: 'Mon-Sat: 10:00 AM - 6:30 PM',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600'
  },
  {
    city: 'Dubai',
    name: 'The Dubai Mall Suite',
    address: 'Fashion Avenue, Level 1, Dubai, UAE',
    phone: '+971 4 388 2901',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600'
  }
];

const FAQS = [
  {
    q: 'Are all Aurelia gemstones and gold certified authentic?',
    a: 'Yes, every single diamond above 0.50ct comes with a GIA or IGI grading certificate. Our gold is 100% fair-mined 18K/24K or Platinum 950 with hallmark purity stamps.'
  },
  {
    q: 'What is your complimentary 30-day return policy?',
    a: 'We offer a no-questions-asked 30-day full refund or exchange guarantee on all standard catalog items. Items must be returned in unworn condition with original tamper-evident vault tags.'
  },
  {
    q: 'How does the Bespoke Custom Ordering process work?',
    a: 'You can submit an image reference or specifications through our Custom Design form. Our master jeweler will prepare a 3D preview render and quote within 24 hours.'
  },
  {
    q: 'Is global delivery fully insured during transit?',
    a: 'Yes, all orders are shipped via armored courier (Brinks/FedEx Express Vault) with 100% transit insurance cover and mandatory signature upon delivery.'
  }
];

function createProceduralRingScene(containerEl, config) {
  if (!containerEl) return null;

  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }

  const width = containerEl.clientWidth || 300;
  const height = containerEl.clientHeight || 300;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1.5, 4.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  containerEl.appendChild(renderer.domElement);

  // Lighting setup for high luxury metallic shine
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff8eb, 2.8);
  mainLight.position.set(5, 8, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xcde1ff, 2.0);
  fillLight.position.set(-5, -2, -5);
  scene.add(fillLight);

  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  // Metal Material Selection
  let metalColor = 0xD4AF37; // Gold
  let roughness = 0.12;
  let metalness = 0.96;

  if (config.metal === 'rosegold') {
    metalColor = 0xE8A798;
  } else if (config.metal === 'whitegold' || config.metal === 'platinum') {
    metalColor = 0xE5E8EC;
    roughness = 0.08;
    metalness = 0.98;
  }

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: metalColor,
    metalness: metalness,
    roughness: roughness,
    envMapIntensity: 2.2
  });

  // Gemstone Material Selection
  let gemColor = 0xffffff;
  let gemOpacity = 0.88;
  let gemTransmission = 0.92;

  if (config.gem === 'sapphire') {
    gemColor = 0x0f388a;
    gemTransmission = 0.45;
  } else if (config.gem === 'emerald') {
    gemColor = 0x046307;
    gemTransmission = 0.50;
  } else if (config.gem === 'ruby') {
    gemColor = 0xa3051b;
    gemTransmission = 0.45;
  }

  const gemMaterial = new THREE.MeshPhysicalMaterial({
    color: gemColor,
    metalness: 0.1,
    roughness: 0.04,
    transmission: gemTransmission,
    opacity: gemOpacity,
    transparent: true,
    ior: 2.417,
    reflectivity: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  // Ring Band Geometry
  const bandGeo = new THREE.TorusGeometry(1.0, 0.12, 32, 100);
  const bandMesh = new THREE.Mesh(bandGeo, metalMaterial);
  bandMesh.rotation.x = Math.PI / 2;
  ringGroup.add(bandMesh);

  // Crown base
  const crownGeo = new THREE.CylinderGeometry(0.35, 0.2, 0.3, 16);
  const crownMesh = new THREE.Mesh(crownGeo, metalMaterial);
  crownMesh.position.set(0, 1.02, 0);
  ringGroup.add(crownMesh);

  // 4 Prongs
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const prongGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.38, 8);
    const prong = new THREE.Mesh(prongGeo, metalMaterial);
    prong.position.set(Math.cos(angle) * 0.28, 1.18, Math.sin(angle) * 0.28);
    ringGroup.add(prong);
  }

  // Gemstone Geometry
  const gemScale = config.gemScale || 1.0;
  const gemGeo = new THREE.OctahedronGeometry(0.38 * gemScale, 2);
  const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
  gemMesh.position.set(0, 1.25, 0);
  gemMesh.scale.set(1.0, 1.2, 1.0);
  ringGroup.add(gemMesh);

  ringGroup.rotation.x = 0.35;
  ringGroup.rotation.z = -0.2;

  // Interaction controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  const onMouseDown = (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    ringGroup.rotation.y += deltaX * 0.01;
    ringGroup.rotation.x += deltaY * 0.01;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => { isDragging = false; };

  const domEl = renderer.domElement;
  domEl.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  // Touch controls
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    ringGroup.rotation.y += deltaX * 0.01;
    ringGroup.rotation.x += deltaY * 0.01;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = () => { isDragging = false; };

  domEl.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);

  const handleResize = () => {
    if (!containerEl) return;
    const w = containerEl.clientWidth;
    const h = containerEl.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', handleResize);

  let animId;
  const animate = () => {
    animId = requestAnimationFrame(animate);
    if (config.autoRotate && !isDragging) {
      ringGroup.rotation.y += 0.008;
      ringGroup.position.y = Math.sin(Date.now() * 0.002) * 0.06;
    }
    renderer.render(scene, camera);
  };
  animate();

  return {
    cleanup: () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    }
  };
}

export default function App() {
  // Page Loader State
  const [isLoading, setIsLoading] = useState(true);

  // Global Navigation & Catalog State
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], metal: 'gold', gem: 'diamond', ringSize: '6.5', quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(['ring-1', 'brac-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [pdpTab, setPdpTab] = useState('gallery'); // 'gallery', 'specs', '3d'
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPurity, setSelectedPurity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);

  // 3D Customizer PDP State
  const [modalMetal, setModalMetal] = useState('gold');
  const [modalGem, setModalGem] = useState('diamond');
  const [modalRingSize, setModalRingSize] = useState('6.5');
  const [modalCarat, setModalCarat] = useState(2.5);

  // Custom Bespoke Design Order State
  const [customForm, setCustomForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Rings',
    metal: '18K Yellow Gold',
    gemstone: 'Diamond',
    carat: '2.0',
    budget: '$5,000 - $10,000',
    notes: '',
    imageUrl: ''
  });
  const [customSubmitted, setCustomSubmitted] = useState(false);

  // Checkout Workflow State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@aurelia-jewelry.com',
    phone: '+1 (555) 019-2834',
    address: '740 Park Avenue, Apt 12B',
    city: 'New York',
    country: 'United States',
    zip: '10021'
  });
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 3D Canvas Refs
  const pdp3DRef = useRef(null);

  // Simulated Page Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize PDP 3D Canvas
  useEffect(() => {
    let pdpInstance = null;
    if (activeModalProduct && pdpTab === '3d' && pdp3DRef.current) {
      pdpInstance = createProceduralRingScene(pdp3DRef.current, {
        metal: modalMetal,
        gem: modalGem,
        gemScale: modalCarat / 2.0,
        autoRotate: true
      });
    }
    return () => {
      if (pdpInstance) pdpInstance.cleanup();
    };
  }, [activeModalProduct, pdpTab, modalMetal, modalGem, modalCarat]);

  // Currency Converter Utility
  const formatPrice = (priceUSD) => {
    const curr = CURRENCIES[currency];
    const converted = Math.round(priceUSD * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  // Cart Functions
  const addToCart = (product, metal = 'gold', gem = 'diamond', ringSize = '6.5') => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.metal === metal && i.gem === gem
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, metal, gem, ringSize, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your Shopping Bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity += delta;
      if (copy[index].quantity <= 0) copy.splice(index, 1);
      return copy;
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Private Wishlist');
        return [...prev, productId];
      }
    });
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AURELIA10') {
      setDiscountPercent(10);
      showToast('10% VIP Discount Applied');
    } else {
      showToast('Invalid Promotion Code');
    }
  };

  // Pricing Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const cartTotal = cartSubtotal - discountAmount;
  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Filtered Catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPurity = selectedPurity === 'All' || p.purity.includes(selectedPurity);
      const matchesPrice = p.priceUSD <= maxPrice;
      return matchesSearch && matchesCategory && matchesPurity && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPurity, maxPrice]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0B132B] flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-4"
        >
          <img src={ASSETS.logo} alt="Aurelia" className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 object-cover shadow-2xl" />
          <div className="font-serif text-3xl tracking-[0.3em] text-[#D4AF37] font-light">AURELIA</div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-medium">Fine Jewelry Atelier</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-[#0B132B] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#D4AF37]/40 flex items-center space-x-3 text-xs tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Bar */}
      <div className="bg-[#0B132B] text-[#D4AF37] text-[11px] py-2 px-4 text-center tracking-widest uppercase font-light flex items-center justify-center space-x-2 border-b border-[#D4AF37]/20">
        <Sparkles className="w-3 h-3" />
        <span>Complimentary Insured Courier & Vault Delivery Worldwide</span>
        <Sparkles className="w-3 h-3" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 border-b border-[#D4AF37]/15 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={ASSETS.logo} alt="Aurelia Logo" className="w-12 h-12 rounded-full border border-[#D4AF37] p-0.5 object-cover shadow-md" />
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-bold text-[#0B132B] block leading-none">
                AURELIA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37] block mt-1 font-semibold">
                FINE JEWELRY
              </span>
            </div>
          </div>

          {/* Navigation Category Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-gray-700">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href="#catalog"
                onClick={() => setSelectedCategory(cat.name)}
                className={`hover:text-[#D4AF37] transition ${selectedCategory === cat.name ? 'text-[#D4AF37] font-bold border-b border-[#D4AF37] pb-1' : ''}`}
              >
                {cat.name}
              </a>
            ))}
            <a href="#custom-design" className="hover:text-[#D4AF37] transition text-amber-700 font-semibold">Bespoke Order</a>
            <a href="#boutiques" className="hover:text-[#D4AF37] transition">Boutiques</a>
          </nav>

          {/* Search & Utility Triggers */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="hidden sm:flex items-center relative w-48 lg:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search rings, emeralds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100/80 pl-9 pr-3 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] border border-transparent focus:bg-white"
              />
            </div>

            {/* Currency Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-xs font-semibold tracking-wider text-gray-700 hover:text-[#D4AF37]">
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-28 bg-white border border-gray-100 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
                {Object.keys(CURRENCIES).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`block w-full text-left px-4 py-1.5 text-xs ${currency === c ? 'text-[#D4AF37] font-bold bg-amber-50/50' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {c} ({CURRENCIES[c].symbol})
                  </button>
                ))}
              </div>
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#D4AF37] transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(false) || setIsCartOpen(true)}
              className="relative bg-[#0B132B] text-white px-4 py-2.5 rounded-full flex items-center space-x-2.5 shadow-md hover:bg-[#D4AF37] transition duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-medium tracking-wide">
                {formatPrice(cartTotal)}
              </span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      {}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B132B] text-white">
        {/* Background Royal Blue Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBg}
            alt="Aurelia Royal Luxury Background"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 2026 Masterpiece Collection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-tight tracking-wide"
          >
            Timeless Elegance, <br />
            <span className="italic font-normal text-[#D4AF37]">Forged in Pure Gold</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore handcrafted 18K & 24K solid gold rings, diamond tennis bracelets, royal sapphire bangles, and bespoke Colombian emerald pendants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#catalog"
              className="w-full sm:w-auto bg-[#D4AF37] text-gray-900 px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-amber-300 transition shadow-xl"
            >
              Explore Catalog
            </a>
            <a
              href="#custom-design"
              className="w-full sm:w-auto border border-[#D4AF37] text-white px-8 py-4 rounded-full font-semibold text-xs tracking-widest uppercase hover:bg-white/10 transition backdrop-blur-sm"
            >
              Bespoke Custom Studio
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Category Showcase Grid */}
      {}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-light mt-1">
            Shop by Jewelry Category
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href="#catalog"
              onClick={() => setSelectedCategory(cat.name)}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-light">{cat.name}</h3>
                <p className="text-xs text-gray-300 font-light line-clamp-1">{cat.tagline}</p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  <span>Explore 5 Items</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Interactive Catalog Section */}
      {}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-gray-200 mb-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-light">
              High Jewelry Catalog
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Select any piece to view high-res imagery, detailed specifications, or 3D rotation customizer.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-gray-500 font-medium">
            Displaying {filteredProducts.length} Authenticated Pieces
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Rings">Rings (5)</option>
                <option value="Bracelets">Bracelets (5)</option>
                <option value="Bangles">Bangles (5)</option>
                <option value="Necklaces">Necklaces (5)</option>
              </select>
            </div>

            {/* Purity Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">
                Gold Purity
              </label>
              <select
                value={selectedPurity}
                onChange={(e) => setSelectedPurity(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
              >
                <option value="All">All Metal Types</option>
                <option value="18K">18K Gold</option>
                <option value="24K">24K Pure Gold</option>
                <option value="Platinum">Platinum 950</option>
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">
                <span>Max Budget</span>
                <span className="text-[#D4AF37]">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPurity('All');
                  setMaxPrice(10000);
                  setSearchQuery('');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-xs font-medium transition flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Product Image Preview */}
                <div className="relative h-72 bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition ${
                      isWishlisted
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Purity Tag */}
                  <span className="absolute top-4 left-4 bg-black/70 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
                    {product.purity}
                  </span>

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => {
                        setActiveModalProduct(product);
                        setPdpTab('gallery');
                        setModalMetal(product.defaultMetal);
                        setModalGem(product.defaultGem);
                      }}
                      className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#D4AF37] hover:text-white transition flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>{product.category}</span>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="ml-1 text-gray-700 font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-gray-900 group-hover:text-[#D4AF37] transition">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-light mt-1 line-clamp-2">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Price</div>
                      <div className="text-xl font-serif font-bold text-[#0B132B]">
                        {formatPrice(product.priceUSD)}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product, product.defaultMetal, product.defaultGem)}
                      className="bg-[#0B132B] hover:bg-[#D4AF37] text-white p-3 rounded-full shadow transition"
                      aria-label="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Detail Modal (Image, Specifications & 3D Viewer) */}
      {}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-amber-100 my-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full text-gray-500 hover:text-black shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Viewport Side */}
                <div className="lg:col-span-6 bg-gray-50 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200 min-h-[420px]">
                  {/* Tab Controls */}
                  <div className="flex items-center space-x-2 z-10">
                    <button
                      onClick={() => setPdpTab('gallery')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition ${pdpTab === 'gallery' ? 'bg-[#0B132B] text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                    >
                      Photos
                    </button>
                    <button
                      onClick={() => setPdpTab('3d')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition flex items-center space-x-1.5 ${pdpTab === '3d' ? 'bg-[#0B132B] text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>3D Studio</span>
                    </button>
                  </div>

                  {/* Tab 1: High-Res Photo View */}
                  {pdpTab === 'gallery' && (
                    <div className="relative flex-1 w-full flex items-center justify-center my-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                      <img
                        src={activeModalProduct.image}
                        alt={activeModalProduct.name}
                        className="w-full h-80 object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {/* Tab 2: 3D Interactive WebGL Canvas */}
                  {pdpTab === '3d' && (
                    <div className="relative flex-1 w-full flex items-center justify-center my-4">
                      <div className="w-full h-80 relative bg-gradient-to-tr from-gray-900 to-[#0B132B] rounded-2xl border border-gray-800">
                        <div ref={pdp3DRef} className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl" />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-[10px] backdrop-blur-md flex items-center space-x-1.5">
                          <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                          <span>360° Drag & Rotate</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-gray-400 text-center">
                    GIA Authenticated • Vault Delivery • 30-Day Money Back Guarantee
                  </div>
                </div>

                {/* Details & Specs Side */}
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                        {activeModalProduct.purity} • {activeModalProduct.category}
                      </span>
                      <h2 className="font-serif text-2xl font-normal text-[#0B132B] mt-1">
                        {activeModalProduct.name}
                      </h2>
                      <div className="text-2xl font-serif font-bold text-[#0B132B] mt-2">
                        {formatPrice(activeModalProduct.priceUSD)}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {activeModalProduct.description}
                    </p>

                    {/* Customizer options inside Modal */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                          Metal Choice
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'gold', label: '18K Yellow', bg: 'bg-[#D4AF37]' },
                            { id: 'rosegold', label: 'Rose Gold', bg: 'bg-[#E8A798]' },
                            { id: 'whitegold', label: 'White Gold', bg: 'bg-[#E5E8EC]' },
                            { id: 'platinum', label: 'Platinum', bg: 'bg-[#C0C0C0]' }
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => setModalMetal(m.id)}
                              className={`p-2 rounded-xl text-[10px] font-semibold border text-center flex flex-col items-center space-y-1 transition ${modalMetal === m.id ? 'border-[#D4AF37] bg-amber-50/50' : 'border-gray-200'}`}
                            >
                              <span className={`w-3.5 h-3.5 rounded-full ${m.bg} shadow-inner`} />
                              <span className="truncate w-full">{m.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                          Gemstone Cut
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {['diamond', 'sapphire', 'emerald', 'ruby'].map((g) => (
                            <button
                              key={g}
                              onClick={() => setModalGem(g)}
                              className={`p-2 rounded-xl text-[10px] font-semibold border capitalize transition ${modalGem === g ? 'border-[#D4AF37] bg-amber-50/50 font-bold' : 'border-gray-200'}`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs border border-gray-100">
                      {activeModalProduct.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-gray-700">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="pt-6 border-t border-gray-100 mt-6">
                    <button
                      onClick={() => {
                        addToCart(activeModalProduct, modalMetal, modalGem, modalRingSize);
                        setActiveModalProduct(null);
                      }}
                      className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-xl transition flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Item to Shopping Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Bespoke Design Form Section */}
      {}
      <section id="custom-design" className="bg-[#0B132B] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Atelier Service
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight">
                Create a Unique <br />
                <span className="italic text-[#D4AF37]">Bespoke Heirloom</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Have a specific jewelry design in mind or an image reference? Upload or link your inspiration image and our master goldsmiths will bring it to life.
              </p>
              <div className="space-y-4 pt-2 text-xs text-gray-300">
                <div className="flex items-center space-x-3">
                  <CertificateIcon className="w-5 h-5 text-[#D4AF37]" />
                  <span>Custom CAD Render Preview Provided Within 24 Hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  <span>Direct Consultation with Master Goldsmiths</span>
                </div>
              </div>
            </div>

            {/* Custom Form Box */}
            <div className="lg:col-span-7 bg-white text-gray-900 p-8 rounded-3xl shadow-2xl border border-[#D4AF37]/30">
              {customSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-2xl font-normal text-[#0B132B]">
                    Bespoke Request Submitted
                  </h3>
                  <p className="text-gray-600 text-xs max-w-md mx-auto">
                    Thank you, {customForm.name}. Our master jeweler will review your image reference and specifications and contact you at {customForm.email}.
                  </p>
                  <button
                    onClick={() => setCustomSubmitted(false)}
                    className="bg-[#0B132B] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCustomSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1 font-bold">Full Name</label>
                      <input
                        type="text"
                        required
                        value={customForm.name}
                        onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                        placeholder="Lady Vance"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customForm.email}
                        onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                        placeholder="eleanor@luxury.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1 font-bold">Category</label>
                      <select
                        value={customForm.category}
                        onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      >
                        <option>Rings</option>
                        <option>Bracelets</option>
                        <option>Bangles</option>
                        <option>Necklaces</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-bold">Preferred Metal</label>
                      <select
                        value={customForm.metal}
                        onChange={(e) => setCustomForm({ ...customForm, metal: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      >
                        <option>18K Yellow Gold</option>
                        <option>18K Rose Gold</option>
                        <option>18K White Gold</option>
                        <option>24K Pure Gold</option>
                        <option>Platinum 950</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-bold">Budget Range</label>
                      <select
                        value={customForm.budget}
                        onChange={(e) => setCustomForm({ ...customForm, budget: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      >
                        <option>$3,000 - $5,000</option>
                        <option>$5,000 - $10,000</option>
                        <option>$10,000 - $25,000</option>
                        <option>$25,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Reference URL */}
                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Inspiration Image URL Reference</label>
                    <div className="flex space-x-2">
                      <input
                        type="url"
                        value={customForm.imageUrl}
                        onChange={(e) => setCustomForm({ ...customForm, imageUrl: e.target.value })}
                        placeholder="https://example.com/ring-design.jpg"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1 font-bold">Design Specifications & Notes</label>
                    <textarea
                      rows="3"
                      value={customForm.notes}
                      onChange={(e) => setCustomForm({ ...customForm, notes: e.target.value })}
                      placeholder="Describe gemstones, engravings, finger sizes, or custom modifications..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-1 focus:ring-[#D4AF37] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition"
                  >
                    Submit Custom Order Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Boutiques Section */}
      {}
      <section id="boutiques" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Locations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-light mt-1">
            Our Flagship Boutiques
          </h2>
          <p className="text-gray-500 text-xs mt-2">
            Schedule a private VIP viewing salon appointment in any of our global cities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOUTIQUES.map((b, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition">
              <img src={b.image} alt={b.name} className="w-full h-44 object-cover" />
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{b.city}</span>
                <h3 className="font-serif text-lg font-medium text-gray-900">{b.name}</h3>
                <p className="text-xs text-gray-500 flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>
                <p className="text-xs text-gray-500 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{b.phone}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees & Policy Badges */}
      {}
      <section className="bg-amber-50/60 border-y border-amber-200/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#D4AF37] border border-amber-100">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-gray-900">30-Day Refunds</h4>
              <p className="text-xs text-gray-500">Complimentary global returns</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#D4AF37] border border-amber-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-gray-900">Lifetime Warranty</h4>
              <p className="text-xs text-gray-500">Free cleaning & prong checks</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#D4AF37] border border-amber-100">
              <CertificateIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-gray-900">Certified Pure Gold</h4>
              <p className="text-xs text-gray-500">GIA & IGI diamond papers</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#D4AF37] border border-amber-100">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-gray-900">Insured Vault Shipping</h4>
              <p className="text-xs text-gray-500">Fully covered transit protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Concierge</span>
          <h2 className="font-serif text-3xl font-light text-[#0B132B] mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#0B132B] flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-amber-50/30">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <h2 className="font-serif text-xl font-medium text-gray-900">Your Shopping Bag</h2>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-serif text-lg text-gray-600">Your bag is empty</p>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={idx} className="flex space-x-4 border-b border-gray-100 pb-4">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-xs font-semibold">
                              <h3 className="font-serif text-gray-900">{item.product.name}</h3>
                              <span>{formatPrice(item.product.priceUSD * item.quantity)}</span>
                            </div>
                            <div className="text-[10px] text-gray-500 mt-0.5 capitalize">
                              Metal: {item.metal} • Gem: {item.gem}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200 rounded-full px-2 py-0.5">
                              <button onClick={() => updateQuantity(idx, -1)} className="px-1.5 text-xs text-gray-500">-</button>
                              <span className="text-xs px-2">{item.quantity}</span>
                              <button onClick={() => updateQuantity(idx, 1)} className="px-1.5 text-xs text-gray-500">+</button>
                            </div>
                            <button onClick={() => updateQuantity(idx, -item.quantity)} className="text-xs text-red-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-lg">
                    <div className="flex justify-between text-base font-serif font-bold text-gray-900">
                      <span>Total Due</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-4 rounded-full text-xs font-semibold uppercase tracking-widest shadow-xl transition"
                    >
                      Proceed to Insured Checkout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wishlist Drawer Modal */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-amber-100"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#D4AF37] fill-current" />
                  <h2 className="font-serif text-xl font-medium text-gray-900">Saved Vault Items</h2>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="p-2 text-gray-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 max-h-96 overflow-y-auto space-y-4">
                {wishlist.length === 0 ? (
                  <p className="text-center text-gray-400 text-xs py-10">No items saved yet.</p>
                ) : (
                  PRODUCTS.filter((p) => wishlist.includes(p.id)).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                        <div>
                          <h4 className="font-serif text-sm font-medium text-gray-900">{product.name}</h4>
                          <span className="text-xs text-gray-500">{formatPrice(product.priceUSD)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            toggleWishlist(product.id);
                          }}
                          className="bg-[#0B132B] hover:bg-[#D4AF37] text-white px-3 py-1.5 rounded-full text-xs transition"
                        >
                          Move to Bag
                        </button>
                        <button onClick={() => toggleWishlist(product.id)} className="p-1.5 text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Multi-Step Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-amber-100 my-8"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                  <span className="font-serif text-2xl font-light text-[#0B132B]">
                    Aurelia Vault Checkout
                  </span>
                </div>
                {checkoutStep < 4 && (
                  <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-black">
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 my-6 text-center text-xs font-bold uppercase tracking-wider">
                {['Shipping', '2FA OTP', 'Payment', 'Confirmation'].map((name, idx) => (
                  <div
                    key={idx}
                    className={`py-2 rounded-xl border ${checkoutStep === idx + 1 ? 'border-[#D4AF37] bg-amber-50 text-[#D4AF37]' : 'border-gray-200 text-gray-400'}`}
                  >
                    {idx + 1}. {name}
                  </div>
                ))}
              </div>

              {/* STEP 1: Shipping */}
              {checkoutStep === 1 && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-serif text-lg font-medium text-gray-900">Delivery Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      placeholder="First Name"
                      className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                    />
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      placeholder="Last Name"
                      className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                    />
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      placeholder="Email"
                      className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                    />
                    <input
                      type="text"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="Phone Number for OTP"
                      className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition mt-4"
                  >
                    Proceed to 2FA Security Step
                  </button>
                </div>
              )}

              {/* STEP 2: OTP Verification */}
              {checkoutStep === 2 && (
                <div className="space-y-6 text-center py-4">
                  <Smartphone className="w-10 h-10 text-[#D4AF37] mx-auto" />
                  <h3 className="font-serif text-xl font-medium">Verify Identity OTP</h3>
                  <p className="text-xs text-gray-500">Security code sent to {shippingInfo.phone}</p>
                  <div className="flex justify-center space-x-2">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => {
                          const copy = [...otpCode];
                          copy[idx] = e.target.value;
                          setOtpCode(copy);
                        }}
                        className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border-2 border-[#D4AF37] rounded-xl"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition"
                  >
                    Verify Code & Pay
                  </button>
                </div>
              )}

              {/* STEP 3: Payment */}
              {checkoutStep === 3 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-lg font-medium">Encrypted Payment Authorization</h3>
                  <div className="bg-[#0B132B] text-white p-6 rounded-2xl space-y-4 border border-[#D4AF37]/30">
                    <div className="flex justify-between text-xs text-[#D4AF37]">
                      <span>AURELIA BLACK CARD</span>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="font-mono text-base tracking-widest">4242 •••• •••• 4242</div>
                    <div className="flex justify-between text-[11px] text-gray-300">
                      <span>{shippingInfo.firstName.toUpperCase()} {shippingInfo.lastName.toUpperCase()}</span>
                      <span>EXP: 08/28</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutStep(4);
                      setCart([]);
                    }}
                    className="w-full bg-[#0B132B] hover:bg-[#D4AF37] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition"
                  >
                    Confirm Order Payment ({formatPrice(cartTotal)})
                  </button>
                </div>
              )}

              {/* STEP 4: Success */}
              {checkoutStep === 4 && (
                <div className="space-y-6 text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-2xl font-normal text-gray-900">Order Confirmed</h3>
                  <p className="text-xs text-gray-500">Order Reference: #AUR-2026-98142</p>
                  <div className="flex justify-center space-x-3">
                    <button onClick={() => window.print()} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full text-xs font-semibold uppercase flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Print PDF Invoice</span>
                    </button>
                    <button onClick={() => setIsCheckoutOpen(false)} className="bg-[#0B132B] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#0B132B] text-white pt-16 pb-12 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={ASSETS.logo} alt="Aurelia Logo" className="w-10 h-10 rounded-full border border-[#D4AF37] p-0.5 object-cover" />
              <span className="font-serif text-xl tracking-[0.2em] text-[#D4AF37]">AURELIA</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Crafting fine jewelry through sustainable gold sourcing, rare certified gemstones, and interactive digital craftsmanship.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li>Crown Solitaire Rings</li>
              <li>Diamond Tennis Bracelets</li>
              <li>Solid 24K Gold Bangles</li>
              <li>Regal Sapphire Pendants</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Concierge Services</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li>Bespoke Custom Orders</li>
              <li>GIA Certification Verification</li>
              <li>Insured Vault Delivery</li>
              <li>Lifetime Warranty Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Private Newsletter</h4>
            <p className="text-xs text-gray-400 mb-3">Subscribe for invitations to seasonal gemstone releases.</p>
            <div className="flex">
              <input type="email" placeholder="Enter email address" className="bg-white/10 border border-white/20 rounded-l-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none w-full" />
              <button className="bg-[#D4AF37] text-gray-900 font-semibold px-4 rounded-r-xl text-xs hover:bg-amber-300 transition">Join</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 text-center text-[11px] text-gray-500">
          © 2026 AURELIA Fine Jewelry Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, ChevronRight, Star, ShieldCheck, 
  RotateCcw, MapPin, Plus, Minus, Check, ArrowRight, Download, Upload, 
  Sparkles, RefreshCw, Eye, Truck, Clock, Award, Phone, Mail
} from 'lucide-react';
import * as THREE from 'three';

const PRODUCTS_DATA = {
  rings: [
    { id: 'r1', name: 'Aura Celestial Diamond Solitaire Ring', category: 'rings', price: 2850, image: 'https://i.pinimg.com/736x/c9/2e/61/c92e61dba4065bb69e1fee5308ba70bd.jpg', rating: 4.9, reviews: 34, purity: '18K Gold', description: 'Handcrafted solid 18K yellow gold band encrusted with brilliant hand-cut diamonds.' },
    { id: 'r2', name: 'Royal Crown Pavé Diamond Ring', category: 'rings', price: 3400, image: 'https://i.pinimg.com/736x/4f/f9/07/4ff907e0a5b6676f0263ffcd97be9c80.jpg', rating: 5.0, reviews: 28, purity: '24K Gold', description: 'Intricate pavé arrangement capturing shimmering light from every angle.' },
    { id: 'r3', name: 'Elegance Oval Cut Emerald Ring', category: 'rings', price: 4200, image: 'https://i.pinimg.com/736x/2b/98/d1/2b98d1f5d9520eead413d5af8eb6aa23.jpg', rating: 4.8, reviews: 19, purity: 'Platinum', description: 'Rare oval-cut emerald flanked by dual tapered baguette luxury diamonds.' },
    { id: 'r4', name: 'Eternal Flame Rose Gold Band', category: 'rings', price: 1950, image: 'https://i.pinimg.com/736x/c5/ed/d6/c5edd6a98bca31893ddf2466f0aa614b.jpg', rating: 4.9, reviews: 42, purity: '18K Gold', description: 'Seamless eternity band featuring hand-picked micro-diamonds.' },
    { id: 'r5', name: 'Imperial Double Halo Gold Ring', category: 'rings', price: 3900, image: 'https://i.pinimg.com/736x/92/5c/d2/925cd2cd54a8221ae54c93bb699c2a63.jpg', rating: 5.0, reviews: 15, purity: '24K Gold', description: 'Double halo construction offering magnificent stature and timeless splendor.' }
  ],
  bracelets: [
    { id: 'b1', name: 'Aura Tennis Diamond Chain Bracelet', category: 'bracelets', price: 4500, image: 'https://i.pinimg.com/736x/14/42/23/144223df43327b002acd5cd21b816622.jpg', rating: 4.9, reviews: 51, purity: '18K Gold', description: 'Classic flexible diamond tennis chain crafted in ultra-pure white gold.' },
    { id: 'b2', name: 'Majestic Interlocking Gold Link', category: 'bracelets', price: 3100, image: 'https://i.pinimg.com/736x/26/54/dd/2654dd7a63617d16e226a12d189867be.jpg', rating: 4.8, reviews: 22, purity: '24K Gold', description: 'Heavy handcrafted solid gold links polished to an exceptional liquid mirror shine.' },
    { id: 'b3', name: 'Sovereign Diamond Cuff Bracelet', category: 'bracelets', price: 5800, image: 'https://i.pinimg.com/736x/47/21/b1/4721b131665c837bfccaf8c8e1f9959d.jpg', rating: 5.0, reviews: 14, purity: 'Platinum', description: 'Sleek architectural cuff highlighted by custom bezel-set baguette diamonds.' },
    { id: 'b4', name: 'Velvet Ribbon Diamond Wristlet', category: 'bracelets', price: 2750, image: 'https://i.pinimg.com/736x/6f/8b/30/6f8b30c1968fea782fbe85832639663f.jpg', rating: 4.7, reviews: 33, purity: '18K Gold', description: 'Delicate supple design contoured for perfect daily comfort and subtle radiance.' },
    { id: 'b5', name: 'Cascade Gold Drop Charm Bracelet', category: 'bracelets', price: 3600, image: 'https://i.pinimg.com/736x/39/f1/36/39f136cc104ca6c8ba729bdc270d73ba.jpg', rating: 4.9, reviews: 18, purity: '18K Gold', description: 'Charming gold drops suspended along a finely woven gold chain bracelet.' }
  ],
  bangles: [
    { id: 'bg1', name: 'Aura Heirloom Stacking Gold Bangle', category: 'bangles', price: 3200, image: 'https://i.pinimg.com/1200x/f3/a4/40/f3a440fa4f2ab47adc07a78c7ea49c34.jpg', rating: 5.0, reviews: 60, purity: '24K Gold', description: 'Traditional solid gold bangle with fine hand-engraved filigree detailing.' },
    { id: 'bg2', name: 'Royal Filigree Diamond Carved Bangle', category: 'bangles', price: 4900, image: 'https://i.pinimg.com/736x/35/45/1a/35451af023c3c0c8935808a6a9de3005.jpg', rating: 4.9, reviews: 27, purity: '18K Gold', description: 'Structural artwork in gold enriched with brilliant pavé diamond inserts.' },
    { id: 'bg3', name: 'Solstice Twisted Gold & Diamond Bangle', category: 'bangles', price: 2900, image: 'https://i.pinimg.com/736x/c7/61/a9/c761a91e40a2b46f3a5f694f9fb98680.jpg', rating: 4.8, reviews: 41, purity: '18K Gold', description: 'Intertwined golden strands representing eternal luxury and harmony.' },
    { id: 'bg4', name: 'Empress Diamond Inlaid Heavy Bangle', category: 'bangles', price: 6200, image: 'https://i.pinimg.com/736x/e8/f9/c2/e8f9c298b248f36ab779774b23092b94.jpg', rating: 5.0, reviews: 11, purity: '24K Gold', description: 'Substantial high-carat gold density featuring geometric diamond clusters.' },
    { id: 'bg5', name: 'Gilded Silhouette Hinged Bangle', category: 'bangles', price: 3850, image: 'https://img.staticdj.com/e1f33173958096f6ebf2428209643dae_1024x.jpeg', rating: 4.9, reviews: 29, purity: '18K Gold', description: 'Ergonomic safety clasp bangle with precision polished bevel edges.' }
  ],
  necklaces: [
    { id: 'n1', name: 'Aura Radiant Diamond Cascade Necklace', category: 'necklaces', price: 8500, image: 'https://i.pinimg.com/736x/6f/e0/3c/6fe03ced13af3b44ed09b68ff137c988.jpg', rating: 5.0, reviews: 48, purity: '18K Gold', description: 'Breathtaking diamond necklace designed to rest softly along the collarbone.' },
    { id: 'n2', name: 'Sovereign Emerald & Diamond Choker', category: 'necklaces', price: 12400, image: 'https://i.pinimg.com/1200x/1f/e9/38/1fe938b617631dd945f937b52f7e2846.jpg', rating: 5.0, reviews: 16, purity: 'Platinum', description: 'High-jewelry masterpiece showcasing vibrant emeralds surrounded by cut diamonds.' },
    { id: 'n3', name: 'Opulent Gold Layered Drop Necklace', category: 'necklaces', price: 5100, image: 'https://i.pinimg.com/736x/14/ac/c9/14acc95878526e4f27a8ec06ecb79109.jpg', rating: 4.8, reviews: 37, purity: '24K Gold', description: 'Multi-strand cascading gold links culminating in a glowing teardrop pendant.' },
    { id: 'n4', name: 'Celestial Solitaire Diamond Pendant', category: 'necklaces', price: 3100, image: 'https://i.pinimg.com/736x/65/a3/ac/65a3ac69af43dbf66393458cbce21b98.jpg', rating: 4.9, reviews: 62, purity: '18K Gold', description: 'Understated elegance featuring a flawless 2-carat diamond on an ethereal gold chain.' },
    { id: 'n5', name: 'Imperial Royalty Statement Necklace', category: 'necklaces', price: 15800, image: 'https://i.pinimg.com/736x/f0/35/bd/f035bd6a23906439035e57cf214e7485.jpg', rating: 5.0, reviews: 8, purity: '24K Gold', description: 'Curated museum-grade artisan gold sculpture with brilliant halo motifs.' }
  ]
};

const CATEGORIES = [
  { id: 'rings', name: 'Rings', thumbnail: 'https://i.pinimg.com/736x/44/c6/37/44c63711f39838de65c7835f07e5a5c0.jpg', count: '5 Exclusive Designs' },
  { id: 'bracelets', name: 'Bracelets', thumbnail: 'https://i.pinimg.com/736x/14/42/23/144223df43327b002acd5cd21b816622.jpg', count: '5 Exclusive Designs' },
  { id: 'bangles', name: 'Bangles', thumbnail: 'https://i.pinimg.com/1200x/f3/a4/40/f3a440fa4f2ab47adc07a78c7ea49c34.jpg', count: '5 Exclusive Designs' },
  { id: 'necklaces', name: 'Necklaces', thumbnail: 'https://i.pinimg.com/736x/f0/35/bd/f035bd6a23906439035e57cf214e7485.jpg', count: '5 Exclusive Designs' }
];

const BRAND_LOGO = 'https://i.pinimg.com/736x/52/1a/b7/521ab767a302213c930adcc6e456af63.jpg';
const HERO_IMAGE = 'https://i.pinimg.com/736x/9a/c9/c3/9ac9c3874cfa39b0f56614279f06348d.jpg';

const Interactive3DRing = ({ metalType = 'gold', speed = 0.008 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup for gold metallic depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4af37, 1.8);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Material properties based on selected metal
    let goldColor = 0xD4AF37;
    if (metalType === 'rosegold') goldColor = 0xE8A798;
    if (metalType === 'platinum') goldColor = 0xE5E4E2;
    if (metalType === '24k') goldColor = 0xFFD700;

    const ringGroup = new THREE.Group();

    // Torus Ring Geometry
    const ringGeo = new THREE.TorusGeometry(1.5, 0.28, 32, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: goldColor,
      metalness: 0.95,
      roughness: 0.1,
      envMapIntensity: 1.5
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringGroup.add(ringMesh);

    // Gemstone setting on top
    const gemGeo = new THREE.OctahedronGeometry(0.55, 2);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0,
      ior: 2.4,
      reflectivity: 0.9,
      clearcoat: 1
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 1.65, 0);
    ringGroup.add(gemMesh);

    scene.add(ringGroup);

    // Rotation controls state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      ringGroup.rotation.y += deltaMove.x * 0.01;
      ringGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    const domContainer = mountRef.current;
    domContainer.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile responsiveness
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      ringGroup.rotation.y += deltaMove.x * 0.01;
      ringGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    domContainer.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        ringGroup.rotation.y += speed;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (domContainer) {
        domContainer.removeEventListener('mousedown', handleMouseDown);
        domContainer.removeEventListener('touchstart', handleTouchStart);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [metalType, speed]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default function App() {
  // Navigation & Screen States
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = Landing Category View, 'rings' | 'bracelets' etc.
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'catalog', 'custom', 'about', 'branches', 'faq'
  
  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pdpTab, setPdpTab] = useState('2d'); // '2d' or '3d'
  const [pdpMetal, setPdpMetal] = useState('gold');
  const [pdpZoom, setPdpZoom] = useState(1);
  
  // Customization Upload State
  const [customFile, setCustomFile] = useState(null);
  const [customPreview, setCustomPreview] = useState(null);
  const [customNote, setCustomNote] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  // E-Commerce Cart & Wishlist State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Checkout Flow Modal States
  const [checkoutStep, setCheckoutStep] = useState(null); // null, 1 (Form), 2 (OTP), 3 (Success)
  const [checkoutData, setCheckoutData] = useState({
    name: '', email: '', phone: '', address: '', city: 'Dubai', paymentMethod: 'card'
  });
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // FAQ Accordion Toggle state
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 12;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, metal: pdpMetal }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  };

  // Custom Design Image Handler
  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomFile(file);
      setCustomPreview(URL.createObjectURL(file));
    }
  };

  // Form & Checkout validation helpers
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 150;
  const grandTotal = cartSubtotal + shippingFee;

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setCheckoutStep(1);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.email || !checkoutData.phone) {
      alert("Please fill in all recipient details.");
      return;
    }
    setOtpSent(true);
    setCheckoutStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const orderObj = {
      orderId: 'AURA-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total: grandTotal,
      customer: { ...checkoutData },
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setPlacedOrder(orderObj);
    setCart([]);
    setCheckoutStep(3);
  };

  // Download Simulated PDF Invoice
  const handleDownloadInvoice = () => {
    if (!placedOrder) return;
    const content = `=================================================\n          AURA LUXURY JEWELRY - INVOICE          \n=================================================\nOrder ID: ${placedOrder.orderId}\nDate: ${placedOrder.date}\nCustomer: ${placedOrder.customer.name}\nEmail: ${placedOrder.customer.email}\nPhone: ${placedOrder.customer.phone}\nAddress: ${placedOrder.customer.address}, ${placedOrder.customer.city}\n\nITEMS:\n${placedOrder.items.map(i => `- ${i.name} (${i.qty}x) : $${i.price * i.qty}`).join('\n')}\n\nSubtotal: $${cartSubtotal}\nShipping: Complimentary VIP Delivery\nTOTAL PAID: $${placedOrder.total}\n=================================================\nThank you for choosing Aura Luxury Jewelry.`;
    
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `AURA_INVOICE_${placedOrder.orderId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Filter products across all categories for catalog view search
  const allProductsArray = [
    ...PRODUCTS_DATA.rings,
    ...PRODUCTS_DATA.bracelets,
    ...PRODUCTS_DATA.bangles,
    ...PRODUCTS_DATA.necklaces
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1A1A1A] text-white flex flex-col items-center justify-center z-50 transition-opacity duration-700">
        <div className="relative mb-6">
          <img src={BRAND_LOGO} alt="Aura Logo" className="w-28 h-28 rounded-full border-2 border-[#D4AF37] object-cover shadow-2xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 animate-ping" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif tracking-[0.3em] text-[#D4AF37] mb-2 uppercase">AURA</h1>
        <p className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-8 font-light">Fine High Jewelry</p>
        
        {/* Animated Gold Progress Line */}
        <div className="w-64 h-[2px] bg-stone-800 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E6C687] to-[#D4AF37] transition-all duration-300" 
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="mt-3 text-xs tracking-widest text-stone-500 font-mono">{loadProgress}%</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-white flex flex-col">
      
      {}
      <div className="bg-[#1A1A1A] text-[#D4AF37] py-2 px-4 text-center text-xs tracking-[0.2em] uppercase font-light border-b border-[#D4AF37]/20 flex justify-between items-center px-8">
        <span className="hidden md:inline text-stone-400">Complimentary Worldwide Armored Delivery</span>
        <span className="mx-auto md:mx-0">✨ Exclusive Atelier Collection 2026 Live</span>
        <span className="hidden md:inline text-stone-400">Concierge: +971 4 800 AURA</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Left Menu Toggle & Brand Icon */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-stone-800 hover:text-[#D4AF37] transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('home'); setSelectedCategory(null); }}
              className="flex items-center space-x-3 group"
            >
              <img src={BRAND_LOGO} alt="Aura Logo" className="w-11 h-11 rounded-full border border-[#D4AF37] object-cover group-hover:scale-105 transition" />
              <div>
                <span className="text-2xl font-serif tracking-[0.2em] font-semibold text-stone-900 block leading-none">AURA</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">Haute Joaillerie</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.18em] font-medium uppercase text-stone-700">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} 
              className={`hover:text-[#D4AF37] transition py-1 relative ${activeTab === 'home' && !selectedCategory ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]' : ''}`}
            >
              Categories
            </button>
            <button 
              onClick={() => { setActiveTab('catalog'); setSelectedCategory('rings'); }} 
              className={`hover:text-[#D4AF37] transition py-1 relative ${activeTab === 'catalog' ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]' : ''}`}
            >
              All Jewelry
            </button>
            <button 
              onClick={() => { setActiveTab('custom'); }} 
              className={`hover:text-[#D4AF37] transition py-1 flex items-center space-x-1 ${activeTab === 'custom' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span>Bespoke Design</span>
            </button>
            <button 
              onClick={() => { setActiveTab('about'); }} 
              className={`hover:text-[#D4AF37] transition py-1 ${activeTab === 'about' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Craftsmanship
            </button>
            <button 
              onClick={() => { setActiveTab('branches'); }} 
              className={`hover:text-[#D4AF37] transition py-1 ${activeTab === 'branches' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Boutiques
            </button>
            <button 
              onClick={() => { setActiveTab('faq'); }} 
              className={`hover:text-[#D4AF37] transition py-1 ${activeTab === 'faq' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-stone-700 hover:text-[#D4AF37] transition p-2"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-stone-900 text-white p-2.5 rounded-full hover:bg-[#D4AF37] transition shadow-md group"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] border-2 border-white text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left">
            <div>
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div className="flex items-center space-x-3">
                  <img src={BRAND_LOGO} alt="Aura Logo" className="w-10 h-10 rounded-full border border-[#D4AF37]" />
                  <span className="font-serif tracking-widest text-lg font-bold">AURA</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-stone-500 hover:text-stone-900">
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col space-y-5 text-sm uppercase tracking-widest font-medium">
                <button 
                  onClick={() => { setActiveTab('home'); setSelectedCategory(null); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37]"
                >
                  Categories Home
                </button>
                <button 
                  onClick={() => { setActiveTab('catalog'); setSelectedCategory('rings'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37]"
                >
                  Catalog Collections
                </button>
                <button 
                  onClick={() => { setActiveTab('custom'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37] flex items-center justify-between"
                >
                  <span>Bespoke Design</span>
                  <Sparkles size={16} className="text-[#D4AF37]" />
                </button>
                <button 
                  onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37]"
                >
                  About Craftsmanship
                </button>
                <button 
                  onClick={() => { setActiveTab('branches'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37]"
                >
                  Boutique Showrooms
                </button>
                <button 
                  onClick={() => { setActiveTab('faq'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 border-b border-stone-100 hover:text-[#D4AF37]"
                >
                  FAQ & Service
                </button>
              </div>
            </div>

            <div className="border-t pt-6 text-xs text-stone-500 space-y-2">
              <p className="flex items-center space-x-2"><Phone size={14} /> <span>+971 4 800 AURA</span></p>
              <p className="flex items-center space-x-2"><Mail size={14} /> <span>concierge@aurajewelry.com</span></p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Body Dynamic Rendering Section */}
      <main className="flex-1">

        {}
        {activeTab === 'home' && !selectedCategory && (
          <div>
            <section className="relative bg-gradient-to-b from-stone-100 via-white to-stone-50 border-b border-stone-200 overflow-hidden py-12 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column Text & CTA */}
                <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full">
                    <Sparkles size={14} className="text-[#D4AF37]" />
                    <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                      The 2026 Haute Atelier
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.15] font-normal">
                    Timeless Gold & <br />
                    <span className="italic font-light text-[#D4AF37]">Exquisite Radiance</span>
                  </h1>

                  <p className="text-stone-600 font-light text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Sculpted by master jewelers with 24K gold and certified ethically-sourced diamonds. Discover an unmatched standard of luxury craftsmanship.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <button 
                      onClick={() => { setActiveTab('catalog'); setSelectedCategory('rings'); }}
                      className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white hover:bg-[#D4AF37] transition duration-300 rounded-none uppercase text-xs tracking-[0.25em] font-medium shadow-xl flex items-center justify-center space-x-3 group"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('custom')}
                      className="w-full sm:w-auto px-8 py-4 border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white transition duration-300 uppercase text-xs tracking-[0.25em] font-medium"
                    >
                      Custom Order
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-8 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-center lg:text-left">
                    <div>
                      <span className="block font-serif text-xl font-semibold text-stone-900">100%</span>
                      <span className="text-[10px] uppercase text-stone-500 tracking-wider">Certified Gold</span>
                    </div>
                    <div>
                      <span className="block font-serif text-xl font-semibold text-stone-900">GIA</span>
                      <span className="text-[10px] uppercase text-stone-500 tracking-wider">Verified Diamonds</span>
                    </div>
                    <div>
                      <span className="block font-serif text-xl font-semibold text-stone-900">Lifetime</span>
                      <span className="text-[10px] uppercase text-stone-500 tracking-wider">Craft Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Right Column Image Container + 3D Interactive Overlay */}
                <div className="lg:col-span-6 relative flex justify-center items-center">
                  <div className="relative w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                    <img 
                      src={HERO_IMAGE} 
                      alt="Aura Luxury Hero Jewellery" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Floating Interactive 3D Canvas Box */}
                    <div className="absolute bottom-6 right-6 w-44 h-44 sm:w-52 sm:h-52 bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-2xl overflow-hidden p-2 flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold mb-1">
                        Interactive 3D Preview (Drag)
                      </span>
                      <div className="w-full flex-1">
                        <Interactive3DRing metalType="gold" speed={0.005} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">Curated Collections</span>
                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-normal">Select A Fine Jewelry Category</h2>
                <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setActiveTab('catalog'); }}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200/80 flex flex-col transform hover:-translate-y-2"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img 
                        src={cat.thumbnail} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />
                      
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="text-[10px] uppercase tracking-widest text-[#E6C687] block mb-1 font-mono">
                          {cat.count}
                        </span>
                        <h3 className="text-2xl font-serif tracking-wide mb-2">{cat.name}</h3>
                        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-stone-200 group-hover:text-[#D4AF37] transition">
                          <span>View Designs</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {}
        {(activeTab === 'catalog' || selectedCategory) && (
          <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-12 border-b border-stone-200 pb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-stone-900 text-white shadow-lg'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Section Header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 capitalize">
                  {selectedCategory ? `${selectedCategory} Collection` : 'All Fine Jewelry'}
                </h2>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                  Showing {PRODUCTS_DATA[selectedCategory || 'rings']?.length || 0} handcrafted pieces
                </p>
              </div>
            </div>

            {/* 5 Product Cards per Selected Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {(PRODUCTS_DATA[selectedCategory || 'rings'] || []).map((product) => {
                const isWished = wishlist.some((w) => w.id === product.id);
                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="relative aspect-square overflow-hidden bg-stone-50">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      
                      {/* Wishlist Icon Button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                          isWished ? 'bg-[#D4AF37] text-white' : 'bg-white/80 text-stone-700 hover:text-[#D4AF37]'
                        }`}
                      >
                        <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
                      </button>

                      {/* Quick Inspect Hover Overlay */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => { setSelectedProduct(product); setPdpTab('2d'); }}
                          className="w-full py-2.5 bg-stone-900/90 text-white backdrop-blur-md text-[11px] uppercase tracking-widest font-medium rounded hover:bg-[#D4AF37] transition flex items-center justify-center space-x-2"
                        >
                          <Eye size={14} />
                          <span>Inspect & 3D</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] uppercase text-stone-400 font-mono mb-1">
                          <span>{product.purity}</span>
                          <span className="flex items-center text-[#D4AF37]">
                            <Star size={12} fill="currentColor" className="mr-0.5" />
                            {product.rating}
                          </span>
                        </div>

                        <h3 
                          onClick={() => { setSelectedProduct(product); setPdpTab('2d'); }}
                          className="font-serif text-sm text-stone-900 font-medium line-clamp-1 hover:text-[#D4AF37] cursor-pointer transition mb-2"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-base font-serif font-bold text-stone-900">
                          ${product.price.toLocaleString()}
                        </span>
                        
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2 text-stone-800 hover:text-[#D4AF37] hover:bg-stone-50 rounded-full transition"
                          title="Add to Cart"
                        >
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {}
        {activeTab === 'custom' && (
          <section className="py-16 max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">Bespoke Atelier</span>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-normal">Custom Jewelry Studio</h2>
              <p className="text-stone-600 text-sm mt-3 font-light">
                Upload your hand sketch or reference photo from your device. Our master goldsmiths will convert your design into a 3D CAD render and physical heirloom piece.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xl">
              {customSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900">Design Submission Received</h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Our lead jewelry architect is reviewing your uploaded specifications. You will receive an official CAD estimate within 24 hours.
                  </p>
                  <button
                    onClick={() => { setCustomSubmitted(false); setCustomPreview(null); setCustomNote(''); }}
                    className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium rounded"
                  >
                    Submit Another Design
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* File Drag and Drop Box */}
                  <div className="lg:col-span-6 flex flex-col">
                    <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                      Upload Design Image File
                    </label>
                    <div className="flex-1 border-2 border-dashed border-stone-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-stone-50 hover:bg-stone-100/50 transition cursor-pointer relative min-h-[260px]">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleCustomImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {customPreview ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                          <img src={customPreview} alt="Uploaded Custom Design" className="max-h-48 rounded shadow object-contain mb-2" />
                          <span className="text-xs text-[#D4AF37] font-medium flex items-center space-x-1">
                            <Check size={14} /> <span>Image Loaded Successfully</span>
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#D4AF37] shadow">
                            <Upload size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-stone-800">Click to upload from device</p>
                            <p className="text-xs text-stone-400 mt-1">Supports PNG, JPG, WEBP up to 20MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Design Requirements Inputs */}
                  <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                        Metal & Gemstone Notes
                      </label>
                      <textarea
                        rows={6}
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        placeholder="Specify metal preference (18K Gold, Platinum), diamond clarity, ring size, or custom engravings..."
                        className="w-full border border-stone-300 rounded-xl p-4 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <button
                      disabled={!customPreview}
                      onClick={() => setCustomSubmitted(true)}
                      className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium rounded-xl transition shadow-lg ${
                        customPreview 
                          ? 'bg-stone-900 text-white hover:bg-[#D4AF37]' 
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Submit To Master Goldsmith
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {}
        {activeTab === 'about' && (
          <section className="py-16 max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">Heritage</span>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-normal">Our Artisanal Legacy</h2>
              <p className="text-stone-600 text-sm mt-3 font-light leading-relaxed">
                Since 1988, Aura Luxury Jewelry has blended ancient goldsmithing traditions with modern 3D design technology to craft pieces that endure for generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center">
                <Award size={32} className="text-[#D4AF37] mx-auto mb-4" />
                <h3 className="font-serif text-lg font-medium mb-2">24K Pure Metallurgy</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Every gold bar processed in our atelier undergoes strict purity laser testing to guarantee uncompromised gold density.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center">
                <ShieldCheck size={32} className="text-[#D4AF37] mx-auto mb-4" />
                <h3 className="font-serif text-lg font-medium mb-2">GIA Certified Stones</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We hand-select only Conflict-Free, VVS clarity diamonds certified by the Gemological Institute of America.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center">
                <RotateCcw size={32} className="text-[#D4AF37] mx-auto mb-4" />
                <h3 className="font-serif text-lg font-medium mb-2">Lifetime Guarantee & Returns</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Enjoy complimentary polishing, sizing adjustments, and a 30-day money-back guarantee on all flagship items.
                </p>
              </div>
            </div>
          </section>
        )}

        {}
        {activeTab === 'branches' && (
          <section className="py-16 max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">Global Presence</span>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-normal">Our Boutique Showrooms</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { city: 'Dubai', address: 'The Dubai Mall, Fashion Avenue, Floor 1', phone: '+971 4 800 2872' },
                { city: 'Karachi', address: 'Clifton Block 4, Main Diamond Boulevard', phone: '+92 21 3582 9900' },
                { city: 'Lahore', address: 'MM Alam Road, Gulberg III', phone: '+92 42 3578 1122' },
                { city: 'Islamabad', address: 'F-6 Markaz, Luxury Galleria', phone: '+92 51 2822 4400' }
              ].map((branch, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-[#D4AF37] transition">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">{branch.city}</h3>
                  <p className="text-xs text-stone-600 mb-3 font-light">{branch.address}</p>
                  <p className="text-xs font-mono text-[#D4AF37]">{branch.phone}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {}
        {activeTab === 'faq' && (
          <section className="py-16 max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">Help Center</span>
              <h2 className="text-3xl font-serif text-stone-900 font-normal">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                { q: "Are all Aura gold pieces 100% authentic and stamped?", a: "Yes. All our jewelry is hallmarked for purity (18K, 24K, or Platinum) and comes with an official certificate of authenticity." },
                { q: "What is the delivery timeline for high-value orders?", a: "Standard insured armored delivery takes 3 to 5 business days globally. Custom bespoke design orders take 10 to 14 business days." },
                { q: "How do I measure my ring size accurately?", a: "Our 3D Interactive inspector features a ring size guide, or you can request a complimentary physical ring sizer mailed to your home address." },
                { q: "What is your return and refund policy?", a: "We offer a 30-day hassle-free return policy for all non-customized flagship items. Items must be in original condition with intact security tags." }
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-5 text-left flex justify-between items-center font-serif text-stone-900 font-medium text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-stone-100 text-[#D4AF37]">
                      {openFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-xs text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200 animate-in fade-in zoom-in-95">
            
            <button 
              onClick={() => { setSelectedProduct(null); setPdpZoom(1); }}
              className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8">
              
              {/* Left Side: High-Res Photo or Interactive 3D Canvas Switcher */}
              <div className="md:col-span-6 flex flex-col items-center">
                
                {/* 2D / 3D Mode Toggle Switch */}
                <div className="flex bg-stone-100 p-1 rounded-full mb-4 w-full max-w-xs justify-center">
                  <button
                    onClick={() => setPdpTab('2d')}
                    className={`flex-1 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition ${
                      pdpTab === '2d' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'
                    }`}
                  >
                    High-Res Photo
                  </button>
                  <button
                    onClick={() => setPdpTab('3d')}
                    className={`flex-1 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition flex items-center justify-center space-x-1 ${
                      pdpTab === '3d' ? 'bg-stone-900 text-white shadow' : 'text-stone-500'
                    }`}
                  >
                    <Sparkles size={12} className="text-[#D4AF37]" />
                    <span>3D Orbit View</span>
                  </button>
                </div>

                <div className="relative w-full aspect-square bg-stone-50 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center">
                  {pdpTab === '2d' ? (
                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{ transform: `scale(${pdpZoom})` }}
                      />
                      
                      {/* Zoom Controls Overlay */}
                      <div className="absolute bottom-3 right-3 flex bg-white/90 backdrop-blur-md rounded-lg shadow border border-stone-200">
                        <button 
                          onClick={() => setPdpZoom((z) => Math.min(z + 0.3, 2.5))}
                          className="p-2 text-stone-700 hover:text-[#D4AF37]"
                          title="Zoom In"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => setPdpZoom(1)}
                          className="p-2 text-stone-700 hover:text-[#D4AF37] border-x border-stone-200 text-[10px] font-mono flex items-center"
                        >
                          Reset
                        </button>
                        <button 
                          onClick={() => setPdpZoom((z) => Math.max(z - 0.3, 1))}
                          className="p-2 text-stone-700 hover:text-[#D4AF37]"
                          title="Zoom Out"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <Interactive3DRing metalType={pdpMetal} speed={0.006} />
                      <span className="absolute bottom-3 left-3 text-[10px] uppercase bg-black/60 text-white px-2 py-1 rounded backdrop-blur font-mono">
                        Drag to rotate 360°
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Product Specifications & Customizations */}
              <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl font-serif text-stone-900 font-medium mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-2xl font-serif font-bold text-stone-900 mb-4">
                    ${selectedProduct.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed font-light mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Metal Purity Selector */}
                  <div className="mb-6">
                    <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-2">
                      Select Precious Metal Type:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'gold', name: '18K Yellow Gold' },
                        { id: 'rosegold', name: 'Rose Gold' },
                        { id: 'platinum', name: 'Platinum' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPdpMetal(m.id)}
                          className={`py-2 px-3 text-[11px] rounded border uppercase tracking-wider transition ${
                            pdpMetal === m.id
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 font-semibold'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full py-4 bg-stone-900 text-white hover:bg-[#D4AF37] transition uppercase text-xs tracking-[0.2em] font-medium rounded-xl shadow-lg flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Add To Shopping Cart</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right">
            
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <h2 className="font-serif text-lg font-medium text-stone-900 uppercase tracking-wider">
                  Your Cart ({cart.reduce((a, c) => a + c.qty, 0)})
                </h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-4">
                <ShoppingBag size={48} className="text-stone-300" />
                <p className="text-stone-600 font-serif text-lg">Your shopping cart is empty</p>
                <button
                  onClick={() => { setIsCartOpen(false); setActiveTab('catalog'); setSelectedCategory('rings'); }}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-medium rounded"
                >
                  Browse Jewelry
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-4 divide-y divide-stone-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-stone-200" />
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-stone-900 font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-stone-500 font-mono">${item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button onClick={() => updateCartQty(item.id, -1)} className="p-1 border text-stone-600 rounded">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-mono font-bold px-2">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="p-1 border text-stone-600 rounded">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500 p-2">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 uppercase tracking-wider text-xs">Subtotal</span>
                  <span className="font-serif font-bold text-stone-900">${cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 uppercase tracking-wider text-xs">Armored Delivery</span>
                  <span className="text-[#D4AF37] font-medium text-xs">Complimentary</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-bold">
                  <span className="uppercase tracking-wider text-xs">Total</span>
                  <span className="font-serif text-xl text-stone-900">${grandTotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleStartCheckout}
                  className="w-full py-4 bg-stone-900 text-white hover:bg-[#D4AF37] transition uppercase text-xs tracking-[0.2em] font-medium rounded-xl shadow-xl mt-2"
                >
                  Proceed To Verification & Payment
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {}
      {checkoutStep && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl relative border border-stone-200">
            
            <button 
              onClick={() => setCheckoutStep(null)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              <X size={20} />
            </button>

            {/* STEP 1: Recipient Shipping Details */}
            {checkoutStep === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">Step 1 of 3</span>
                  <h3 className="text-2xl font-serif text-stone-900">Armored Delivery Address</h3>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-700 font-semibold mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full border border-stone-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-stone-700 font-semibold mb-1">Email</label>
                    <input
                      required
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                      placeholder="eleanor@luxury.com"
                      className="w-full border border-stone-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-stone-700 font-semibold mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full border border-stone-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-700 font-semibold mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    placeholder="Villa or Penthouse, Street Name"
                    className="w-full border border-stone-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white hover:bg-[#D4AF37] transition uppercase text-xs tracking-[0.2em] font-medium rounded-xl shadow-lg mt-4"
                >
                  Send OTP Multi-Factor Verification
                </button>
              </form>
            )}

            {/* STEP 2: Simulated OTP Verification */}
            {checkoutStep === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-6 text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">Step 2 of 3</span>
                  <h3 className="text-2xl font-serif text-stone-900">Security Verification</h3>
                  <p className="text-xs text-stone-500 mt-2">
                    Enter the 4-digit code sent to <span className="font-mono text-stone-800">{checkoutData.phone}</span>
                  </p>
                </div>

                <div className="flex justify-center space-x-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={otpCode[idx]}
                      onChange={(e) => {
                        const newOtp = [...otpCode];
                        newOtp[idx] = e.target.value;
                        setOtpCode(newOtp);
                      }}
                      className="w-12 h-14 text-center text-xl font-mono font-bold border border-stone-300 rounded-xl focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] outline-none"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white hover:bg-[#D4AF37] transition uppercase text-xs tracking-[0.2em] font-medium rounded-xl shadow-lg"
                >
                  Verify & Confirm Order
                </button>
              </form>
            )}

            {/* STEP 3: Order Confirmation & Download Invoice */}
            {checkoutStep === 3 && placedOrder && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                  <Check size={36} />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">Order Confirmed</span>
                  <h3 className="text-2xl font-serif text-stone-900">Thank You For Choosing Aura</h3>
                  <p className="text-xs text-stone-500 mt-1 font-mono">Order Reference: {placedOrder.orderId}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl text-left text-xs space-y-2 border border-stone-200">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Recipient:</span>
                    <span className="font-semibold text-stone-900">{placedOrder.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Delivery Address:</span>
                    <span className="font-semibold text-stone-900">{placedOrder.customer.address}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                    <span>Total Amount Paid:</span>
                    <span className="font-serif text-[#D4AF37]">${placedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadInvoice}
                    className="flex-1 py-3.5 bg-stone-900 text-white hover:bg-[#D4AF37] transition uppercase text-[11px] tracking-widest font-medium rounded-xl flex items-center justify-center space-x-2"
                  >
                    <Download size={14} />
                    <span>Download Invoice PDF</span>
                  </button>
                  <button
                    onClick={() => { setCheckoutStep(null); setPlacedOrder(null); setActiveTab('home'); setSelectedCategory(null); }}
                    className="flex-1 py-3.5 border border-stone-300 text-stone-800 hover:bg-stone-100 transition uppercase text-[11px] tracking-widest font-medium rounded-xl"
                  >
                    Back To Store
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {}
      <footer className="bg-[#1A1A1A] text-white border-t border-stone-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={BRAND_LOGO} alt="Aura Logo" className="w-9 h-9 rounded-full border border-[#D4AF37]" />
              <span className="font-serif tracking-widest text-lg text-[#D4AF37]">AURA</span>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Exquisite high jewelry crafted with pure 24K gold and GIA-certified ethically sourced diamonds.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Collections</h4>
            <ul className="text-xs text-stone-400 space-y-2 uppercase tracking-wider">
              <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('catalog'); setSelectedCategory('rings'); }}>Solitaire Rings</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('catalog'); setSelectedCategory('bracelets'); }}>Tennis Bracelets</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('catalog'); setSelectedCategory('bangles'); }}>Filigree Bangles</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setActiveTab('catalog'); setSelectedCategory('necklaces'); }}>Statement Necklaces</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Client Services</h4>
            <ul className="text-xs text-stone-400 space-y-2 uppercase tracking-wider">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('custom')}>Bespoke Studio</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('branches')}>Flagship Boutiques</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('faq')}>FAQ & Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-[#D4AF37] uppercase tracking-wider mb-4">Boutique Concierge</h4>
            <p className="text-xs text-stone-400 mb-2">Dubai • Karachi • Lahore • Islamabad</p>
            <p className="text-xs text-[#D4AF37] font-mono">+971 4 800 AURA</p>
            <p className="text-xs text-stone-400 mt-1">concierge@aurajewelry.com</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-stone-800/80 mt-12 pt-6 text-center text-[11px] text-stone-500 uppercase tracking-widest font-mono">
          © {new Date().getFullYear()} AURA Haute Joaillerie. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import { useCart } from '../context/CartContext';

const colors = {
  ink: '#0e0d0b',
  ink2: '#1a1916',
  ink3: '#242220',
  ink4: '#2f2d2a',
  gold: '#e8a020',
  gold2: '#f5b840',
  amber: '#c97a18',
  text: '#f0ebe0',
  muted: '#9a9080',
  muted2: '#6a6058',
  rust: '#c44a1a',
  sage: '#7a9e7e',
  border: 'rgba(232,160,32,0.12)',
  border2: 'rgba(240,235,224,0.08)',
};

const animations = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 200%;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-card {
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-card.visible {
    animation: fadeUp 0.6s ease forwards;
  }

  .animate-feature {
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .animate-feature.visible {
    animation: scaleIn 0.5s ease forwards;
  }

  .animate-header {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  
  .animate-header.visible {
    animation: fadeLeft 0.7s ease forwards;
  }

  .animate-tabs {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  
  .animate-tabs.visible {
    animation: fadeRight 0.7s ease forwards;
  }
`;

const productData = {
  laptops: [
    { id: 1, name: 'MacBook Air M2 13‑inch', price: 114900, originalPrice: 134900, rating: 5, reviews: 312, image: '💻', badge: 'New', badgeType: 'new', specs: 'M2 chip, 8GB RAM, 256GB SSD', category: 'Laptop' },
    { id: 2, name: 'Dell XPS 15 i9 RTX 4070', price: 189999, originalPrice: 209999, rating: 4, reviews: 189, image: '💻', badge: 'Hot', badgeType: 'hot', specs: 'i9, 32GB RAM, RTX 4070, 1TB SSD', category: 'Laptop' },
    { id: 3, name: 'Lenovo ThinkPad X1 Carbon', price: 124990, originalPrice: 154990, rating: 5, reviews: 254, image: '💻', badge: '-20%', badgeType: 'sale', specs: 'i7, 16GB RAM, 512GB SSD', category: 'Laptop' },
    { id: 4, name: 'HP Spectre x360 OLED 14"', price: 149900, originalPrice: 169900, rating: 4, reviews: 97, image: '💻', badge: null, badgeType: null, specs: 'i7, 16GB RAM, 1TB SSD, OLED', category: 'Laptop' }
  ],
  pcs: [
    { id: 5, name: 'iMac 24" M3 8-Core', price: 134900, originalPrice: 154900, rating: 5, reviews: 211, image: '🖥️', badge: 'New', badgeType: 'new', specs: 'M3 chip, 8GB RAM, 256GB SSD', category: 'Desktop' },
    { id: 6, name: 'Custom Build i9 + RTX 4090', price: 349999, originalPrice: 389999, rating: 5, reviews: 68, image: '🖥️', badge: 'Hot', badgeType: 'hot', specs: 'i9, 64GB RAM, RTX 4090, 2TB SSD', category: 'Gaming PC' },
    { id: 7, name: 'Dell OptiPlex 3000 i5', price: 52999, originalPrice: 64999, rating: 4, reviews: 143, image: '🖥️', badge: null, badgeType: null, specs: 'i5, 8GB RAM, 256GB SSD', category: 'Office PC' },
    { id: 8, name: 'HP Z2 Tower G9 Xeon', price: 187500, originalPrice: 249999, rating: 4, reviews: 55, image: '🖥️', badge: '-25%', badgeType: 'sale', specs: 'Xeon, 32GB RAM, 1TB SSD', category: 'Workstation' }
  ],
  mobiles: [
    { id: 9, name: 'iPhone 16 Pro Max 256GB', price: 134900, originalPrice: 144900, rating: 5, reviews: 876, image: '📱', badge: 'New', badgeType: 'new', specs: 'A18 Pro, 8GB RAM, 256GB', category: 'Smartphone' },
    { id: 10, name: 'Samsung Galaxy S25 Ultra', price: 129999, originalPrice: 149999, rating: 5, reviews: 541, image: '📱', badge: 'Hot', badgeType: 'hot', specs: 'Snapdragon 8 Gen 4, 12GB RAM, 256GB', category: 'Smartphone' },
    { id: 11, name: 'OnePlus 13 16GB RAM', price: 69999, originalPrice: 79999, rating: 4, reviews: 388, image: '📱', badge: null, badgeType: null, specs: 'Snapdragon 8 Gen 4, 16GB RAM, 256GB', category: 'Smartphone' },
    { id: 12, name: 'Google Pixel 9 Pro XL', price: 84999, originalPrice: 119999, rating: 5, reviews: 224, image: '📱', badge: '-30%', badgeType: 'sale', specs: 'Tensor G4, 16GB RAM, 256GB', category: 'Smartphone' }
  ],
  bluetooth: [
    { id: 13, name: 'Sony WH-1000XM6 ANC', price: 29990, originalPrice: 34990, rating: 5, reviews: 632, image: '🎧', badge: 'New', badgeType: 'new', specs: 'Wireless, ANC, 30hr battery', category: 'Headphones' },
    { id: 14, name: 'Apple AirPods Pro 3', price: 26900, originalPrice: 29900, rating: 5, reviews: 1200, image: '🎵', badge: null, badgeType: null, specs: 'Active Noise Cancellation, MagSafe', category: 'Earbuds' },
    { id: 15, name: 'JBL Charge 6 Portable', price: 12999, originalPrice: 15999, rating: 4, reviews: 445, image: '🔊', badge: 'Hot', badgeType: 'hot', specs: '20W, IP67, 20hr battery', category: 'Speaker' },
    { id: 16, name: 'Samsung Galaxy Buds3 Pro', price: 17999, originalPrice: 19999, rating: 4, reviews: 289, image: '🎧', badge: null, badgeType: null, specs: 'ANC, 24-bit audio, IP57', category: 'Earbuds' }
  ],
  accessories: [
    { id: 17, name: 'Logitech MX Master 3S', price: 9495, originalPrice: 10995, rating: 5, reviews: 892, image: '🖱️', badge: 'New', badgeType: 'new', specs: 'Wireless, 8K DPI, USB-C', category: 'Mouse' },
    { id: 18, name: 'Keychron Q3 Mechanical', price: 13500, originalPrice: 16000, rating: 5, reviews: 543, image: '⌨️', badge: null, badgeType: null, specs: 'Hot-swappable, RGB, Aluminum', category: 'Keyboard' },
    { id: 19, name: 'Samsung T9 4TB Portable SSD', price: 18999, originalPrice: 22999, rating: 4, reviews: 368, image: '💾', badge: 'Hot', badgeType: 'hot', specs: 'USB 3.2, 2,000 MB/s, Rugged', category: 'Storage' },
    { id: 20, name: 'LG UltraWide 34" OLED', price: 79990, originalPrice: 89990, rating: 5, reviews: 174, image: '🖥️', badge: null, badgeType: null, specs: '3440x1440, 240Hz, OLED', category: 'Monitor' }
  ]
};

const categories = [
  { label: 'Laptops', key: 'laptops', icon: '💻' },
  { label: 'PCs', key: 'pcs', icon: '🖥️' },
  { label: 'Phones', key: 'mobiles', icon: '📱' },
  { label: 'Bluetooth', key: 'bluetooth', icon: '🎧' },
  { label: 'Accessories', key: 'accessories', icon: '🖱️' }
];

const ProductCard = ({ product, onAddToCart, onWishlist, onQuickView, isWishlisted, index }) => {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <Box
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`animate-card ${isVisible ? 'visible' : ''}`}
      sx={{
        width: "100%",
        maxWidth: 320,
        minWidth: 280,
        height: 520,
        borderRadius: "22px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg,#1a1916,#0e0d0b)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all .35s cubic-bezier(0.4, 0, 0.2, 1)",
        '&:hover': {
          transform: "translateY(-8px)",
          borderColor: "rgba(232,160,32,0.3)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'left 0.5s ease',
            ...(hover && {
              left: '200%',
              transition: 'left 0.5s ease',
            }),
          },
        }}
      />
      
      <Box
        sx={{
          height: 280,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)",
        }}
      >
        {product.badge && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              px: 1.5,
              py: 0.5,
              fontSize: 11,
              fontWeight: 700,
              borderRadius: "4px",
              bgcolor: product.badgeType === "new" ? "#7a9e7e" : product.badgeType === "hot" ? "#c44a1a" : "#e8a020",
              color: product.badgeType === "sale" ? "#000" : "#fff",
              zIndex: 2,
              animation: hover ? 'pulse 0.5s ease' : 'none',
            }}
          >
            {product.badge}
          </Box>
        )}

        <IconButton
          onClick={() => onWishlist(product.id)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(0,0,0,0.5)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.2s ease",
            transform: hover ? "scale(1)" : "scale(0.8)",
            zIndex: 2,
            '&:hover': {
              bgcolor: "rgba(0,0,0,0.7)",
              transform: "scale(1.1)",
            }
          }}
        >
          {isWishlisted ? <FavoriteIcon sx={{ color: "#ff6b6b" }} /> : <FavoriteBorderIcon sx={{ color: "#aaa" }} />}
        </IconButton>

        <Box
          sx={{
            fontSize: 90,
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {product.image}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 3,
          background: "linear-gradient(to top,#0e0d0b,transparent)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: 11, color: "#e8a020", letterSpacing: 1.5, mb: 1 }}>
          {product.category.toUpperCase()}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: 18,
            fontWeight: 700,
            mb: 1,
            color: colors.text,
            lineHeight: 1.3,
            minHeight: 46,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: colors.muted2,
            mb: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.specs}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <Box sx={{ display: 'flex', color: colors.gold, fontSize: 13 }}>
            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
          </Box>
          <Typography sx={{ fontSize: 11, color: colors.muted2 }}>
            ({product.reviews})
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Typography sx={{ fontSize: 24, fontWeight: 800, color: colors.text }}>
            ₹{product.price.toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 13, color: colors.muted2, textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString()}
            </Typography>
            {discount > 0 && (
              <Chip
                label={`−${discount}%`}
                size="small"
                sx={{
                  bgcolor: 'rgba(122,158,126,0.12)',
                  color: colors.sage,
                  fontSize: 10,
                  height: 20
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            fullWidth
            onClick={() => onAddToCart(product)}
            sx={{
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              background: "linear-gradient(135deg,#e8a020,#f5b840)",
              color: "#000",
              fontWeight: 700,
              fontSize: 12,
              '&:hover': {
                background: "linear-gradient(135deg,#f5b840,#e8a020)",
                transform: "scale(1.02)",
              }
            }}
          >
            ADD TO BAG
          </Button>
          
          <IconButton
            onClick={() => onQuickView(product)}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              border: `1px solid ${colors.border2}`,
              color: colors.muted,
              width: 42,
              height: 42,
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              '&:hover': {
                color: colors.gold,
                bgcolor: "rgba(232,160,32,0.1)",
                transform: "scale(1.05)",
              }
            }}
          >
            <VisibilityIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const Products = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  
  const currentCategory = categories[selectedTab].key;
  const currentProducts = productData[currentCategory];
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTabsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (tabsRef.current) {
      observer.observe(tabsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image
    };
    addToCart(cartProduct);
  };
  
  const handleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    const isAdding = !wishlist[productId];
    console.log(isAdding ? 'Added to wishlist!' : 'Removed from wishlist!');
  };
  
  const handleQuickView = (product) => {
    alert(`Quick view: ${product.name}\n${product.specs}\nPrice: ₹${product.price.toLocaleString()}`);
  };
  
  return (
    <>
      <style>{animations}</style>
      <Box sx={{ bgcolor: colors.ink, minHeight: '100vh', pt: { xs: 2, md: 4 }, pb: 0 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box 
            ref={headerRef}
            sx={{ 
              mb: 6, 
              mt: { xs: 2, md: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: { xs: 3, md: 4 },
            }}
          >
            <Box className={`animate-header ${headerVisible ? 'visible' : ''}`} sx={{ pl: 0 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 28, height: 1.5, bgcolor: colors.gold }} />
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 3,
                    color: colors.gold,
                    textTransform: 'uppercase'
                  }}
                >
                  Our Collection
                </Typography>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.gold, opacity: 0.5 }} />
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: { xs: 32, sm: 42, md: 52 },
                  fontWeight: 900,
                  color: colors.text,
                  lineHeight: 1.1
                }}
              >
                Explore <span style={{
                  background: `linear-gradient(135deg, ${colors.gold}, ${colors.gold2}, ${colors.amber})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Premium</span><br />
                Electronics
              </Typography>
            </Box>
            
            <Paper
              ref={tabsRef}
              elevation={0}
              className={`animate-tabs ${tabsVisible ? 'visible' : ''}`}
              sx={{
                display: 'inline-flex',
                gap: { xs: 0.25, sm: 0.5, md: 0.5 },
                bgcolor: colors.ink3,
                p: { xs: 0.4, sm: 0.5, md: 0.5 },
                borderRadius: 1.5,
                border: `1px solid ${colors.border2}`,
                flexShrink: 0,
                flexWrap: 'nowrap',
                width: 'auto',
              }}
            >
              {categories.map((cat, idx) => (
                <Button
                  key={idx}
                  onClick={() => setSelectedTab(idx)}
                  sx={{
                    px: { xs: 0.8, sm: 1.2, md: 2 },
                    py: { xs: 0.4, sm: 0.6, md: 0.75 },
                    borderRadius: { xs: 1.2, sm: 2, md: 2.5 },
                    fontSize: { xs: 8, sm: 9, md: 11 },
                    fontWeight: selectedTab === idx ? 700 : 500,
                    color: selectedTab === idx ? colors.ink : colors.muted,
                    bgcolor: selectedTab === idx ? colors.gold : 'transparent',
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      bgcolor: selectedTab === idx ? colors.gold : 'rgba(255,255,255,0.05)',
                      color: selectedTab === idx ? colors.ink : colors.text,
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <span style={{ 
                    marginRight: { xs: 2, sm: 4, md: 6 }, 
                    fontSize: { xs: 9, sm: 10, md: 12 } 
                  }}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </Button>
              ))}
            </Paper>
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            px: { xs: 1, sm: 2, md: 3 }
          }}>
            <Grid
              container
              spacing={3}
              sx={{
                maxWidth: '1400px',
                margin: '0 auto',
                justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
              }}
            >
              {currentProducts.map((product, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onWishlist={handleWishlist}
                    onQuickView={handleQuickView}
                    isWishlisted={wishlist[product.id] || false}
                    index={idx}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        
        <Box
          sx={{
            mt: { xs: 8, sm: 10, md: 12 },
            py: { xs: 5, sm: 5, md: 6 },
            bgcolor: colors.ink3,
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
            width: '100%',
            mb: 0,
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}>
              <Grid
                container
                spacing={{ xs: 2, sm: 1.5, md: 1 }}
                sx={{
                  maxWidth: '1400px',
                  margin: '0 auto',
                  justifyContent: 'center',
                }}
              >
                {[
                  { icon: '🚀', title: 'Fast Delivery', desc: 'Same-day dispatch on all in-stock orders above ₹999' },
                  { icon: '🔒', title: 'Genuine Products', desc: '100% authentic with official brand warranty included' },
                  { icon: '🛠️', title: 'Expert Repair', desc: 'Certified technicians, genuine parts, 90-day service warranty' },
                  { icon: '💬', title: '24/7 Support', desc: 'WhatsApp, call, or visit — we\'re always here to help you' }
                ].map((feature, idx) => {
                  const [isVisible, setIsVisible] = useState(false);
                  const featureRef = useRef(null);
                  
                  useEffect(() => {
                    const observer = new IntersectionObserver(
                      ([entry]) => {
                        if (entry.isIntersecting) {
                          setIsVisible(true);
                          observer.disconnect();
                        }
                      },
                      { threshold: 0.2 }
                    );
                    
                    if (featureRef.current) {
                      observer.observe(featureRef.current);
                    }
                    
                    return () => observer.disconnect();
                  }, []);
                  
                  return (
                    <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box 
                        ref={featureRef}
                        className={`animate-feature ${isVisible ? 'visible' : ''}`}
                        sx={{ 
                          px: { xs: 2, sm: 1.5, md: 1.5 },
                          py: { xs: 6, sm: 7, md: 8 },
                          textAlign: 'center', 
                          transition: 'all 0.35s ease',
                          '&:hover': { 
                            bgcolor: colors.ink4,
                            transform: 'translateY(-4px)',
                          },
                          height: '100%',
                          width: '100%',
                          maxWidth: { xs: '100%', sm: '100%', md: '100%' },
                          cursor: 'pointer',
                        }}
                      >
                        <Typography sx={{ 
                          fontSize: { xs: 32, sm: 30, md: 28 }, 
                          mb: { xs: 1.5, sm: 1.2, md: 1 }, 
                          display: 'block',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          }
                        }}>
                          {feature.icon}
                        </Typography>
                        <Typography sx={{ 
                          fontFamily: 'Playfair Display, serif', 
                          fontSize: { xs: 18, sm: 18, md: 18 }, 
                          fontWeight: 700, 
                          color: colors.text, 
                          mb: { xs: 1, sm: 0.8, md: 0.5 }
                        }}>
                          {feature.title}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: { xs: 12, sm: 12, md: 12 }, 
                          color: colors.muted, 
                          lineHeight: { xs: 1.5, sm: 1.45, md: 1.4 },
                          px: { xs: 2, sm: 2, md: 4 },
                          maxWidth: { xs: 280, sm: 260, md: 300 },
                          margin: '0 auto'
                        }}>
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Products;
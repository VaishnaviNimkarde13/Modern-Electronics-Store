import React, { useState } from 'react';
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

// Color tokens matching the HTML design
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

// Complete product data with all categories
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

const ProductCard = ({ product, onAddToCart, onWishlist, onQuickView, isWishlisted }) => {
  const [hover, setHover] = useState(false);
  
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
        transition: "all .35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "rgba(232,160,32,0.3)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        },
      }}
    >
      {/* IMAGE SECTION */}
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
            }}
          >
            {product.badge}
          </Box>
        )}

        {/* Wishlist Icon */}
        <IconButton
          onClick={() => onWishlist(product.id)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(0,0,0,0.5)",
            opacity: hover ? 1 : 0,
            transition: "0.3s",
            zIndex: 2,
            '&:hover': {
              bgcolor: "rgba(0,0,0,0.7)",
            }
          }}
        >
          {isWishlisted ? <FavoriteIcon sx={{ color: "#ff6b6b" }} /> : <FavoriteBorderIcon sx={{ color: "#aaa" }} />}
        </IconButton>

        {/* Product Image */}
        <Box
          sx={{
            fontSize: 90,
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "0.4s",
          }}
        >
          {product.image}
        </Box>
      </Box>

      {/* CONTENT SECTION */}
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

        {/* Action Buttons - Add to Bag and View Eye */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            fullWidth
            onClick={() => onAddToCart(product)}
            sx={{
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(10px)",
              transition: "0.3s",
              background: "linear-gradient(135deg,#e8a020,#f5b840)",
              color: "#000",
              fontWeight: 700,
              fontSize: 12,
              '&:hover': {
                background: "linear-gradient(135deg,#f5b840,#e8a020)",
              }
            }}
          >
            ADD TO BAG
          </Button>
          
          {/* View Eye Icon */}
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
              transition: "0.3s",
              '&:hover': {
                color: colors.gold,
                bgcolor: "rgba(232,160,32,0.1)",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const currentCategory = categories[selectedTab].key;
  const currentProducts = productData[currentCategory];
  
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };
  
  const handleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    const isAdding = !wishlist[productId];
    alert(isAdding ? 'Added to wishlist!' : 'Removed from wishlist!');
  };
  
  const handleQuickView = (product) => {
    alert(`Quick view: ${product.name}\n${product.specs}\nPrice: ₹${product.price.toLocaleString()}`);
  };
  
  return (
    <Box sx={{ bgcolor: colors.ink, minHeight: '100vh', pt: { xs: 2, md: 4 }, pb: 8 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            mb: 6, 
            mt: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: { xs: 3, md: 4 },
            px: { xs: 0, sm: 2, md: 5 } 
          }}
        >
          {/* Left side - Heading */}
          <Box sx={{ pl: 0 }}>
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
          
          {/* Right side - Category Tabs */}
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              gap: 0.5,
              bgcolor: colors.ink3,
              p: 0.5,
              borderRadius: 1.5,
              border: `1px solid ${colors.border2}`,
              overflowX: 'auto',
              flexShrink: 0,
              mb: { xs: 0, md: 1 },
              pr: 1,
              mr: { xs: 0, sm: 2, md: 5 }
            }}
          >
            {categories.map((cat, idx) => (
              <Button
                key={idx}
                onClick={() => setSelectedTab(idx)}
                sx={{
                  px: { xs: 1.5, sm: 2 },
                  py: 0.75,
                  borderRadius: 2.5,
                  fontSize: 11,
                  fontWeight: selectedTab === idx ? 700 : 500,
                  color: selectedTab === idx ? colors.ink : colors.muted,
                  bgcolor: selectedTab === idx ? colors.gold : 'transparent',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    bgcolor: selectedTab === idx ? colors.gold : 'rgba(255,255,255,0.05)',
                    color: selectedTab === idx ? colors.ink : colors.text
                  }
                }}
              >
                <span style={{ marginRight: 6, fontSize: 12 }}>{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </Paper>
        </Box>
        
        {/* Products Grid */}
        <Box sx={{ 
          px: { xs: 0, sm: 2, md: 0 },
          pl: { xs: 2, sm: 3, md: 4 }
        }}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
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
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Feature Strip - Only height increased, width unchanged */}
      <Box
        sx={{
          mt: 12,
          py: 6,
          bgcolor: colors.ink3,
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          width: '100%',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Box 
                sx={{ 
                  px: 1.5,
                  py: 8,
                  textAlign: 'center', 
                  transition: 'all 0.35s ease',
                  '&:hover': { bgcolor: colors.ink4 }
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1, display: 'block' }}>🚀</Typography>
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: colors.text, mb: 0.5 }}>
                  Fast Delivery
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, lineHeight: 1.4, px: 4,
                  maxWidth: 300,
                  margin: '0 auto' }}>
                  Same-day dispatch on all in-stock orders above ₹999
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box 
                sx={{ 
                  px: 1.5,
                  py: 8,
                  textAlign: 'center', 
                  transition: 'all 0.35s ease',
                  '&:hover': { bgcolor: colors.ink4 }
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1, display: 'block' }}>🔒</Typography>
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: colors.text, mb: 0.5 }}>
                  Genuine Products
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, lineHeight: 1.4, px: 4,
                  maxWidth: 300,
                  margin: '0 auto' }}>
                  100% authentic with official brand warranty included
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box 
                sx={{ 
                  px: 1.5,
                  py: 8,
                  textAlign: 'center', 
                  transition: 'all 0.35s ease',
                  '&:hover': { bgcolor: colors.ink4 }
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1, display: 'block' }}>🛠️</Typography>
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: colors.text, mb: 0.5 }}>
                  Expert Repair
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, lineHeight: 1.4, px: 4,
                  maxWidth: 300,
                  margin: '0 auto' }}>
                  Certified technicians, genuine parts, 90-day service warranty
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box 
                sx={{ 
                  px: 1.5,
                  py: 8,
                  textAlign: 'center', 
                  transition: 'all 0.35s ease',
                  '&:hover': { bgcolor: colors.ink4 }
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 1, display: 'block' }}>💬</Typography>
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: colors.text, mb: 0.5 }}>
                  24/7 Support
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.muted, lineHeight: 1.4, px: 4,
                  maxWidth: 300,
                  margin: '0 auto' }}>
                  WhatsApp, call, or visit — we're always here to help you
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Products;
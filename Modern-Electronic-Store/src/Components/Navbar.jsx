import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Stack,
  Divider,
  useScrollTrigger,
  CssBaseline,
  GlobalStyles,
  InputBase,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon                from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon   from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon         from "@mui/icons-material/PersonOutline";
import MenuIcon                  from "@mui/icons-material/Menu";
import CloseIcon                 from "@mui/icons-material/Close";
import HomeOutlinedIcon          from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon    from "@mui/icons-material/Inventory2Outlined";
import BuildOutlinedIcon         from "@mui/icons-material/BuildOutlined";
import MailOutlineIcon           from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddShoppingCartIcon       from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon    from "@mui/icons-material/CheckCircleOutline";
import BoltIcon                  from "@mui/icons-material/Bolt";
import AuthPage from "../Pages/Login";

// ══════════════════════════════════════════════════════════
//  THEME
// ══════════════════════════════════════════════════════════
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0e0d0b", paper: "#1a1916" },
    primary: { main: "#e8a020" },
    text: { primary: "#f0ebe0", secondary: "#9a9080" },
  },
  typography: { fontFamily: "'Outfit', sans-serif" },
});

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════
const INK    = "#0e0d0b";
const INK3   = "#242220";
const INK4   = "#1c1b18";
const GOLD   = "#e8a020";
const GOLD2  = "#f5b840";
const AMBER  = "#c97a18";
const TEXT   = "#f0ebe0";
const MUTED  = "#9a9080";
const RUST   = "#c44a1a";
const BORDER  = "rgba(232,160,32,0.12)";
const BORDER2 = "rgba(240,235,224,0.08)";
const EASE    = "all 0.35s cubic-bezier(0.4,0,0.2,1)";

// ══════════════════════════════════════════════════════════
//  MOCK PRODUCTS
// ══════════════════════════════════════════════════════════
const MOCK_PRODUCTS = [
  { id: 1,  name: "Arc Flash Helmet Pro",        category: "Safety",      price: 149.99, tag: "Bestseller" },
  { id: 2,  name: "HV Insulated Gloves 33kV",    category: "Protection",  price: 89.99,  tag: "New" },
  { id: 3,  name: "Digital Clamp Meter 600A",    category: "Instruments", price: 129.99, tag: null },
  { id: 4,  name: "Solar Cable 6mm² (50m)",       category: "Cables",      price: 74.50,  tag: null },
  { id: 5,  name: "DIN Rail MCB 32A",             category: "Switchgear",  price: 24.99,  tag: "Sale" },
  { id: 6,  name: "Smart Energy Monitor",         category: "Monitoring",  price: 199.00, tag: "New" },
  { id: 7,  name: "Conduit Bender Heavy Duty",    category: "Tools",       price: 58.00,  tag: null },
  { id: 8,  name: "LED Floodlight 200W",          category: "Lighting",    price: 112.00, tag: "Bestseller" },
  { id: 9,  name: "GFCI Outlet 20A Tamper-Res",   category: "Outlets",     price: 19.99,  tag: null },
  { id: 10, name: "Thermal Imaging Camera",       category: "Instruments", price: 449.00, tag: "Pro" },
  { id: 11, name: "Underground Cable 4mm² (100m)",category: "Cables",      price: 155.00, tag: null },
  { id: 12, name: "Voltage Stabilizer 5kVA",      category: "Power",       price: 320.00, tag: "New" },
];

// ══════════════════════════════════════════════════════════
//  NAV LINKS DATA
// ══════════════════════════════════════════════════════════
const NAV_LINKS = [
  { label: "Home",     href: "#home",     icon: <HomeOutlinedIcon />        },
  { label: "Products", href: "#products", icon: <Inventory2OutlinedIcon />  },
  { label: "Services", href: "#services", icon: <BuildOutlinedIcon />       },
  { label: "Contact",  href: "#contact",  icon: <MailOutlineIcon />         },
];

// ══════════════════════════════════════════════════════════
//  LOGO
// ══════════════════════════════════════════════════════════
function Logo() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      component="a"
      href="#home"
      sx={{ textDecoration: "none", userSelect: "none" }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "8px",
          background: `linear-gradient(135deg, ${AMBER}, ${GOLD})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 900,
          color: INK,
          letterSpacing: "-1px",
          flexShrink: 0,
        }}
      >
        N
      </Box>
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: 18, sm: 21 },
          fontWeight: 800,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: TEXT,
          "& span": { color: GOLD },
        }}
      >
        NEX<span>VOLT</span>
      </Typography>
    </Stack>
  );
}

// ══════════════════════════════════════════════════════════
//  ICON BUTTON (Search / Bag)
// ══════════════════════════════════════════════════════════
function NavIconBtn({ children, badgeCount, onClick, active }) {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{
        width: 42,
        height: 42,
        borderRadius: "8px",
        background: active ? "rgba(232,160,32,0.12)" : INK3,
        border: `1px solid ${active ? BORDER : BORDER2}`,
        color: active ? GOLD : MUTED,
        transition: EASE,
        "&:hover": { color: GOLD, borderColor: BORDER, background: active ? "rgba(232,160,32,0.12)" : INK3 },
      }}
    >
      {badgeCount !== undefined && badgeCount > 0 ? (
        <Badge
          badgeContent={badgeCount}
          sx={{
            "& .MuiBadge-badge": {
              background: RUST,
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              minWidth: 18,
              height: 18,
              borderRadius: "50%",
            },
          }}
        >
          {children}
        </Badge>
      ) : (
        children
      )}
    </IconButton>
  );
}

// ══════════════════════════════════════════════════════════
//  SEARCH OVERLAY
// ══════════════════════════════════════════════════════════
function SearchOverlay({ open, onClose, onAddToCart, cartItems }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const inputRef              = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    const filtered = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  const cartIds = new Set(cartItems.map((i) => i.id));

  if (!open) return null;

  return (
    <Box
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        background: "rgba(14,13,11,0.85)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 4, md: 8 },
        px: 2,
        animation: "fadeIn 0.2s ease",
        "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}
    >
      {/* Search box */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 680,
          background: INK4,
          border: `1px solid ${BORDER}`,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          px: 2.5,
          py: 0.5,
          gap: 1.5,
          boxShadow: `0 0 60px rgba(232,160,32,0.08)`,
        }}
      >
        <SearchIcon sx={{ color: GOLD, fontSize: 22, flexShrink: 0 }} />
        <InputBase
          inputRef={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, categories…"
          fullWidth
          sx={{
            color: TEXT,
            fontSize: 17,
            fontFamily: "'Outfit', sans-serif",
            "& input::placeholder": { color: MUTED, opacity: 1 },
          }}
        />
        {query && (
          <IconButton size="small" onClick={() => setQuery("")} sx={{ color: MUTED, "&:hover": { color: TEXT } }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        <Button
          onClick={onClose}
          size="small"
          sx={{
            ml: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: MUTED,
            border: `1px solid ${BORDER2}`,
            textTransform: "none",
            "&:hover": { color: TEXT, borderColor: BORDER },
          }}
        >
          ESC
        </Button>
      </Box>

      {/* Results */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 680,
          mt: 1.5,
          maxHeight: "60vh",
          overflowY: "auto",
          borderRadius: "14px",
          border: results.length > 0 ? `1px solid ${BORDER2}` : "none",
          background: results.length > 0 ? INK4 : "transparent",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: AMBER, borderRadius: "2px" },
        }}
      >
        {!query && (
          <Box sx={{ px: 3, py: 4, textAlign: "center" }}>
            <BoltIcon sx={{ color: GOLD, fontSize: 36, opacity: 0.4, mb: 1 }} />
            <Typography sx={{ color: MUTED, fontSize: 14 }}>
              Start typing to search products & categories
            </Typography>
          </Box>
        )}

        {query && results.length === 0 && (
          <Box sx={{ px: 3, py: 4, textAlign: "center" }}>
            <Typography sx={{ color: MUTED, fontSize: 14 }}>
              No results for <strong style={{ color: TEXT }}>"{query}"</strong>
            </Typography>
          </Box>
        )}

        {results.map((product, idx) => {
          const inCart = cartIds.has(product.id);
          return (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2.5,
                py: 1.75,
                gap: 2,
                borderBottom: idx < results.length - 1 ? `1px solid ${BORDER2}` : "none",
                transition: EASE,
                "&:hover": { background: "rgba(232,160,32,0.04)" },
              }}
            >
              {/* Product icon placeholder */}
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${AMBER}22, ${GOLD}22)`,
                  border: `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BoltIcon sx={{ color: GOLD, fontSize: 18, opacity: 0.7 }} />
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: TEXT,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.name}
                  </Typography>
                  {product.tag && (
                    <Chip
                      label={product.tag}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                        background:
                          product.tag === "Sale"  ? `${RUST}33` :
                          product.tag === "New"   ? "rgba(20,180,120,0.2)" :
                          product.tag === "Pro"   ? "rgba(120,80,220,0.25)" :
                          `${GOLD}22`,
                        color:
                          product.tag === "Sale"  ? "#e07060" :
                          product.tag === "New"   ? "#40c090" :
                          product.tag === "Pro"   ? "#b090f0" :
                          GOLD,
                        border: "none",
                        "& .MuiChip-label": { px: "6px" },
                      }}
                    />
                  )}
                </Stack>
                <Typography sx={{ fontSize: 12, color: MUTED, mt: 0.25 }}>
                  {product.category}
                </Typography>
              </Box>

              {/* Price */}
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: GOLD, flexShrink: 0 }}>
                ${product.price.toFixed(2)}
              </Typography>

              {/* Add to cart */}
              <Button
                size="small"
                onClick={() => onAddToCart(product)}
                startIcon={
                  inCart
                    ? <CheckCircleOutlineIcon sx={{ fontSize: "16px !important" }} />
                    : <AddShoppingCartIcon sx={{ fontSize: "16px !important" }} />
                }
                sx={{
                  flexShrink: 0,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: "7px",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "none",
                  background: inCart ? "rgba(20,180,120,0.15)" : `${GOLD}22`,
                  color: inCart ? "#40c090" : GOLD,
                  border: `1px solid ${inCart ? "rgba(20,180,120,0.3)" : BORDER}`,
                  transition: EASE,
                  "&:hover": {
                    background: inCart ? "rgba(20,180,120,0.25)" : `${GOLD}33`,
                  },
                }}
              >
                {inCart ? "Added" : "Add"}
              </Button>
            </Box>
          );
        })}
      </Box>

      {/* Hint */}
      {results.length > 0 && (
        <Typography sx={{ mt: 1.5, fontSize: 12, color: MUTED }}>
          {results.length} result{results.length !== 1 ? "s" : ""} · Click outside or press ESC to close
        </Typography>
      )}
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
//  CART DRAWER
// ══════════════════════════════════════════════════════════
function CartDrawer({ open, onClose, cartItems, onRemove, onCheckout }) {
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 380 },
          background: INK,
          borderLeft: `1px solid ${BORDER}`,
          display: "flex",
          flexDirection: "column",
        },
      }}
      sx={{ zIndex: 1350 }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2.5,
          borderBottom: `1px solid ${BORDER2}`,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <ShoppingBagOutlinedIcon sx={{ color: GOLD, fontSize: 22 }} />
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: TEXT }}>
            Shopping Bag
          </Typography>
          <Box
            sx={{
              background: RUST,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              minWidth: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItems.length}
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            width: 38,
            height: 38,
            borderRadius: "8px",
            background: INK3,
            border: `1px solid ${BORDER2}`,
            color: MUTED,
            "&:hover": { color: TEXT, borderColor: BORDER },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Items */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2,
        "&::-webkit-scrollbar": { width: "3px" },
        "&::-webkit-scrollbar-thumb": { background: AMBER, borderRadius: "2px" },
      }}>
        {cartItems.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <ShoppingBagOutlinedIcon sx={{ color: MUTED, fontSize: 48, opacity: 0.3, mb: 2 }} />
            <Typography sx={{ color: MUTED, fontSize: 14 }}>Your bag is empty</Typography>
            <Typography sx={{ color: MUTED, fontSize: 12, mt: 0.5, opacity: 0.6 }}>
              Search for products to add them here
            </Typography>
          </Box>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.75,
                mb: 1,
                borderRadius: "10px",
                border: `1px solid ${BORDER2}`,
                background: INK4,
                transition: EASE,
                "&:hover": { borderColor: BORDER },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  background: `${GOLD}18`,
                  border: `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BoltIcon sx={{ color: GOLD, fontSize: 18 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: TEXT,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 11, color: MUTED }}>{item.category}</Typography>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: GOLD, flexShrink: 0 }}>
                ${item.price.toFixed(2)}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onRemove(item.id)}
                sx={{ color: MUTED, "&:hover": { color: RUST }, flexShrink: 0, p: 0.5 }}
              >
                <CloseIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>

      {/* Footer */}
      {cartItems.length > 0 && (
        <Box sx={{ px: 2, py: 2.5, borderTop: `1px solid ${BORDER2}` }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography sx={{ color: MUTED, fontSize: 14 }}>Total</Typography>
            <Typography sx={{ color: TEXT, fontSize: 18, fontWeight: 700 }}>
              ${total.toFixed(2)}
            </Typography>
          </Stack>
         <Button
  fullWidth
  onClick={onCheckout}   
  sx={{
    py: 1.75,
    borderRadius: "10px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    background: GOLD,
    color: INK,
    "&:hover": { background: GOLD2, boxShadow: "0 12px 32px rgba(232,160,32,0.35)" },
  }}
>
  Checkout
</Button>
        </Box>
      )}
    </Drawer>
  );
}

// ══════════════════════════════════════════════════════════
//  NAVBAR COMPONENT (FIXED – USES CONTEXT)
// ══════════════════════════════════════════════════════════
function NavbarInner() {
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [cartOpen, setCartOpen]       = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeLink, setActiveLink]   = useState("home");
  const [toast, setToast]             = useState({ open: false, name: "" });
  const navigate = useNavigate();
  const stuck = useScrollTrigger({ disableHysteresis: true, threshold: 60 });

  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const cartCount = cartItems.length;

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ open: true, name: product.name });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };
  
  const handleCheckout = () => {
    clearCart();        
    setCartOpen(false);    
    setToast({ open: true, name: "Order placed successfully!" });
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = NAV_LINKS[0].href.replace("#", "");
      NAV_LINKS.forEach(({ href }) => {
        const el = document.getElementById(href.replace("#", ""));
        if (el && window.scrollY >= el.offsetTop - 140) current = href.replace("#", "");
      });
      setActiveLink(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href.replace("#", ""));
    setDrawerOpen(false);
  };

  return (
    <>
      {/* SEARCH OVERLAY */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
      />

      {/* CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}  
      />

      {/* LOGIN MODAL */}
      <AuthPage
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        defaultTab="login"
      />

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 18 }} />}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity="success"
          sx={{
            background: INK3,
            color: TEXT,
            border: `1px solid rgba(20,180,120,0.3)`,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            "& .MuiAlert-icon": { color: "#40c090" },
          }}
        >
          <strong style={{ color: GOLD }}>{toast.name}</strong> added to bag
        </Alert>
      </Snackbar>

      {/* APP BAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: stuck ? "rgba(14,13,11,0.92)" : "transparent",
          backdropFilter: stuck ? "blur(24px)" : "none",
          borderBottom: stuck ? `1px solid ${BORDER}` : "1px solid transparent",
          transition: EASE,
          py: stuck ? 0 : "8px",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: {
                xs: "64px !important",
                md: stuck ? "64px !important" : "80px !important",
              },
              transition: "min-height 0.35s ease",
            }}
          >
            {/* Logo */}
            <Logo />

            {/* Desktop nav links */}
            <Stack
              direction="row"
              spacing={0.25}
              component="nav"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeLink === href.replace("#", "");
                return (
                  <Button
                    key={label}
                    href={href}
                    onClick={() => handleNavClick(href)}
                    sx={{
                      px: 2.25,
                      py: 1.125,
                      borderRadius: "6px",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "0.3px",
                      textTransform: "none",
                      color: isActive ? TEXT : MUTED,
                      background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                      transition: EASE,
                      "&:hover": { color: TEXT, background: "rgba(255,255,255,0.05)" },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Stack>

            {/* Right side actions */}
            <Stack direction="row" alignItems="center" spacing={1.25}>
              {/* Search icon */}
              <NavIconBtn onClick={() => setSearchOpen(true)} active={searchOpen}>
                <SearchIcon sx={{ fontSize: 18 }} />
              </NavIconBtn>

              {/* Cart icon */}
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <NavIconBtn badgeCount={cartCount} onClick={() => setCartOpen(true)}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />
                </NavIconBtn>
              </Box>

              {/* Account button - opens modal */}
              <Button
                onClick={() => setLoginModalOpen(true)}
                startIcon={<PersonOutlineIcon />}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  px: 2.75,
                  py: 1.25,
                  borderRadius: "4px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  background: GOLD,
                  color: INK,
                  '&:hover': {
                    background: GOLD2,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Account
              </Button>

              {/* Burger menu */}
              <IconButton
                onClick={() => setDrawerOpen(true)}
                size="small"
                sx={{
                  display: { xs: "flex", md: "none" },
                  width: 42,
                  height: 42,
                  borderRadius: "8px",
                  background: INK3,
                  border: `1px solid ${BORDER2}`,
                  color: TEXT,
                  transition: EASE,
                  "&:hover": { borderColor: BORDER },
                }}
              >
                <MenuIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 360 },
            background: INK,
            borderLeft: `1px solid ${BORDER}`,
          },
        }}
        sx={{ zIndex: 1300 }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2.5,
            borderBottom: `1px solid ${BORDER2}`,
          }}
        >
          <Logo />
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            sx={{
              width: 38,
              height: 38,
              borderRadius: "8px",
              background: INK3,
              border: `1px solid ${BORDER2}`,
              color: MUTED,
              "&:hover": { color: TEXT, borderColor: BORDER },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Nav links list */}
        <List sx={{ px: 2, pt: 2, pb: 1, flex: 1 }}>
          {NAV_LINKS.map(({ label, href, icon }) => {
            const isActive = activeLink === href.replace("#", "");
            return (
              <ListItem key={label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component="a"
                  href={href}
                  onClick={() => handleNavClick(href)}
                  sx={{
                    px: 2.75,
                    py: 2,
                    borderRadius: "10px",
                    border: `1px solid ${isActive ? BORDER : BORDER2}`,
                    background: isActive ? "rgba(232,160,32,0.06)" : "transparent",
                    gap: 1.75,
                    transition: EASE,
                    "&:hover": { borderColor: BORDER, background: INK3 },
                  }}
                >
                  <Box
                    sx={{
                      color: isActive ? GOLD : MUTED,
                      display: "flex",
                      "& svg": { fontSize: 22 },
                      transition: "color 0.3s",
                    }}
                  >
                    {icon}
                  </Box>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: isActive ? TEXT : MUTED,
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: GOLD,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: BORDER2, mx: 2 }} />

        {/* Drawer bottom */}
        <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => { setDrawerOpen(false); setCartOpen(true); }}
            sx={{
              px: 2.75,
              py: 1.75,
              borderRadius: "10px",
              border: `1px solid ${BORDER2}`,
              cursor: "pointer",
              transition: EASE,
              "&:hover": { borderColor: BORDER, background: INK3 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.75}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 22, color: MUTED }} />
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: MUTED }}>
                Shopping Bag
              </Typography>
            </Stack>
            <Box
              sx={{
                background: RUST,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                minWidth: 22,
                height: 22,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </Box>
          </Stack>

          {/* Account button in mobile drawer - opens modal */}
          <Button
            fullWidth
            startIcon={<AccountCircleOutlinedIcon />}
            onClick={() => {
              setDrawerOpen(false);
              setLoginModalOpen(true);
            }}
            sx={{
              py: 1.75,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              background: GOLD,
              color: INK,
              "&:hover": {
                background: GOLD2,
                boxShadow: "0 12px 32px rgba(232,160,32,0.35)",
              },
            }}
          >
            Account
          </Button>
        </Box>
      </Drawer>

      {/* Spacer */}
      <Toolbar sx={{ minHeight: { xs: "64px !important", md: "80px !important" } }} />
    </>
  );
}

// ══════════════════════════════════════════════════════════
//  DEFAULT EXPORT
// ══════════════════════════════════════════════════════════
export default function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": {
            backgroundColor: "#0e0d0b !important",
            color: "#f0ebe0",
            fontFamily: "'Outfit', sans-serif",
            margin: 0,
            padding: 0,
          },
          html: { scrollBehavior: "smooth" },
          body: { overflowX: "hidden" },
          a: { textDecoration: "none", color: "inherit" },
          "::-webkit-scrollbar": { width: "4px" },
          "::-webkit-scrollbar-track": { background: "#1a1916" },
          "::-webkit-scrollbar-thumb": { background: "#c97a18", borderRadius: "2px" },
        }}
      />
      <NavbarInner />
    </ThemeProvider>
  );
}
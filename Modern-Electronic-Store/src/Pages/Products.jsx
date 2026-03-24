import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { keyframes } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon       from "@mui/icons-material/Favorite";
import VisibilityIcon     from "@mui/icons-material/Visibility";

// ══════════════════════════════════════════════════════════════
//  TOKENS — exact :root variables from the HTML
// ══════════════════════════════════════════════════════════════
const INK    = "#0e0d0b";
const INK2   = "#1a1916";
const INK3   = "#242220";
const INK4   = "#2f2d2a";
const GOLD   = "#e8a020";
const GOLD2  = "#f5b840";
const AMBER  = "#c97a18";
const TEXT   = "#f0ebe0";
const MUTED  = "#9a9080";
const MUTED2 = "#6a6058";
const SAGE   = "#7a9e7e";
const RUST   = "#c44a1a";
const BORDER  = "rgba(232,160,32,0.12)";
const BORDER2 = "rgba(240,235,224,0.08)";
const EASE    = "all 0.35s cubic-bezier(0.4,0,0.2,1)";

// ══════════════════════════════════════════════════════════════
//  KEYFRAMES
// ══════════════════════════════════════════════════════════════
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ══════════════════════════════════════════════════════════════
//  SHARED — Eyebrow  (.eyebrow)
// ══════════════════════════════════════════════════════════════
function Eyebrow({ children }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: GOLD,
        mb: 2.5,
        "&::before": { content: '""', width: 28, height: "1.5px", background: GOLD },
        "&::after":  { content: '""', width: 8, height: 8, borderRadius: "50%", background: GOLD, opacity: 0.5 },
      }}
    >
      {children}
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  SHARED — Gold gradient text  (.gold-text)
// ══════════════════════════════════════════════════════════════
function GoldText({ children }) {
  return (
    <Box
      component="span"
      sx={{
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD2}, ${AMBER})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  TAB DATA
// ══════════════════════════════════════════════════════════════
const TABS = [
  { id: "laptops", label: "💻 Laptops"     },
  { id: "pcs",     label: "🖥️ PCs"         },
  { id: "mobiles", label: "📱 Phones"      },
  { id: "bt",      label: "🎧 Bluetooth"   },
  { id: "acc",     label: "🖱️ Accessories" },
];

// ══════════════════════════════════════════════════════════════
//  PRODUCT DATA — every card from the HTML, verbatim
// ══════════════════════════════════════════════════════════════
const PRODUCTS = {
  laptops: [
    { emoji: "💻", badge: "New",  badgeType: "new",  cat: "Laptop", name: "MacBook Air M2 13‑inch",       stars: 5, reviews: "312",  now: "₹1,14,900", was: "₹1,34,900", off: "−15%" },
    { emoji: "💻", badge: "Hot",  badgeType: "hot",  cat: "Laptop", name: "Dell XPS 15 i9 RTX 4070",      stars: 4, reviews: "189",  now: "₹1,89,999", was: "₹2,09,999", off: "−10%" },
    { emoji: "💻", badge: "−20%", badgeType: "sale", cat: "Laptop", name: "Lenovo ThinkPad X1 Carbon",    stars: 5, reviews: "254",  now: "₹1,24,990", was: "₹1,54,990", off: "−20%" },
    { emoji: "💻", badge: null,   badgeType: null,   cat: "Laptop", name: 'HP Spectre x360 OLED 14"',     stars: 4, reviews: "97",   now: "₹1,49,900", was: "₹1,69,900", off: "−12%" },
  ],
  pcs: [
    { emoji: "🖥️", badge: "New",  badgeType: "new",  cat: "Desktop",     name: 'iMac 24" M3 8-Core',         stars: 5, reviews: "211",  now: "₹1,34,900", was: "₹1,54,900", off: "−13%" },
    { emoji: "🖥️", badge: "Hot",  badgeType: "hot",  cat: "Gaming PC",   name: "Custom Build i9 + RTX 4090", stars: 5, reviews: "68",   now: "₹3,49,999", was: "₹3,89,999", off: "−10%" },
    { emoji: "🖥️", badge: null,   badgeType: null,   cat: "Office PC",   name: "Dell OptiPlex 3000 i5",      stars: 4, reviews: "143",  now: "₹52,999",   was: "₹64,999",   off: "−18%" },
    { emoji: "🖥️", badge: "−25%", badgeType: "sale", cat: "Workstation", name: "HP Z2 Tower G9 Xeon",        stars: 4, reviews: "55",   now: "₹1,87,500", was: "₹2,49,999", off: "−25%" },
  ],
  mobiles: [
    { emoji: "📱", badge: "New",  badgeType: "new",  cat: "Smartphone", name: "iPhone 16 Pro Max 256GB",    stars: 5, reviews: "876",  now: "₹1,34,900", was: "₹1,44,900", off: "−7%"  },
    { emoji: "📱", badge: "Hot",  badgeType: "hot",  cat: "Smartphone", name: "Samsung Galaxy S25 Ultra",   stars: 5, reviews: "541",  now: "₹1,29,999", was: "₹1,49,999", off: "−13%" },
    { emoji: "📱", badge: null,   badgeType: null,   cat: "Smartphone", name: "OnePlus 13 16GB RAM",        stars: 4, reviews: "388",  now: "₹69,999",   was: "₹79,999",   off: "−12%" },
    { emoji: "📱", badge: "−30%", badgeType: "sale", cat: "Smartphone", name: "Google Pixel 9 Pro XL",      stars: 5, reviews: "224",  now: "₹84,999",   was: "₹1,19,999", off: "−30%" },
  ],
  bt: [
    { emoji: "🎧", badge: "New",  badgeType: "new",  cat: "Headphones", name: "Sony WH-1000XM6 ANC",        stars: 5, reviews: "632",   now: "₹29,990",  was: "₹34,990",  off: "−14%" },
    { emoji: "🎵", badge: null,   badgeType: null,   cat: "Earbuds",    name: "Apple AirPods Pro 3",         stars: 5, reviews: "1.2K",  now: "₹26,900",  was: "₹29,900",  off: "−10%" },
    { emoji: "🔊", badge: "Hot",  badgeType: "hot",  cat: "Speaker",    name: "JBL Charge 6 Portable",      stars: 4, reviews: "445",   now: "₹12,999",  was: "₹15,999",  off: "−19%" },
    { emoji: "🎧", badge: null,   badgeType: null,   cat: "Earbuds",    name: "Samsung Galaxy Buds3 Pro",    stars: 4, reviews: "289",   now: "₹17,999",  was: "₹19,999",  off: "−10%" },
  ],
  acc: [
    { emoji: "🖱️", badge: "New",  badgeType: "new",  cat: "Mouse",    name: "Logitech MX Master 3S",        stars: 5, reviews: "892",  now: "₹9,495",   was: "₹10,995",  off: "−14%" },
    { emoji: "⌨️", badge: null,   badgeType: null,   cat: "Keyboard", name: "Keychron Q3 Mechanical",       stars: 5, reviews: "543",  now: "₹13,500",  was: "₹16,000",  off: "−16%" },
    { emoji: "💾", badge: "Hot",  badgeType: "hot",  cat: "Storage",  name: "Samsung T9 4TB Portable SSD",  stars: 4, reviews: "368",  now: "₹18,999",  was: "₹22,999",  off: "−17%" },
    { emoji: "🖥️", badge: null,   badgeType: null,   cat: "Monitor",  name: 'LG UltraWide 34" OLED',        stars: 5, reviews: "174",  now: "₹79,990",  was: "₹89,990",  off: "−11%" },
  ],
};

// badge colour map → .b-new / .b-hot / .b-sale
const BADGE_STYLE = {
  new:  { background: SAGE, color: "#fff" },
  hot:  { background: RUST, color: "#fff" },
  sale: { background: GOLD, color: INK    },
};

// ══════════════════════════════════════════════════════════════
//  PRODUCT CARD  (.pc)
// ══════════════════════════════════════════════════════════════
function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const { emoji, badge, badgeType, cat, name, stars, reviews, now, was, off } = product;

  // render ★ / ☆  exactly as HTML uses ★★★★★ / ★★★★☆
  const starStr = "★".repeat(stars) + (stars < 5 ? "☆".repeat(5 - stars) : "");

  return (
    <Box
      sx={{
        /* .pc */
        background: INK2,
        border: `1px solid ${BORDER2}`,
        borderRadius: "20px",         // --r2
        overflow: "hidden",
        transition: EASE,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        /* .pc:hover */
        "&:hover": {
          borderColor: "rgba(232,160,32,.3)",
          transform: "translateY(-6px)",
          boxShadow: "0 24px 56px rgba(0,0,0,.5)",
          "& .pc-actions":   { opacity: 1, transform: "translateY(0)" },
          "& .pc-img-inner": { transform: "scale(1.05)" },
          "& .pc-wish":      { opacity: 1 },
        },
      }}
    >
      {/* ── Image area  (.pc-img) ── */}
      <Box
        sx={{
          background: INK3,
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Badge  (.pc-badge .b-new / .b-hot / .b-sale) */}
        {badgeType && (
          <Box
            sx={{
              position: "absolute", top: 14, left: 14, zIndex: 2,
              px: "11px", py: "4px", borderRadius: "4px",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase",
              ...BADGE_STYLE[badgeType],
            }}
          >
            {badge}
          </Box>
        )}

        {/* Wishlist button  (.pc-wish) */}
        <IconButton
          className="pc-wish"
          onClick={() => setWished((w) => !w)}
          size="small"
          sx={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            width: 32, height: 32, borderRadius: "6px",
            background: "rgba(14,13,11,.7)",
            backdropFilter: "blur(8px)",
            color: wished ? "#ff6b6b" : MUTED,
            opacity: 0,                          // shown on card hover via parent
            transition: EASE,
            "&:hover": {
              color: "#ff6b6b",
              background: "rgba(255,107,107,.15)",
            },
          }}
        >
          {wished
            ? <FavoriteIcon       sx={{ fontSize: 13 }} />
            : <FavoriteBorderIcon sx={{ fontSize: 13 }} />}
        </IconButton>

        {/* Product emoji  (.pc-img-inner) */}
        <Box
          className="pc-img-inner"
          sx={{
            fontSize: 80,
            lineHeight: 1,
            display: "block",
            transition: "transform .5s ease",
            userSelect: "none",
          }}
        >
          {emoji}
        </Box>
      </Box>

      {/* ── Card body  (.pc-body) ── */}
      <Box sx={{ p: "20px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Category  (.pc-cat) */}
        <Typography
          sx={{
            fontSize: 11, color: GOLD,
            letterSpacing: "1.5px", textTransform: "uppercase",
            mb: "7px", fontWeight: 600,
          }}
        >
          {cat}
        </Typography>

        {/* Name  (.pc-name) */}
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 700,
            lineHeight: 1.3, mb: "10px",
            color: TEXT,
          }}
        >
          {name}
        </Typography>

        {/* Stars  (.pc-stars) */}
        <Stack direction="row" alignItems="center" spacing="5px" sx={{ mb: "13px" }}>
          <Typography sx={{ color: GOLD, fontSize: 11, letterSpacing: "1px" }}>
            {starStr}
          </Typography>
          <Typography sx={{ fontSize: 11, color: MUTED2 }}>
            ({reviews})
          </Typography>
        </Stack>

        {/* Price row  (.pc-price) */}
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: "16px" }}>
          {/* .pc-now */}
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 800, color: TEXT,
            }}
          >
            {now}
          </Typography>
          {/* .pc-was */}
          <Typography
            component="span"
            sx={{ fontSize: 13, color: MUTED2, textDecoration: "line-through" }}
          >
            {was}
          </Typography>
          {/* .pc-off */}
          <Box
            component="span"
            sx={{
              fontSize: 11, fontWeight: 700, color: SAGE,
              background: "rgba(122,158,126,.12)",
              px: "8px", py: "2px", borderRadius: "4px",
            }}
          >
            {off}
          </Box>
        </Stack>

        {/* Actions  (.pc-actions) — revealed on hover */}
        <Stack
          className="pc-actions"
          direction="row"
          spacing={1}
          sx={{
            opacity: 0,
            transform: "translateY(8px)",
            transition: EASE,
            mt: "auto",
          }}
        >
          {/* .pc-cart */}
          <Button
            fullWidth
            sx={{
              py: "10px",
              borderRadius: "8px",
              background: GOLD,
              color: INK,
              fontSize: 12, fontWeight: 700,
              letterSpacing: ".5px",
              textTransform: "uppercase",
              transition: EASE,
              "&:hover": { background: GOLD2 },
            }}
          >
            Add to Bag
          </Button>

          {/* .pc-eye */}
          <IconButton
            size="small"
            sx={{
              width: 38, height: 38, borderRadius: "8px",
              background: INK4,
              border: `1px solid ${BORDER2}`,
              color: MUTED,
              flexShrink: 0,
              transition: EASE,
              "&:hover": { color: GOLD },
            }}
          >
            <VisibilityIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN — Products Section
// ══════════════════════════════════════════════════════════════
export default function Products() {
  const [activeTab, setActiveTab] = useState("laptops");

  return (
    <Box
      id="products"
      component="section"
      sx={{
        /* .section  →  padding:110px 0  +  .products  →  background:var(--ink) */
        py: { xs: 8, md: 14 },
        background: INK,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>

        {/* ══ Section header (.prod-header) ══
            HTML: grid-template-columns:1fr auto; align-items:flex-end
            On mobile we stack vertically */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr auto" },
            alignItems: "flex-end",
            gap: { xs: 4, lg: "32px" },
            mb: { xs: 5, md: "56px" },
          }}
        >
          {/* Left: eyebrow + title */}
          <Box>
            <Eyebrow>Our Collection</Eyebrow>
            <Typography
              component="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: TEXT,
                animation: `${fadeUp} .75s .1s ease both`,
              }}
            >
              Explore <GoldText>Premium</GoldText>
              <br />
              Electronics
            </Typography>
          </Box>

          {/* Right: tab bar (.tab-bar) */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              background: INK3,
              padding: "5px",
              borderRadius: "14px",    // --r = 14px
              border: `1px solid ${BORDER2}`,
              alignSelf: { xs: "flex-start", lg: "flex-end" },
            }}
          >
            {TABS.map((tab) => {
              const isOn = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  disableRipple={false}
                  sx={{
                    /* .tab-btn */
                    px: "20px", py: "9px",
                    borderRadius: "10px",
                    fontSize: 13,
                    fontWeight: isOn ? 700 : 500,
                    color: isOn ? INK : MUTED,
                    background: isOn ? GOLD : "transparent",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    transition: EASE,
                    /* .tab-btn:hover:not(.on) */
                    "&:hover": {
                      color: isOn ? INK : TEXT,
                      background: isOn ? GOLD : "transparent",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* ══ Product grid (.prod-grid.on) ══
            HTML: grid-template-columns:repeat(4,1fr); gap:20px
            Responsive: 1 col → 2 col → 3 col → 4 col */}
        <Box
          key={activeTab}           // re-mounts on tab change → triggers fadeIn
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, md: "20px" },
            animation: `${fadeIn} .4s ease`,   // .prod-grid.on { animation:fadeIn .4s ease }
          }}
        >
          {PRODUCTS[activeTab].map((product, i) => (
            <ProductCard key={`${activeTab}-${i}`} product={product} />
          ))}
        </Box>

      </Container>
    </Box>
  );
}

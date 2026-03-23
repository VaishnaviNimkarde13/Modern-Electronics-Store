import { useState, useEffect, useRef } from "react";
import {
  Box, Container, Typography, Button, Stack, Grid,
  IconButton, TextField, Select, MenuItem, FormControl,
  InputLabel, Chip,
} from "@mui/material";
import { keyframes } from "@mui/system";

// ─── Icons ───────────────────────────────────────────────────
import BoltIcon          from "@mui/icons-material/Bolt";
import BuildIcon         from "@mui/icons-material/Build";
import ShoppingBagIcon   from "@mui/icons-material/ShoppingBag";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import FavoriteIcon      from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon  from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon  from "@mui/icons-material/RocketLaunch";
import LockIcon          from "@mui/icons-material/Lock";
import ConstructionIcon  from "@mui/icons-material/Construction";
import SupportAgentIcon  from "@mui/icons-material/SupportAgent";
import PlaceIcon         from "@mui/icons-material/Place";
import PhoneIcon         from "@mui/icons-material/Phone";
import EmailIcon         from "@mui/icons-material/Email";
import AccessTimeIcon    from "@mui/icons-material/AccessTime";
import MapIcon           from "@mui/icons-material/Map";
import SendIcon          from "@mui/icons-material/Send";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StarIcon          from "@mui/icons-material/Star";

// ══════════════════════════════════════════════════════════════
//  TOKENS
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
const RUST   = "#c44a1a";
const SAGE   = "#7a9e7e";
const BORDER  = "rgba(232,160,32,0.12)";
const BORDER2 = "rgba(240,235,224,0.08)";
const EASE    = "all 0.35s cubic-bezier(0.4,0,0.2,1)";

// ── Keyframes ─────────────────────────────────────────────────
const float = keyframes`
  0%,100%{ transform: translateY(0) rotate(-1deg); }
  50%    { transform: translateY(-18px) rotate(1deg); }
`;
const spinSlow = keyframes`to{ transform: rotate(360deg); }`;
const marquee  = keyframes`from{ transform: translateX(0); } to{ transform: translateX(-50%); }`;
const fadeUp   = keyframes`from{ opacity:0; transform:translateY(36px); } to{ opacity:1; transform:none; }`;
const pulse    = keyframes`0%,100%{ opacity:1; } 50%{ opacity:.4; }`;
const shimmer  = keyframes`0%{ left:-100%; } 100%{ left:200%; }`;

// ══════════════════════════════════════════════════════════════
//  SHARED ATOMS
// ══════════════════════════════════════════════════════════════
function Eyebrow({ children }) {
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      fontSize: 11, fontWeight: 600, letterSpacing: "3px",
      textTransform: "uppercase", color: GOLD, mb: 2.5,
      "&::before": { content: '""', width: 28, height: "1.5px", background: GOLD },
      "&::after":  { content: '""', width: 8,  height: 8, borderRadius: "50%", background: GOLD, opacity: .5 },
    }}>
      {children}
    </Box>
  );
}

function GoldText({ children, component = "span" }) {
  return (
    <Box component={component} sx={{
      background: `linear-gradient(135deg, ${GOLD}, ${GOLD2}, ${AMBER})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {children}
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  1. HERO SECTION
// ══════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: "80px",
        background: `
          radial-gradient(ellipse 55% 65% at 80% 40%, rgba(232,160,32,.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 50% at 10% 70%, rgba(196,74,26,.06) 0%, transparent 70%),
          linear-gradient(160deg, ${INK} 0%, #12100e 100%)
        `,
      }}
    >
      {/* Decorative grid lines */}
      <Box sx={{
        position: "absolute", inset: 0, overflow: "hidden", opacity: .04, pointerEvents: "none",
        "&::before": { content:'""', position:"absolute", left:"55%", top:0, bottom:0, width:"1px", background:GOLD },
        "&::after":  { content:'""', position:"absolute", top:"55%", left:0, right:0, height:"1px", background:GOLD },
      }} />

      {/* Spinning ring */}
      <Box sx={{
        display: { xs: "none", lg: "block" },
        position: "absolute", right: "6%", top: "50%",
        transform: "translateY(-50%)",
        width: 520, height: 520, borderRadius: "50%",
        border: `1px solid rgba(232,160,32,.1)`,
        animation: `${spinSlow} 30s linear infinite`,
        pointerEvents: "none",
        "&::before": { content:'""', position:"absolute", inset:40, borderRadius:"50%", border:`1px dashed rgba(232,160,32,.07)` },
        "&::after":  { content:'""', position:"absolute", inset:100, borderRadius:"50%", border:`1px solid rgba(232,160,32,.05)` },
      }} />

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

          {/* ── Left ── */}
          <Grid item xs={12} md={6}>
            {/* Pre-label */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3.5, animation: `${fadeUp} .7s ease both` }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, animation: `${pulse} 2s ease infinite`, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 500, letterSpacing: "2px", color: MUTED, textTransform: "uppercase" }}>
                New Season — 2025 Collection
              </Typography>
            </Stack>

            {/* Title */}
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "clamp(40px,10vw,58px)", md: "clamp(44px,5.5vw,82px)" },
                fontWeight: 900, lineHeight: 1.05,
                mb: 3.5, letterSpacing: "-1px",
                animation: `${fadeUp} .75s .1s ease both`,
                color: TEXT,
              }}
            >
              The Future<br />
              of <Box component="em" sx={{ fontStyle: "italic", color: GOLD }}>Technology</Box><br />
              Is Here.
            </Typography>

            {/* Sub */}
            <Typography sx={{
              fontSize: { xs: 15, md: 16 }, lineHeight: 1.8, color: MUTED,
              maxWidth: 480, mb: 5.5, fontWeight: 300,
              animation: `${fadeUp} .75s .2s ease both`,
            }}>
              Premium laptops, smartphones, PCs &amp; accessories. Expert repair services. All under one roof in Pune.
            </Typography>

            {/* CTAs */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap"
              sx={{ animation: `${fadeUp} .75s .3s ease both` }}
            >
              <Button
                href="#products"
                startIcon={<BoltIcon />}
                sx={{
                  px: 4, py: 1.875, borderRadius: "4px",
                  fontSize: 13, fontWeight: 700, letterSpacing: ".8px",
                  textTransform: "uppercase",
                  background: GOLD, color: INK,
                  position: "relative", overflow: "hidden",
                  "&::before": {
                    content:'""', position:"absolute", inset:0,
                    background:"rgba(255,255,255,.06)",
                    transform:"translateX(-100%)", transition:"transform .4s ease",
                  },
                  "&:hover": { background: GOLD2, transform: "translateY(-2px)", boxShadow: `0 12px 32px rgba(232,160,32,.35)`, "&::before": { transform:"translateX(0)" } },
                }}
              >Shop Collection</Button>

              <Button
                href="#services"
                startIcon={<BuildIcon />}
                sx={{
                  px: 4, py: 1.875, borderRadius: "4px",
                  fontSize: 13, fontWeight: 700, letterSpacing: ".8px",
                  textTransform: "uppercase",
                  border: `1.5px solid rgba(232,160,32,.4)`, color: GOLD,
                  "&:hover": { borderColor: GOLD, background: "rgba(232,160,32,.06)", transform: "translateY(-2px)" },
                }}
              >View Services</Button>
            </Stack>

            {/* Trust row */}
            <Stack direction="row" alignItems="center" spacing={3}
              sx={{
                mt: 6.5, pt: 4.5, borderTop: `1px solid ${BORDER2}`,
                animation: `${fadeUp} .75s .4s ease both`,
                flexWrap: "wrap", gap: 2,
              }}
            >
              <Stack direction="row">
                {["R","P","A","+"].map((l, i) => (
                  <Box key={l} sx={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${GOLD}, ${AMBER})`,
                    border: `2px solid ${INK}`,
                    ml: i === 0 ? 0 : "-10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: INK,
                    fontFamily: "'Playfair Display', serif",
                  }}>{l}</Box>
                ))}
              </Stack>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: TEXT, mb: .25 }}>12,000+ Happy Customers</Typography>
                <Typography sx={{ fontSize: 13, color: MUTED }}>Rated 4.9★ across Google &amp; JustDial</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* ── Right: Showcase Card ── */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", animation: `${fadeUp} .9s .3s ease both` }}>
              <Box sx={{
                background: `linear-gradient(145deg, ${INK3}, ${INK2})`,
                border: `1px solid ${BORDER}`,
                borderRadius: "20px",
                p: { xs: 3, sm: 5 },
                position: "relative", overflow: "hidden",
                "&::before": {
                  content:'""', position:"absolute", top:-60, right:-60,
                  width:200, height:200, borderRadius:"50%",
                  background:"radial-gradient(circle,rgba(232,160,32,.08),transparent 70%)",
                },
              }}>
                <Box sx={{
                  position: "absolute", top: 20, left: 20,
                  background: RUST, color: "#fff",
                  fontSize: 11, fontWeight: 700, letterSpacing: "1px",
                  textTransform: "uppercase", px: 1.75, py: .625, borderRadius: "4px",
                }}>🔥 Best Seller</Box>

                <Box sx={{
                  fontSize: { xs: 80, sm: 110 }, textAlign: "center",
                  display: "block", my: 3,
                  animation: `${float} 5s ease-in-out infinite`,
                  filter: "drop-shadow(0 24px 48px rgba(232,160,32,.2))",
                  lineHeight: 1,
                }}>💻</Box>

                <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:800, mb:.75 }}>
                  MacBook Pro M3 Max
                </Typography>
                <Typography sx={{ fontSize:13, color:MUTED, mb:2.5 }}>16" · 36GB RAM · 1TB SSD</Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography component="del" sx={{ fontSize:14, color:MUTED2, display:"block" }}>₹2,49,900</Typography>
                    <GoldText>
                      <Typography sx={{ fontSize:30, fontWeight:700, fontFamily:"'Playfair Display',serif" }}>₹1,89,900</Typography>
                    </GoldText>
                  </Box>
                  <Button
                    startIcon={<ShoppingBagIcon sx={{ fontSize:16 }} />}
                    sx={{
                      px:2.75, py:1.5, borderRadius:"6px",
                      background:GOLD, color:INK, fontWeight:700, fontSize:13,
                      "&:hover": { background:GOLD2, transform:"scale(1.04)" },
                    }}
                  >Add to Bag</Button>
                </Stack>
              </Box>

              {/* Floating chip 1 */}
              <Box sx={{
                position:"absolute", bottom:-20, left:{ xs:-10, sm:-28 },
                background:INK4, border:`1px solid ${BORDER2}`,
                borderRadius:"10px", px:2, py:1.5,
                display:"flex", alignItems:"center", gap:1.25,
                animation:`${float} 4s 1s ease-in-out infinite`,
              }}>
                <Typography sx={{ fontSize:20 }}>⭐</Typography>
                <Box>
                  <Typography sx={{ fontSize:14, fontWeight:700, color:TEXT }}>4.9 / 5</Typography>
                  <Typography sx={{ fontSize:11, color:MUTED }}>12K+ Reviews</Typography>
                </Box>
              </Box>

              {/* Floating chip 2 */}
              <Box sx={{
                position:"absolute", top:-20, right:{ xs:-10, sm:-24 },
                background:INK4, border:`1px solid ${BORDER2}`,
                borderRadius:"10px", px:2, py:1.5,
                display:"flex", alignItems:"center", gap:1.25,
                animation:`${float} 3.5s .5s ease-in-out infinite`,
              }}>
                <Typography sx={{ fontSize:20 }}>🚚</Typography>
                <Box>
                  <Typography sx={{ fontSize:14, fontWeight:700, color:TEXT }}>Free Delivery</Typography>
                  <Typography sx={{ fontSize:11, color:MUTED }}>Above ₹999</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  2. TICKER / MARQUEE
// ══════════════════════════════════════════════════════════════
const TICKER_ITEMS = [
  "💻 Laptops up to 25% off",
  "📱 iPhone 16 Pro in stock",
  "🔧 Same-day repair service",
  "🎧 Sony & Apple headphones",
  "🖥️ Gaming PCs available",
  "📦 EMI 0% interest",
];

function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box sx={{ py: 2, background: GOLD, overflow: "hidden" }}>
      <Box sx={{ display: "flex", animation: `${marquee} 25s linear infinite`, whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <Box key={i} component="span" sx={{
            display: "inline-flex", alignItems: "center", gap: 2,
            px: 4, fontSize: 13, fontWeight: 700,
            color: INK, textTransform: "uppercase", letterSpacing: "1px",
          }}>
            {item}
            <Box component="span" sx={{ color: AMBER, fontSize: 18 }}>✦</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  3. STATS STRIP
// ══════════════════════════════════════════════════════════════
const STATS = [
  { num: "5,000+", lbl: "Products Available" },
  { num: "12K+",   lbl: "Happy Customers"    },
  { num: "8 Yrs",  lbl: "Trusted in Pune"    },
];

function StatsSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: INK2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={0}>
          {STATS.map((s, i) => (
            <Grid item xs={12} sm={4} key={s.lbl}>
              <Box sx={{
                textAlign: i === 1 ? "center" : i === 2 ? { xs: "left", sm: "right" } : "left",
                px: { xs: 0, sm: 4 },
                py: { xs: 3, sm: 0 },
                borderBottom: { xs: i < 2 ? `1px solid ${BORDER2}` : "none", sm: "none" },
                borderRight: { xs: "none", sm: i < 2 ? `1px solid ${BORDER2}` : "none" },
              }}>
                <GoldText>
                  <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:{ xs:44, md:52 }, fontWeight:900, lineHeight:1, mb:1 }}>
                    {s.num}
                  </Typography>
                </GoldText>
                <Typography sx={{ fontSize:14, color:MUTED, fontWeight:400 }}>{s.lbl}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  4. PRODUCTS SECTION
// ══════════════════════════════════════════════════════════════
const TABS = [
  { id:"laptops",  label:"💻 Laptops"     },
  { id:"pcs",      label:"🖥️ PCs"         },
  { id:"mobiles",  label:"📱 Phones"      },
  { id:"bt",       label:"🎧 Bluetooth"   },
  { id:"acc",      label:"🖱️ Accessories" },
];

const PRODUCTS = {
  laptops: [
    { emoji:"💻", badge:"New",  badgeType:"new",  cat:"Laptop",    name:"MacBook Air M2 13‑inch",       stars:5, reviews:312,  now:"₹1,14,900", was:"₹1,34,900", off:"−15%" },
    { emoji:"💻", badge:"Hot",  badgeType:"hot",  cat:"Laptop",    name:"Dell XPS 15 i9 RTX 4070",      stars:4, reviews:189,  now:"₹1,89,999", was:"₹2,09,999", off:"−10%" },
    { emoji:"💻", badge:"−20%", badgeType:"sale", cat:"Laptop",    name:"Lenovo ThinkPad X1 Carbon",    stars:5, reviews:254,  now:"₹1,24,990", was:"₹1,54,990", off:"−20%" },
    { emoji:"💻", badge:null,   badgeType:null,   cat:"Laptop",    name:'HP Spectre x360 OLED 14"',     stars:4, reviews:97,   now:"₹1,49,900", was:"₹1,69,900", off:"−12%" },
  ],
  pcs: [
    { emoji:"🖥️", badge:"New",  badgeType:"new",  cat:"Desktop",     name:"iMac 24\" M3 8-Core",         stars:5, reviews:211,  now:"₹1,34,900", was:"₹1,54,900", off:"−13%" },
    { emoji:"🖥️", badge:"Hot",  badgeType:"hot",  cat:"Gaming PC",   name:"Custom Build i9 + RTX 4090",  stars:5, reviews:68,   now:"₹3,49,999", was:"₹3,89,999", off:"−10%" },
    { emoji:"🖥️", badge:null,   badgeType:null,   cat:"Office PC",   name:"Dell OptiPlex 3000 i5",       stars:4, reviews:143,  now:"₹52,999",   was:"₹64,999",   off:"−18%" },
    { emoji:"🖥️", badge:"−25%", badgeType:"sale", cat:"Workstation", name:"HP Z2 Tower G9 Xeon",         stars:4, reviews:55,   now:"₹1,87,500", was:"₹2,49,999", off:"−25%" },
  ],
  mobiles: [
    { emoji:"📱", badge:"New",  badgeType:"new",  cat:"Smartphone", name:"iPhone 16 Pro Max 256GB",      stars:5, reviews:876,  now:"₹1,34,900", was:"₹1,44,900", off:"−7%"  },
    { emoji:"📱", badge:"Hot",  badgeType:"hot",  cat:"Smartphone", name:"Samsung Galaxy S25 Ultra",     stars:5, reviews:541,  now:"₹1,29,999", was:"₹1,49,999", off:"−13%" },
    { emoji:"📱", badge:null,   badgeType:null,   cat:"Smartphone", name:"OnePlus 13 16GB RAM",          stars:4, reviews:388,  now:"₹69,999",   was:"₹79,999",   off:"−12%" },
    { emoji:"📱", badge:"−30%", badgeType:"sale", cat:"Smartphone", name:"Google Pixel 9 Pro XL",        stars:5, reviews:224,  now:"₹84,999",   was:"₹1,19,999", off:"−30%" },
  ],
  bt: [
    { emoji:"🎧", badge:"New",  badgeType:"new",  cat:"Headphones", name:"Sony WH-1000XM6 ANC",          stars:5, reviews:632,  now:"₹29,990",   was:"₹34,990",   off:"−14%" },
    { emoji:"🎵", badge:null,   badgeType:null,   cat:"Earbuds",    name:"Apple AirPods Pro 3",           stars:5, reviews:1200, now:"₹26,900",   was:"₹29,900",   off:"−10%" },
    { emoji:"🔊", badge:"Hot",  badgeType:"hot",  cat:"Speaker",    name:"JBL Charge 6 Portable",        stars:4, reviews:445,  now:"₹12,999",   was:"₹15,999",   off:"−19%" },
    { emoji:"🎧", badge:null,   badgeType:null,   cat:"Earbuds",    name:"Samsung Galaxy Buds3 Pro",     stars:4, reviews:289,  now:"₹17,999",   was:"₹19,999",   off:"−10%" },
  ],
  acc: [
    { emoji:"🖱️", badge:"New",  badgeType:"new",  cat:"Mouse",    name:"Logitech MX Master 3S",         stars:5, reviews:892,  now:"₹9,495",    was:"₹10,995",   off:"−14%" },
    { emoji:"⌨️", badge:null,   badgeType:null,   cat:"Keyboard", name:"Keychron Q3 Mechanical",        stars:5, reviews:543,  now:"₹13,500",   was:"₹16,000",   off:"−16%" },
    { emoji:"💾", badge:"Hot",  badgeType:"hot",  cat:"Storage",  name:"Samsung T9 4TB Portable SSD",   stars:4, reviews:368,  now:"₹18,999",   was:"₹22,999",   off:"−17%" },
    { emoji:"🖥️", badge:null,   badgeType:null,   cat:"Monitor",  name:'LG UltraWide 34" OLED',         stars:5, reviews:174,  now:"₹79,990",   was:"₹89,990",   off:"−11%" },
  ],
};

const BADGE_COLORS = {
  new:  { bg: SAGE,  color: "#fff" },
  hot:  { bg: RUST,  color: "#fff" },
  sale: { bg: GOLD,  color: INK   },
};

function ProductCard({ p }) {
  const [wished, setWished] = useState(false);
  const bc = p.badgeType ? BADGE_COLORS[p.badgeType] : null;
  return (
    <Box sx={{
      background: INK2, border: `1px solid ${BORDER2}`,
      borderRadius: "20px", overflow: "hidden",
      transition: EASE, position: "relative",
      "&:hover": {
        borderColor: "rgba(232,160,32,.3)",
        transform: "translateY(-6px)",
        boxShadow: "0 24px 56px rgba(0,0,0,.5)",
        "& .pc-actions": { opacity: 1, transform: "translateY(0)" },
        "& .pc-emoji": { transform: "scale(1.05)" },
        "& .pc-wish-btn": { opacity: 1 },
      },
    }}>
      {/* Image area */}
      <Box sx={{
        background: INK3, aspectRatio: "1",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        {bc && (
          <Box sx={{
            position:"absolute", top:14, left:14, zIndex:2,
            background: bc.bg, color: bc.color,
            fontSize:10, fontWeight:700, letterSpacing:"1px",
            textTransform:"uppercase", px:1.375, py:.5, borderRadius:"4px",
          }}>{p.badge}</Box>
        )}
        <IconButton
          className="pc-wish-btn"
          onClick={() => setWished(w => !w)}
          sx={{
            position:"absolute", top:14, right:14, zIndex:2,
            width:32, height:32, borderRadius:"6px",
            background:"rgba(14,13,11,.7)", backdropFilter:"blur(8px)",
            color: wished ? "#ff6b6b" : MUTED,
            opacity:0, transition:EASE,
            "&:hover": { color:"#ff6b6b", background:"rgba(255,107,107,.15)" },
          }}
        >
          {wished ? <FavoriteIcon sx={{fontSize:14}} /> : <FavoriteBorderIcon sx={{fontSize:14}} />}
        </IconButton>
        <Box className="pc-emoji" sx={{ fontSize:80, lineHeight:1, transition:"transform .5s ease", display:"block" }}>
          {p.emoji}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontSize:11, color:GOLD, letterSpacing:"1.5px", textTransform:"uppercase", mb:.875, fontWeight:600 }}>
          {p.cat}
        </Typography>
        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, lineHeight:1.3, mb:1.25 }}>
          {p.name}
        </Typography>
        {/* Stars */}
        <Stack direction="row" alignItems="center" spacing={.625} sx={{ mb:1.625 }}>
          {[1,2,3,4,5].map(s => (
            <StarIcon key={s} sx={{ fontSize:11, color: s <= p.stars ? GOLD : MUTED2 }} />
          ))}
          <Typography sx={{ fontSize:11, color:MUTED2 }}>({p.reviews})</Typography>
        </Stack>
        {/* Price */}
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb:2 }}>
          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:800, color:TEXT }}>
            {p.now}
          </Typography>
          <Typography component="del" sx={{ fontSize:13, color:MUTED2 }}>{p.was}</Typography>
          <Box sx={{
            fontSize:11, fontWeight:700, color:SAGE,
            background:"rgba(122,158,126,.12)", px:1, py:.25, borderRadius:"4px",
          }}>{p.off}</Box>
        </Stack>
        {/* Actions */}
        <Stack
          className="pc-actions"
          direction="row" spacing={1}
          sx={{ opacity:0, transform:"translateY(8px)", transition:EASE }}
        >
          <Button
            fullWidth
            sx={{
              py:1.25, borderRadius:"8px",
              background:GOLD, color:INK,
              fontSize:12, fontWeight:700, letterSpacing:".5px", textTransform:"uppercase",
              "&:hover": { background:GOLD2 },
            }}
          >Add to Bag</Button>
          <IconButton sx={{
            width:38, height:38, borderRadius:"8px",
            background:INK4, border:`1px solid ${BORDER2}`,
            color:MUTED,
            "&:hover": { color:GOLD },
          }}>
            <VisibilityIcon sx={{ fontSize:16 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

function ProductsSection() {
  const [activeTab, setActiveTab] = useState("laptops");
  return (
    <Box component="section" id="products" sx={{ py: { xs: 8, md: 14 }, background: INK }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

        {/* Header row */}
        <Box sx={{
          display:"flex", flexDirection:{ xs:"column", lg:"row" },
          alignItems:{ xs:"flex-start", lg:"flex-end" },
          justifyContent:"space-between", gap:4, mb:7,
        }}>
          <Box>
            <Eyebrow>Our Collection</Eyebrow>
            <Typography sx={{
              fontFamily:"'Playfair Display',serif",
              fontSize:{ xs:"clamp(28px,8vw,52px)", md:"clamp(28px,4vw,52px)" },
              fontWeight:900, lineHeight:1.1, color:TEXT,
            }}>
              Explore <GoldText>Premium</GoldText><br />Electronics
            </Typography>
          </Box>

          {/* Tab bar */}
          <Box sx={{
            display:"flex", gap:.5, flexWrap:"wrap",
            background:INK3, p:.625, borderRadius:"14px",
            border:`1px solid ${BORDER2}`,
          }}>
            {TABS.map(t => (
              <Button key={t.id} onClick={() => setActiveTab(t.id)} sx={{
                px:2.5, py:1.125, borderRadius:"10px",
                fontSize:13, fontWeight: activeTab===t.id ? 700 : 500,
                textTransform:"none", whiteSpace:"nowrap",
                color: activeTab===t.id ? INK : MUTED,
                background: activeTab===t.id ? GOLD : "transparent",
                transition:EASE,
                "&:hover:not(:disabled)": { color: activeTab===t.id ? INK : TEXT },
              }}>{t.label}</Button>
            ))}
          </Box>
        </Box>

        {/* Product grid */}
        <Box sx={{
          display:"grid",
          gridTemplateColumns:{ xs:"1fr", sm:"1fr 1fr", md:"repeat(3,1fr)", lg:"repeat(4,1fr)" },
          gap:2.5,
          animation:`${fadeUp} .4s ease both`,
          key: activeTab,
        }}>
          {PRODUCTS[activeTab].map((p, i) => (
            <ProductCard key={`${activeTab}-${i}`} p={p} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  5. FEATURE STRIP
// ══════════════════════════════════════════════════════════════
const FEATURES = [
  { icon:"🚀", title:"Fast Delivery",    sub:"Same-day dispatch on all in-stock orders above ₹999" },
  { icon:"🔒", title:"Genuine Products", sub:"100% authentic with official brand warranty included" },
  { icon:"🛠️", title:"Expert Repair",    sub:"Certified technicians, genuine parts, 90-day service warranty" },
  { icon:"💬", title:"24/7 Support",     sub:"WhatsApp, call, or visit — we're always here to help you" },
];

function FeaturesStrip() {
  return (
    <Box sx={{ py: { xs: 5, md: 9 }, background: INK3, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container sx={{ background: BORDER2 }}>
          {FEATURES.map((f, i) => (
            <Grid item xs={6} md={3} key={f.title}>
              <Box sx={{
                p: { xs: 3, md: 4.5 },
                textAlign: "center",
                background: INK3,
                borderRight: { xs: i % 2 === 0 ? `1px solid ${BORDER2}` : "none", md: i < 3 ? `1px solid ${BORDER2}` : "none" },
                borderBottom: { xs: i < 2 ? `1px solid ${BORDER2}` : "none", md: "none" },
                transition: EASE,
                "&:hover": { background: INK4 },
              }}>
                <Typography sx={{ fontSize: 32, mb: 1.75, display: "block" }}>{f.icon}</Typography>
                <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, mb:1, color:TEXT }}>
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{f.sub}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  6. SERVICES SECTION
// ══════════════════════════════════════════════════════════════
const SERVICES = [
  {
    num:"01", icon:"💻", title:"Laptop Repair", price:"Starting ₹499",
    desc:"Complete diagnosis and repair for all laptop brands — Apple, Dell, HP, Lenovo, Asus, and more.",
    items:["Screen & Display Replacement","Battery & Charging Port","Motherboard Repair","Data Recovery Services","Keyboard & Trackpad Fix"],
  },
  {
    num:"02", icon:"🖥️", title:"PC / Desktop Repair", price:"Starting ₹699",
    desc:"Full servicing, hardware upgrades, OS installs, and virus removal for desktops and all-in-ones.",
    items:["Hardware Upgrade (RAM/SSD)","Virus & Malware Removal","OS Installation & Setup","Power Supply Repair","Graphics Card Repair"],
  },
  {
    num:"03", icon:"📱", title:"Mobile Repair", price:"Starting ₹299",
    desc:"Cracked screens, dead batteries, water damage — most mobile repairs completed within 60 minutes.",
    items:["Screen & Glass Replacement","Battery Replacement","Water Damage Treatment","Camera & Speaker Repair","Charging Port Repair"],
  },
];

function ServicesSection() {
  return (
    <Box component="section" id="services" sx={{ py: { xs: 8, md: 14 }, background: INK2 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Eyebrow>What We Fix</Eyebrow>
        <Typography sx={{
          fontFamily:"'Playfair Display',serif",
          fontSize:{ xs:"clamp(28px,8vw,52px)", md:"clamp(28px,4vw,52px)" },
          fontWeight:900, lineHeight:1.1, mb:1.5, color:TEXT,
        }}>
          Repair Services<br /><GoldText>Done Right.</GoldText>
        </Typography>
        <Typography sx={{ fontSize:15, color:MUTED, maxWidth:500, lineHeight:1.8, fontWeight:300, mb:7.5 }}>
          Certified technicians, genuine spare parts, fast turnaround. All repairs come with a 90-day service warranty.
        </Typography>

        <Grid container spacing={3}>
          {SERVICES.map((sv, i) => (
            <Grid item xs={12} md={4} key={sv.num}>
              <Box sx={{
                background: INK, border: `1px solid ${BORDER2}`,
                borderRadius:"20px", p:{ xs:3.5, md:5 },
                position:"relative", overflow:"hidden",
                height:"100%", display:"flex", flexDirection:"column",
                transition:EASE,
                "&::after": {
                  content:'""', position:"absolute", bottom:0, left:0, right:0, height:"3px",
                  background:`linear-gradient(90deg, ${AMBER}, ${GOLD}, transparent)`,
                  transform:"scaleX(0)", transformOrigin:"left", transition:"transform .45s ease",
                },
                "&:hover": {
                  transform:"translateY(-5px)",
                  borderColor:BORDER,
                  boxShadow:"0 20px 60px rgba(0,0,0,.4)",
                  "&::after": { transform:"scaleX(1)" },
                  "& .sv-icon-box": { background:"rgba(232,160,32,.12)", borderColor:BORDER },
                },
              }}>
                <Typography sx={{
                  fontFamily:"'Playfair Display',serif", fontSize:52, fontWeight:900,
                  color:"rgba(232,160,32,.1)", lineHeight:1, mb:2.5,
                }}>{sv.num}</Typography>

                <Box className="sv-icon-box" sx={{
                  width:60, height:60, borderRadius:"12px",
                  background:INK3, border:`1px solid ${BORDER}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:26, mb:3, transition:EASE,
                }}>{sv.icon}</Box>

                <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:800, mb:1.5, color:TEXT }}>
                  {sv.title}
                </Typography>

                <Box sx={{
                  display:"inline-block", px:2, py:.75, borderRadius:"4px",
                  background:"rgba(232,160,32,.1)", border:`1px solid ${BORDER}`,
                  fontSize:12, fontWeight:700, color:GOLD, letterSpacing:".5px", mb:2.75,
                }}>{sv.price}</Box>

                <Typography sx={{ fontSize:14, color:MUTED, lineHeight:1.8, mb:2.75, fontWeight:300, flex:1 }}>
                  {sv.desc}
                </Typography>

                <Box component="ul" sx={{ listStyle:"none", p:0, m:0, mb:3 }}>
                  {sv.items.map(item => (
                    <Box component="li" key={item} sx={{
                      display:"flex", alignItems:"center", gap:1.25,
                      fontSize:13, color:MUTED, py:.875,
                      borderBottom:`1px solid rgba(255,255,255,.04)`,
                      "&:last-child": { border:"none" },
                      "&::before": { content:'"→"', color:GOLD, fontSize:12, flexShrink:0 },
                    }}>{item}</Box>
                  ))}
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}
                  component="a" href="#contact"
                  sx={{
                    fontSize:13, fontWeight:600, color:GOLD,
                    letterSpacing:".3px", textDecoration:"none",
                    transition:EASE, width:"fit-content",
                    "&:hover": { gap:"14px" },
                  }}
                >
                  <span>Book Appointment</span>
                  <ArrowForwardIcon sx={{ fontSize:14 }} />
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  7. PROMO SECTION
// ══════════════════════════════════════════════════════════════
function useCountdown(initH, initM, initS) {
  const [h, setH] = useState(initH);
  const [m, setM] = useState(initM);
  const [s, setS] = useState(initS);
  useEffect(() => {
    const id = setInterval(() => {
      setS(cs => {
        if (cs > 0) return cs - 1;
        setM(cm => {
          if (cm > 0) return cm - 1;
          setH(ch => ch > 0 ? ch - 1 : 23);
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return [h, m, s];
}

function PromoSection() {
  const [h, m, s] = useCountdown(8, 32, 47);
  const pad = n => String(n).padStart(2,"0");

  const PROMO_SIDE = [
    { eyebrow:"🔧 Repair Offer", title:"Free Diagnosis on Any Device",         sub:"Bring in your laptop, PC, or phone — get a free diagnostic report with no obligation.",              link:"Book Free Check" },
    { eyebrow:"📦 Bulk Orders",  title:"Corporate & Institutional Pricing",    sub:"Special rates for schools, offices & businesses ordering 5+ units of any product.",                 link:"Get a Quote"     },
    { eyebrow:"💳 Easy Finance", title:"0% EMI on All Orders",                 sub:"Split your purchase into 3, 6, or 12 months with zero interest via any major bank card.",            link:"Learn More"      },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Main promo */}
          <Grid item xs={12} lg={7}>
            <Box sx={{
              background:"linear-gradient(135deg, #1c1409, #2a1e08)",
              border:`1px solid rgba(232,160,32,.2)`,
              borderRadius:"20px", p:{ xs:4, sm:7.5 },
              position:"relative", overflow:"hidden", height:"100%",
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              "&::before": {
                content:'""', position:"absolute", top:-80, right:-80,
                width:300, height:300, borderRadius:"50%",
                background:"radial-gradient(circle, rgba(232,160,32,.12), transparent 65%)",
                pointerEvents:"none",
              },
            }}>
              <Box sx={{ position:"relative", zIndex:1 }}>
                <Typography sx={{ fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:GOLD, mb:1.75 }}>
                  ⚡ Limited Time
                </Typography>
                <Typography sx={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:{ xs:"clamp(26px,7vw,42px)", md:"clamp(26px,3vw,42px)" },
                  fontWeight:900, lineHeight:1.1, mb:2,
                }}>
                  Mega Tech<br />
                  <Box component="span" sx={{ color:GOLD }}>Sale — 40% Off</Box>
                </Typography>
                <Typography sx={{ fontSize:15, color:MUTED, lineHeight:1.7, mb:4.5, fontWeight:300, maxWidth:420 }}>
                  Our biggest sale of the year. Grab premium devices at unbeatable prices. Offer ends soon — don't miss it.
                </Typography>

                {/* Countdown */}
                <Stack direction="row" spacing={1.5} sx={{ mb:4.5, flexWrap:"wrap", gap:1.5 }}>
                  {[[pad(h),"Hours"],[pad(m),"Mins"],[pad(s),"Secs"]].map(([n,l]) => (
                    <Box key={l} sx={{
                      background:"rgba(0,0,0,.3)", border:`1px solid rgba(232,160,32,.2)`,
                      borderRadius:"8px", px:2.25, py:1.5, textAlign:"center", minWidth:68,
                    }}>
                      <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:GOLD, lineHeight:1 }}>{n}</Typography>
                      <Typography sx={{ fontSize:10, color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase", mt:.5 }}>{l}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button href="#products" startIcon={<BoltIcon />} sx={{
                    px:4, py:1.875, borderRadius:"4px",
                    fontSize:13, fontWeight:700, letterSpacing:".8px", textTransform:"uppercase",
                    background:GOLD, color:INK,
                    "&:hover": { background:GOLD2, transform:"translateY(-2px)", boxShadow:`0 12px 32px rgba(232,160,32,.35)` },
                  }}>Shop Sale</Button>
                  <Button href="#contact" startIcon={<PhoneCallbackIcon />} sx={{
                    px:4, py:1.875, borderRadius:"4px",
                    fontSize:13, fontWeight:700, letterSpacing:".8px", textTransform:"uppercase",
                    background:INK3, color:TEXT, border:`1px solid ${BORDER2}`,
                    "&:hover": { background:INK4, transform:"translateY(-2px)" },
                  }}>Call Now</Button>
                </Stack>
              </Box>
              <Typography sx={{ fontSize:100, position:"absolute", bottom:-10, right:30, opacity:.4, pointerEvents:"none" }}>🎯</Typography>
            </Box>
          </Grid>

          {/* Side promos */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3} height="100%">
              {PROMO_SIDE.map(p => (
                <Box key={p.title} sx={{
                  flex:1, border:`1px solid ${BORDER2}`,
                  borderRadius:"20px", p:{ xs:3, sm:4.5 },
                  background:INK2, position:"relative", overflow:"hidden",
                  transition:EASE,
                  "&::before": {
                    content:'""', position:"absolute", left:0, top:0, bottom:0, width:"3px",
                    background:`linear-gradient(180deg, ${GOLD}, ${AMBER})`,
                    borderRadius:"0 3px 3px 0",
                  },
                  "&:hover": { borderColor:BORDER, transform:"translateX(4px)" },
                }}>
                  <Typography sx={{ fontSize:11, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:GOLD, mb:1.75 }}>
                    {p.eyebrow}
                  </Typography>
                  <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:800, mb:1, color:TEXT }}>
                    {p.title}
                  </Typography>
                  <Typography sx={{ fontSize:13, color:MUTED, lineHeight:1.6, mb:2.5 }}>{p.sub}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}
                    component="a" href="#contact"
                    sx={{ fontSize:13, fontWeight:600, color:GOLD, textDecoration:"none", transition:EASE, width:"fit-content", "&:hover": { gap:"14px" } }}
                  >
                    <span>{p.link}</span>
                    <ArrowForwardIcon sx={{ fontSize:14 }} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  8. TESTIMONIALS
// ══════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  { initial:"R", name:"Rahul Sharma",   role:"Software Engineer, Pune",        text:"Got my MacBook screen replaced in under 2 hours at a price lower than any other shop in Pune. The technician was incredibly professional and kept me updated throughout." },
  { initial:"P", name:"Priya Desai",    role:"Business Owner, Mumbai",         text:"Best place to buy electronics in Pimpri-Chinchwad! Got the Samsung Galaxy S25 at a price lower than online. Genuine product, full warranty and same-day delivery!" },
  { initial:"A", name:"Arjun Patil",    role:"Student, Pimpri-Chinchwad",      text:"My gaming PC had a serious GPU fault. These guys diagnosed it quickly and had it repaired within a single day. Exceptional knowledge, fair pricing — won't go anywhere else." },
];

function TestimonialsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, background: INK }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Eyebrow>Customer Stories</Eyebrow>
        <Typography sx={{
          fontFamily:"'Playfair Display',serif",
          fontSize:{ xs:"clamp(28px,8vw,52px)", md:"clamp(28px,4vw,52px)" },
          fontWeight:900, lineHeight:1.1, mb:7.5, color:TEXT,
        }}>
          What Our <GoldText>Clients</GoldText> Say
        </Typography>

        <Grid container spacing={3}>
          {TESTIMONIALS.map((t, i) => (
            <Grid item xs={12} md={4} key={t.name}>
              <Box sx={{
                background:INK2, border:`1px solid ${BORDER2}`,
                borderRadius:"20px", p:{ xs:3.5, sm:4 },
                height:"100%", display:"flex", flexDirection:"column",
                transition:EASE,
                "&:hover": { borderColor:BORDER, transform:"translateY(-4px)" },
              }}>
                <Typography sx={{ fontSize:48, lineHeight:1, color:GOLD, opacity:.3, fontFamily:"'Playfair Display',serif", mb:1.5 }}>"</Typography>
                <Stack direction="row" spacing:.375 sx={{ mb:2 }}>
                  {[1,2,3,4,5].map(s => <StarIcon key={s} sx={{ fontSize:13, color:GOLD }} />)}
                </Stack>
                <Typography sx={{ fontSize:14, color:MUTED, lineHeight:1.8, fontWeight:300, fontStyle:"italic", mb:3, flex:1 }}>
                  {t.text}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1.75}>
                  <Box sx={{
                    width:46, height:46, borderRadius:"50%",
                    background:`linear-gradient(135deg, ${AMBER}, ${GOLD})`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:800, color:INK,
                    flexShrink:0,
                  }}>{t.initial}</Box>
                  <Box>
                    <Typography sx={{ fontWeight:700, fontSize:14, color:TEXT, mb:.25 }}>{t.name}</Typography>
                    <Typography sx={{ fontSize:12, color:MUTED2 }}>{t.role}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  9. CONTACT SECTION
// ══════════════════════════════════════════════════════════════
const CONTACT_INFO = [
  { Icon: PlaceIcon,       label:"Address", value:"Shop No. 12, Sector 27, Pradhikaran\nPimpri-Chinchwad, Pune – 411044" },
  { Icon: PhoneIcon,       label:"Phone",   value:"+91 98765 43210" },
  { Icon: EmailIcon,       label:"Email",   value:"hello@nexvolt.in" },
  { Icon: AccessTimeIcon,  label:"Hours",   value:"Mon–Sat: 10AM – 8PM\nSunday: 11AM – 6PM" },
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: INK2, borderRadius: "14px", color: TEXT,
    fontSize: 14,
    "& fieldset":       { borderColor: BORDER2 },
    "&:hover fieldset": { borderColor: "rgba(232,160,32,.3)" },
    "&.Mui-focused fieldset": { borderColor: GOLD, boxShadow: `0 0 0 3px rgba(232,160,32,.08)` },
  },
  "& .MuiInputLabel-root": { color: MUTED2, fontSize: 12, fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase" },
  "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
};

function ContactSection() {
  const [subject, setSubject] = useState("");
  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 14 }, background: INK2 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Eyebrow>Get In Touch</Eyebrow>
        <Typography sx={{
          fontFamily:"'Playfair Display',serif",
          fontSize:{ xs:"clamp(28px,8vw,52px)", md:"clamp(28px,4vw,52px)" },
          fontWeight:900, lineHeight:1.1, mb:7.5, color:TEXT,
        }}>
          Visit Us or <GoldText>Send a Message</GoldText>
        </Typography>

        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="flex-start">
          {/* Info column */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              {CONTACT_INFO.map(({ Icon, label, value }) => (
                <Box key={label} sx={{
                  background:INK, border:`1px solid ${BORDER2}`,
                  borderRadius:"14px", p:"22px 24px",
                  display:"flex", alignItems:"flex-start", gap:2.25,
                  transition:EASE,
                  "&:hover": { borderColor:BORDER, transform:"translateX(6px)" },
                }}>
                  <Box sx={{
                    width:46, height:46, minWidth:46, borderRadius:"10px",
                    background:"rgba(232,160,32,.1)", border:`1px solid ${BORDER}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:GOLD,
                  }}><Icon sx={{ fontSize:18 }} /></Box>
                  <Box>
                    <Typography sx={{ fontSize:11, color:MUTED2, textTransform:"uppercase", letterSpacing:"1px", mb:.625 }}>{label}</Typography>
                    <Typography sx={{ fontSize:15, fontWeight:600, color:TEXT, lineHeight:1.5, whiteSpace:"pre-line" }}>{value}</Typography>
                  </Box>
                </Box>
              ))}

              {/* Map placeholder */}
              <Box sx={{
                background:INK, border:`1px solid ${BORDER2}`, borderRadius:"14px",
                height:180, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:1,
              }}>
                <MapIcon sx={{ fontSize:32, color:GOLD }} />
                <Typography sx={{ fontWeight:600, fontSize:14, color:MUTED }}>Pimpri-Chinchwad, Pune</Typography>
                <Typography sx={{ fontSize:12, color:MUTED2 }}>📍 Sector 27, Pradhikaran</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Form column */}
          <Grid item xs={12} md={7}>
            <Box sx={{
              background:INK, border:`1px solid ${BORDER2}`,
              borderRadius:"20px", p:{ xs:3, sm:5.5 },
            }}>
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:800, mb:1, color:TEXT }}>
                Send a Message
              </Typography>
              <Typography sx={{ fontSize:14, color:MUTED, mb:4 }}>
                We reply within 24 hours — usually much faster.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" placeholder="Rahul" sx={inputSx} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" placeholder="Sharma" sx={inputSx} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" type="email" placeholder="you@example.com" sx={inputSx} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone" type="tel" placeholder="+91 XXXXX XXXXX" sx={inputSx} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{
                    "& .MuiOutlinedInput-root": {
                      background:INK2, borderRadius:"14px", color: subject ? TEXT : MUTED2,
                      "& fieldset": { borderColor:BORDER2 },
                      "&:hover fieldset": { borderColor:"rgba(232,160,32,.3)" },
                      "&.Mui-focused fieldset": { borderColor:GOLD },
                    },
                    "& .MuiInputLabel-root": { color:MUTED2, fontSize:12, fontWeight:600, letterSpacing:".5px", textTransform:"uppercase" },
                    "& .MuiInputLabel-root.Mui-focused": { color:GOLD },
                    "& .MuiSelect-icon": { color:MUTED },
                    "& .MuiMenu-paper": { background:INK3 },
                  }}>
                    <InputLabel>Subject</InputLabel>
                    <Select value={subject} onChange={e => setSubject(e.target.value)} label="Subject"
                      MenuProps={{ PaperProps: { sx: { background:INK3, border:`1px solid ${BORDER2}`, "& .MuiMenuItem-root": { color:MUTED, "&:hover": { color:TEXT, background:INK4 }, "&.Mui-selected": { background:"rgba(232,160,32,.1)", color:GOLD } } } } }}
                    >
                      {["Product Inquiry","Laptop Repair","PC Repair","Mobile Repair","Bulk Order","Other"].map(o => (
                        <MenuItem key={o} value={o}>{o}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Message" multiline rows={4} placeholder="Describe your issue or inquiry..." sx={{ ...inputSx, "& textarea": { resize:"vertical" } }} />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth startIcon={<SendIcon />} sx={{
                    py:2, borderRadius:"14px",
                    fontSize:14, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase",
                    background:GOLD, color:INK,
                    transition:EASE,
                    "&:hover": { background:GOLD2, transform:"translateY(-2px)", boxShadow:`0 12px 32px rgba(232,160,32,.3)` },
                  }}>Send Message</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ══════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <Box sx={{ background: INK, minHeight: "100vh" }}>
      <HeroSection />
      <TickerSection />
      <StatsSection />
      <ProductsSection />
      <FeaturesStrip />
      <ServicesSection />
      <PromoSection />
      <TestimonialsSection />
      <ContactSection />
    </Box>
  );
}

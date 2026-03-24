import React from 'react';
import { Box, Container } from "@mui/material";
import { keyframes } from "@mui/system";
import { useCart } from "../context/CartContext";

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
const BORDER  = "rgba(232,160,32,0.12)";
const BORDER2 = "rgba(240,235,224,0.08)";

// ══════════════════════════════════════════════════════════════
//  KEYFRAMES
// ══════════════════════════════════════════════════════════════
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const float = keyframes`
  0%,100% { transform: translateY(0) rotate(-1deg); }
  50%      { transform: translateY(-18px) rotate(1deg); }
`;
const spinSlow = keyframes`
  to { transform: rotate(360deg); }
`;
const pulse = keyframes`
  0%,100% { opacity: 1; }
  50%      { opacity: 0.4; }
`;
const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const goldSx = {
  background: `linear-gradient(135deg, ${GOLD}, ${GOLD2}, ${AMBER})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline-block",
};

// ══════════════════════════════════════════════════════════════
//  SECTION 1 — HERO
// ══════════════════════════════════════════════════════════════
function HeroSection() {
  const { addToCart } = useCart(); // 👈 get addToCart from context

  // Product object for the MacBook Pro (matches cart structure)
  const macbookProduct = {
    id: 999,                      // unique ID
    name: "MacBook Pro M3 Max",
    category: "Laptops",
    price: 2299,                  // USD equivalent of ₹1,89,900 (approx)
    tag: "Bestseller",
  };

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
      
        background: `
          radial-gradient(ellipse 55% 65% at 80% 40%, rgba(232,160,32,.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 50% at 10% 70%, rgba(196,74,26,.06) 0%, transparent 70%),
          linear-gradient(160deg, ${INK} 0%, #12100e 100%)
        `,
      }}
    >
      {/* Decorative grid lines */}
      <Box aria-hidden sx={{
        position: "absolute", inset: 0, overflow: "hidden", opacity: 0.04, pointerEvents: "none",
        "&::before": { content: '""', position: "absolute", left: "55%", top: 0, bottom: 0, width: "1px", background: GOLD },
        "&::after":  { content: '""', position: "absolute", top: "55%", left: 0, right: 0, height: "1px", background: GOLD },
      }} />

      {/* Spinning ring */}
      <Box aria-hidden sx={{
        display: { xs: "none", lg: "block" },
        position: "absolute", right: "6%", top: "50%",
        width: 520, height: 520, borderRadius: "50%",
        border: "1px solid rgba(232,160,32,.1)",
        transform: "translateY(-50%)",
        animation: `${spinSlow} 30s linear infinite`,
        pointerEvents: "none",
        "&::before": { content: '""', position: "absolute", inset: 40, borderRadius: "50%", border: "1px dashed rgba(232,160,32,.07)" },
        "&::after":  { content: '""', position: "absolute", inset: 100, borderRadius: "50%", border: "1px solid rgba(232,160,32,.05)" },
      }} />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 3, md: 4 }, position: "relative", zIndex: 1, width: "100%" }}>
        {/* .hero-inner — 1fr 1fr grid */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          gap: { xs: "48px", md: "80px" },
        }}>

          {/* ══ LEFT COLUMN ══ */}
          <Box>
            {/* Pre-label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", mb: "28px", animation: `${fadeLeft} .7s ease both` }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, flexShrink: 0, animation: `${pulse} 2s ease infinite` }} />
              <Box component="span" sx={{ fontSize: 12, fontWeight: 500, letterSpacing: "2px", color: MUTED, textTransform: "uppercase" }}>
                New Season — 2025 Collection
              </Box>
            </Box>

            {/* Title */}
            <Box component="h1" sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px, 5.5vw, 82px)",
              fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1px",
              color: TEXT, margin: "0 0 28px 0",
              animation: `${fadeUp} .75s .1s ease both`,
            }}>
              The Future<br />
              of{" "}<Box component="em" sx={{ fontStyle: "italic", color: GOLD }}>Technology</Box>
              <br />Is Here.
            </Box>

            {/* Subtitle */}
            <Box component="p" sx={{
              fontSize: 16, lineHeight: 1.8, color: MUTED, maxWidth: 480,
              fontWeight: 300, margin: "0 0 44px 0",
              animation: `${fadeUp} .75s .2s ease both`,
            }}>
              Premium laptops, smartphones, PCs &amp; accessories. Expert repair services. All under one roof in Pune.
            </Box>

            {/* CTAs */}
            <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap", mb: "52px", animation: `${fadeUp} .75s .3s ease both` }}>
              <Box component="a" href="#products" sx={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                px: "32px", py: "15px", borderRadius: "4px",
                fontSize: 13, fontWeight: 700, letterSpacing: ".8px",
                textTransform: "uppercase", background: GOLD, color: INK,
                textDecoration: "none", position: "relative", overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                "&::before": { content: '""', position: "absolute", inset: 0, background: "rgba(255,255,255,.06)", transform: "translateX(-100%)", transition: "transform .4s ease" },
                "&:hover": { background: GOLD2, transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(232,160,32,.35)", "&::before": { transform: "translateX(0)" } },
              }}>⚡ Shop Collection</Box>

              <Box component="a" href="#services" sx={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                px: "32px", py: "15px", borderRadius: "4px",
                fontSize: 13, fontWeight: 700, letterSpacing: ".8px",
                textTransform: "uppercase", border: "1.5px solid rgba(232,160,32,.4)",
                color: GOLD, background: "transparent",
                textDecoration: "none", position: "relative", overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                "&::before": { content: '""', position: "absolute", inset: 0, background: "rgba(255,255,255,.06)", transform: "translateX(-100%)", transition: "transform .4s ease" },
                "&:hover": { borderColor: GOLD, background: "rgba(232,160,32,.06)", transform: "translateY(-2px)", "&::before": { transform: "translateX(0)" } },
              }}>🔧 View Services</Box>
            </Box>

            {/* Trust row */}
            <Box sx={{
              display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap",
              pt: "36px", borderTop: `1px solid ${BORDER2}`,
              animation: `${fadeUp} .75s .4s ease both`,
            }}>
              <Box sx={{ display: "flex" }}>
                {["R", "P", "A", "+"].map((l, i) => (
                  <Box key={l} sx={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${GOLD}, ${AMBER})`,
                    border: `2px solid ${INK}`, ml: i === 0 ? 0 : "-10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 13, fontWeight: 700, color: INK,
                    zIndex: 4 - i, position: "relative",
                  }}>{l}</Box>
                ))}
              </Box>
              <Box>
                <Box component="strong" sx={{ fontSize: 14, fontWeight: 700, color: TEXT, display: "block", mb: "2px" }}>
                  12,000+ Happy Customers
                </Box>
                <Box component="span" sx={{ fontSize: 13, color: MUTED }}>
                  Rated 4.9★ across Google &amp; JustDial
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ══ RIGHT COLUMN ══ */}
          <Box sx={{
            position: "relative",
            animation: `${fadeIn} .9s .3s ease both`,
            px: { xs: 0, sm: "36px" },
            py: { xs: 0, sm: "28px" },
          }}>
            {/* Showcase card */}
            <Box sx={{
              background: `linear-gradient(145deg, ${INK3}, ${INK2})`,
              border: `1px solid ${BORDER}`, borderRadius: "20px",
              p: { xs: "28px", sm: "40px" },
              position: "relative", overflow: "hidden",
              "&::before": {
                content: '""', position: "absolute", top: -60, right: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,160,32,.08), transparent 70%)",
                pointerEvents: "none",
              },
            }}>
              <Box sx={{
                position: "absolute", top: 20, left: 20, background: RUST, color: "#fff",
                fontSize: 11, fontWeight: 700, letterSpacing: "1px",
                textTransform: "uppercase", px: "14px", py: "5px", borderRadius: "4px",
              }}>🔥 Best Seller</Box>

              <Box component="span" sx={{
                fontSize: { xs: 80, sm: 110 }, textAlign: "center",
                display: "block", mt: "52px", mb: "20px", lineHeight: 1,
                animation: `${float} 5s ease-in-out infinite`,
                filter: "drop-shadow(0 24px 48px rgba(232,160,32,.2))",
              }}>💻</Box>

              <Box component="h3" sx={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: TEXT, margin: "0 0 6px 0" }}>
                MacBook Pro M3 Max
              </Box>
              <Box component="p" sx={{ fontSize: 13, color: MUTED, margin: "0 0 20px 0" }}>16" · 36GB RAM · 1TB SSD</Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Box component="del" sx={{ fontSize: 14, color: MUTED2, display: "block", mb: "4px" }}>₹2,49,900</Box>
                  <Box component="span" sx={{ ...goldSx, fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700 }}>
                    ₹1,89,900
                  </Box>
                </Box>
                {/* 👇 Updated button with onClick */}
                <Box 
                  component="button" 
                  onClick={() => addToCart(macbookProduct)}
                  sx={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    px: "22px", py: "12px", borderRadius: "6px",
                    background: GOLD, color: INK, fontSize: 13, fontWeight: 700,
                    border: "none", cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", whiteSpace: "nowrap",
                    "&:hover": { background: GOLD2, transform: "scale(1.04)" },
                  }}
                >
                  🛍 Add to Bag
                </Box>
              </Box>
            </Box>

            {/* Chip 1 — bottom-left */}
            <Box sx={{
              position: "absolute", bottom: { xs: "-8px", sm: "-20px" }, left: { xs: "-4px", sm: "-28px" },
              background: INK4, border: `1px solid ${BORDER2}`, borderRadius: "10px",
              px: "16px", py: "12px", display: "flex", alignItems: "center", gap: "10px",
              backdropFilter: "blur(8px)", animation: `${float} 4s 1s ease-in-out infinite`, zIndex: 2,
            }}>
              <Box component="span" sx={{ fontSize: 20 }}>⭐</Box>
              <Box>
                <Box sx={{ fontSize: 14, fontWeight: 700, color: TEXT }}>4.9 / 5</Box>
                <Box sx={{ fontSize: 11, color: MUTED }}>12K+ Reviews</Box>
              </Box>
            </Box>

            {/* Chip 2 — top-right */}
            <Box sx={{
              position: "absolute", top: { xs: "-8px", sm: "-20px" }, right: { xs: "-4px", sm: "-24px" },
              background: INK4, border: `1px solid ${BORDER2}`, borderRadius: "10px",
              px: "16px", py: "12px", display: "flex", alignItems: "center", gap: "10px",
              backdropFilter: "blur(8px)", animation: `${float} 3.5s .5s ease-in-out infinite`, zIndex: 2,
            }}>
              <Box component="span" sx={{ fontSize: 20 }}>🚚</Box>
              <Box>
                <Box sx={{ fontSize: 14, fontWeight: 700, color: TEXT }}>Free Delivery</Box>
                <Box sx={{ fontSize: 11, color: MUTED }}>Above ₹999</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  SECTION 2 — TICKER
// ══════════════════════════════════════════════════════════════
const TICKER_ITEMS = [
  "💻 Laptops up to 25% off", "📱 iPhone 16 Pro in stock",
  "🔧 Same-day repair service", "🎧 Sony & Apple headphones",
  "🖥️ Gaming PCs available",  "📦 EMI 0% interest",
];

function TickerSection() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box sx={{ py: "16px", background: GOLD, overflow: "hidden" }}>
      <Box sx={{ display: "flex", whiteSpace: "nowrap", animation: `${marquee} 25s linear infinite` }}>
        {all.map((item, i) => (
          <Box key={i} component="span" sx={{
            display: "inline-flex", alignItems: "center", gap: "16px",
            px: "32px", fontSize: 13, fontWeight: 700,
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
//  SECTION 3 — STATS
// ══════════════════════════════════════════════════════════════
const STATS = [
  { num: "5,000+", lbl: "Products Available", align: "left"   },
  { num: "12K+",   lbl: "Happy Customers",    align: "center" },
  { num: "8 Yrs",  lbl: "Trusted in Pune",    align: "right"  },
];

function StatsSection() {
  return (
    <Box sx={{
      py: { xs: "56px", md: "80px" },
      background: INK2,
      borderTop:    `1px solid ${BORDER}`,
      borderBottom: `1px solid ${BORDER}`,
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
        {/* Matches .intro-inner: grid 1fr 2px 1fr 2px 1fr */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 2px 1fr 2px 1fr" },
          alignItems: "center",
          gap: { xs: 0, sm: "48px" },
        }}>
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.num}>
              <Box sx={{
                textAlign: { xs: "left", sm: stat.align },
                py: { xs: "28px", sm: 0 },
                borderBottom: { xs: i < 2 ? `1px solid ${BORDER2}` : "none", sm: "none" },
              }}>
                {/* Gold number — gradient applied directly, display:block so textAlign works */}
                <Box component="span" sx={{
                  ...goldSx,
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: 46, sm: 48, md: 52 },
                  fontWeight: 900, lineHeight: 1, mb: "8px",
                }}>
                  {stat.num}
                </Box>
                <Box component="span" sx={{
                  display: "block",
                  fontSize: 14, color: MUTED, fontWeight: 400, letterSpacing: ".3px",
                }}>
                  {stat.lbl}
                </Box>
              </Box>

              {/* Vertical divider */}
              {i < 2 && (
                <Box key={`div-${i}`} sx={{
                  display: { xs: "none", sm: "block" },
                  width: "2px", height: 60, background: BORDER, mx: "auto",
                }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ══════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <Box sx={{ background: INK }}>
      <HeroSection />
      <TickerSection />
      <StatsSection />
    </Box>
  );
}  
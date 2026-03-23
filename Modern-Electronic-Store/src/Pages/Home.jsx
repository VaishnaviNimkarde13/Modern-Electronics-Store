import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material";
import { keyframes } from "@mui/system";
import BoltIcon  from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// ══════════════════════════════════════════════════════════════
//  TOKENS  (exact match to the HTML :root variables)
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
  to { transform: translateY(-50%) rotate(360deg); }
`;
const pulse = keyframes`
  0%,100% { opacity: 1; }
  50%      { opacity: 0.4; }
`;
const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

// ══════════════════════════════════════════════════════════════
//  SHARED: GoldText gradient
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
//  SECTION 1 — HERO
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
        pt: { xs: "80px", md: "80px" },
        // exact bg from .hero-bg
        background: `
          radial-gradient(ellipse 55% 65% at 80% 40%, rgba(232,160,32,.07) 0%, transparent 65%),
          radial-gradient(ellipse 40% 50% at 10% 70%, rgba(196,74,26,.06) 0%, transparent 70%),
          linear-gradient(160deg, ${INK} 0%, #12100e 100%)
        `,
      }}
    >
      {/* ── Decorative grid lines (.hero-lines) ── */}
      <Box
        aria-hidden
        sx={{
          position: "absolute", inset: 0,
          overflow: "hidden", opacity: 0.04, pointerEvents: "none",
          "&::before": {
            content: '""', position: "absolute",
            left: "55%", top: 0, bottom: 0,
            width: "1px", background: GOLD,
          },
          "&::after": {
            content: '""', position: "absolute",
            top: "55%", left: 0, right: 0,
            height: "1px", background: GOLD,
          },
        }}
      />

      {/* ── Spinning ring (.hero-ring) ── */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute",
          right: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 520, height: 520,
          borderRadius: "50%",
          border: "1px solid rgba(232,160,32,.1)",
          animation: `${spinSlow} 30s linear infinite`,
          pointerEvents: "none",
          transformOrigin: "center center",
          "&::before": {
            content: '""', position: "absolute",
            inset: 40, borderRadius: "50%",
            border: "1px dashed rgba(232,160,32,.07)",
          },
          "&::after": {
            content: '""', position: "absolute",
            inset: 100, borderRadius: "50%",
            border: "1px solid rgba(232,160,32,.05)",
          },
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2.5, sm: 3, md: 4 }, position: "relative", zIndex: 1, width: "100%" }}
      >
        <Grid
          container
          spacing={{ xs: 6, md: 5, lg: 10 }}
          alignItems="center"
        >
          {/* ════════════════ LEFT COLUMN ════════════════ */}
          <Grid item xs={12} md={6}>

            {/* Pre-label (.hero-pre) */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                mb: 3.5,
                animation: `${fadeLeft} .7s ease both`,
              }}
            >
              <Box
                sx={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: GOLD, flexShrink: 0,
                  animation: `${pulse} 2s ease infinite`,
                }}
              />
              <Typography
                sx={{
                  fontSize: 12, fontWeight: 500,
                  letterSpacing: "2px", color: MUTED,
                  textTransform: "uppercase",
                }}
              >
                New Season — 2025 Collection
              </Typography>
            </Stack>

            {/* Main title (.hero-title) */}
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(44px, 5.5vw, 82px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-1px",
                color: TEXT,
                mb: 3.5,
                animation: `${fadeUp} .75s .1s ease both`,
              }}
            >
              The Future
              <br />
              of{" "}
              <Box
                component="em"
                sx={{ fontStyle: "italic", color: GOLD }}
              >
                Technology
              </Box>
              <br />
              Is Here.
            </Typography>

            {/* Subtitle (.hero-sub) */}
            <Typography
              sx={{
                fontSize: 16, lineHeight: 1.8, color: MUTED,
                maxWidth: 480, mb: 5.5, fontWeight: 300,
                animation: `${fadeUp} .75s .2s ease both`,
              }}
            >
              Premium laptops, smartphones, PCs &amp; accessories. Expert
              repair services. All under one roof in Pune.
            </Typography>

            {/* CTA Buttons (.hero-ctas) */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              flexWrap="wrap"
              useFlexGap
              sx={{ animation: `${fadeUp} .75s .3s ease both` }}
            >
              {/* .btn.btn-gold */}
              <Button
                href="#products"
                startIcon={<BoltIcon />}
                sx={{
                  px: 4, py: 1.875,
                  borderRadius: "4px",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                  background: GOLD, color: INK,
                  position: "relative", overflow: "hidden",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  "&::before": {
                    content: '""', position: "absolute", inset: 0,
                    background: "rgba(255,255,255,.06)",
                    transform: "translateX(-100%)",
                    transition: "transform .4s ease",
                  },
                  "&:hover": {
                    background: GOLD2,
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(232,160,32,.35)",
                    "&::before": { transform: "translateX(0)" },
                  },
                }}
              >
                Shop Collection
              </Button>

              {/* .btn.btn-outline */}
              <Button
                href="#services"
                startIcon={<BuildIcon />}
                sx={{
                  px: 4, py: 1.875,
                  borderRadius: "4px",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                  border: "1.5px solid rgba(232,160,32,.4)",
                  color: GOLD,
                  background: "transparent",
                  position: "relative", overflow: "hidden",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  "&::before": {
                    content: '""', position: "absolute", inset: 0,
                    background: "rgba(255,255,255,.06)",
                    transform: "translateX(-100%)",
                    transition: "transform .4s ease",
                  },
                  "&:hover": {
                    borderColor: GOLD,
                    background: "rgba(232,160,32,.06)",
                    transform: "translateY(-2px)",
                    "&::before": { transform: "translateX(0)" },
                  },
                }}
              >
                View Services
              </Button>
            </Stack>

            {/* Trust row (.hero-trust) */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              flexWrap="wrap"
              useFlexGap
              sx={{
                mt: 6.5, pt: 4.5,
                borderTop: `1px solid ${BORDER2}`,
                animation: `${fadeUp} .75s .4s ease both`,
              }}
            >
              {/* Overlapping avatars (.trust-avatars) */}
              <Stack direction="row">
                {["R", "P", "A", "+"].map((letter, i) => (
                  <Box
                    key={letter}
                    sx={{
                      width: 34, height: 34,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${GOLD}, ${AMBER})`,
                      border: `2px solid ${INK}`,
                      ml: i === 0 ? 0 : "-10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 13, fontWeight: 700, color: INK,
                      zIndex: 4 - i,
                      position: "relative",
                    }}
                  >
                    {letter}
                  </Box>
                ))}
              </Stack>

              {/* Trust text */}
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: TEXT, mb: 0.25 }}>
                  12,000+ Happy Customers
                </Typography>
                <Typography sx={{ fontSize: 13, color: MUTED }}>
                  Rated 4.9★ across Google &amp; JustDial
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* ════════════════ RIGHT COLUMN — Showcase ════════════════ */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                animation: `${fadeIn} .9s .3s ease both`,
                // Extra padding so floating chips don't clip
                px: { xs: 2, sm: 3.5 },
                pt: { xs: 3, sm: 3.5 },
                pb: { xs: 3, sm: 3.5 },
              }}
            >
              {/* ── Main card (.showcase-main) ── */}
              <Box
                sx={{
                  background: `linear-gradient(145deg, ${INK3}, ${INK2})`,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "20px",
                  p: { xs: 3.5, sm: 5 },
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute", top: -60, right: -60,
                    width: 200, height: 200, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(232,160,32,.08), transparent 70%)",
                    pointerEvents: "none",
                  },
                }}
              >
                {/* Best Seller tag (.showcase-tag) */}
                <Box
                  sx={{
                    position: "absolute", top: 20, left: 20,
                    background: RUST, color: "#fff",
                    fontSize: 11, fontWeight: 700, letterSpacing: "1px",
                    textTransform: "uppercase",
                    px: 1.75, py: 0.625, borderRadius: "4px",
                  }}
                >
                  🔥 Best Seller
                </Box>

                {/* Floating emoji (.showcase-emoji) */}
                <Box
                  sx={{
                    fontSize: { xs: 80, sm: 110 },
                    textAlign: "center",
                    display: "block",
                    my: { xs: 4, sm: 2.5 },
                    lineHeight: 1,
                    animation: `${float} 5s ease-in-out infinite`,
                    filter: "drop-shadow(0 24px 48px rgba(232,160,32,.2))",
                  }}
                >
                  💻
                </Box>

                {/* Product name */}
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22, fontWeight: 800, color: TEXT, mb: 0.75,
                  }}
                >
                  MacBook Pro M3 Max
                </Typography>

                {/* Spec */}
                <Typography sx={{ fontSize: 13, color: MUTED, mb: 2.5 }}>
                  16" · 36GB RAM · 1TB SSD
                </Typography>

                {/* Price + button row */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      component="del"
                      sx={{ fontSize: 14, color: MUTED2, display: "block", mb: 0.25 }}
                    >
                      ₹2,49,900
                    </Typography>
                    <GoldText>
                      <Typography
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 30, fontWeight: 700,
                        }}
                      >
                        ₹1,89,900
                      </Typography>
                    </GoldText>
                  </Box>

                  {/* .showcase-btn */}
                  <Button
                    startIcon={<ShoppingBagIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      px: { xs: 2, sm: 2.75 }, py: 1.5,
                      borderRadius: "6px",
                      background: GOLD, color: INK,
                      fontSize: 13, fontWeight: 700,
                      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                      whiteSpace: "nowrap",
                      "&:hover": { background: GOLD2, transform: "scale(1.04)" },
                    }}
                  >
                    Add to Bag
                  </Button>
                </Stack>
              </Box>

              {/* ── Floating chip 1 (.chip-1) — bottom-left ── */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 0, sm: -20 },
                  left: { xs: 0, sm: -28 },
                  background: INK4,
                  border: `1px solid ${BORDER2}`,
                  borderRadius: "10px",
                  px: 2, py: 1.5,
                  display: "flex", alignItems: "center", gap: 1.25,
                  backdropFilter: "blur(8px)",
                  animation: `${float} 4s 1s ease-in-out infinite`,
                  zIndex: 2,
                }}
              >
                <Typography sx={{ fontSize: 20 }}>⭐</Typography>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
                    4.9 / 5
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: MUTED }}>12K+ Reviews</Typography>
                </Box>
              </Box>

              {/* ── Floating chip 2 (.chip-2) — top-right ── */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 0, sm: -20 },
                  right: { xs: 0, sm: -24 },
                  background: INK4,
                  border: `1px solid ${BORDER2}`,
                  borderRadius: "10px",
                  px: 2, py: 1.5,
                  display: "flex", alignItems: "center", gap: 1.25,
                  backdropFilter: "blur(8px)",
                  animation: `${float} 3.5s .5s ease-in-out infinite`,
                  zIndex: 2,
                }}
              >
                <Typography sx={{ fontSize: 20 }}>🚚</Typography>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
                    Free Delivery
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: MUTED }}>Above ₹999</Typography>
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
//  SECTION 2 — TICKER / MARQUEE (.ticker)
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
  // Doubled so the loop is seamless
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box
      sx={{
        py: 2,
        background: GOLD,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: `${marquee} 25s linear infinite`,
        }}
      >
        {all.map((item, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              px: 4,
              fontSize: 13,
              fontWeight: 700,
              color: INK,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {item}
            {/* .ticker-sep */}
            <Box component="span" sx={{ color: AMBER, fontSize: 18 }}>
              ✦
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
//  SECTION 3 — STATS / INTRO STRIP (.intro)
// ══════════════════════════════════════════════════════════════
const STATS = [
  { num: "5,000+", lbl: "Products Available", align: "left"   },
  { num: "12K+",   lbl: "Happy Customers",    align: "center" },
  { num: "8 Yrs",  lbl: "Trusted in Pune",    align: "right"  },
];

function StatsSection() {
  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        background: INK2,
        borderTop:    `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
        <Grid container alignItems="center">
          {STATS.map((stat, i) => (
            <>
              <Grid
                item
                key={stat.num}
                xs={12}
                sm={4}
                sx={{
                  textAlign: { xs: "left", sm: stat.align },
                  py: { xs: 3.5, sm: 0 },
                  px: { xs: 0, sm: 4 },
                  // bottom border between items on mobile
                  borderBottom: {
                    xs: i < 2 ? `1px solid ${BORDER2}` : "none",
                    sm: "none",
                  },
                }}
              >
                {/* .intro-num */}
                <GoldText>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize:   { xs: 46, sm: 48, md: 52 },
                      fontWeight: 900,
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    {stat.num}
                  </Typography>
                </GoldText>
                {/* .intro-lbl */}
                <Typography
                  sx={{
                    fontSize: 14, color: MUTED,
                    fontWeight: 400, letterSpacing: ".3px",
                  }}
                >
                  {stat.lbl}
                </Typography>
              </Grid>

              {/* Vertical divider between stats (desktop only) */}
              {i < 2 && (
                <Grid
                  item
                  key={`div-${i}`}
                  sm={0}
                  sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      width: "2px",
                      height: 60,
                      background: BORDER,
                      mx: "auto",
                    }}
                  />
                </Grid>
              )}
            </>
          ))}
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
    <Box sx={{ background: INK }}>
      <HeroSection />
      <TickerSection />
      <StatsSection />
    </Box>
  );
}

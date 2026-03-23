import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

// ── Theme ──────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0e0d0b", paper: "#1a1916" },
    primary: { main: "#e8a020" },
    text: { primary: "#f0ebe0", secondary: "#9a9080" },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');`,
    },
  },
});

// ── Colour tokens ──────────────────────────────────────────────────────
const INK = "#0e0d0b";
const INK2 = "#1a1916";
const INK3 = "#242220";
const GOLD = "#e8a020";
const GOLD2 = "#f5b840";
const AMBER = "#c97a18";
const MUTED = "#9a9080";
const MUTED2 = "#6a6058";
const BORDER = `rgba(232,160,32,0.12)`;
const BORDER2 = `rgba(240,235,224,0.08)`;

// ── Data ───────────────────────────────────────────────────────────────
const SOCIAL = [
  { icon: <InstagramIcon fontSize="small" />, label: "Instagram" },
  { icon: <FacebookIcon fontSize="small" />, label: "Facebook" },
  { icon: <YouTubeIcon fontSize="small" />, label: "YouTube" },
  { icon: <WhatsAppIcon fontSize="small" />, label: "WhatsApp" },
  { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
];

const LINKS = [
  {
    heading: "Products",
    items: ["Laptops", "Desktop PCs", "Mobile Phones", "Bluetooth Devices", "Accessories"],
  },
  {
    heading: "Services",
    items: ["Laptop Repair", "PC Repair", "Mobile Repair", "Data Recovery", "Home Visit"],
  },
  {
    heading: "Company",
    items: ["About Us", "Careers", "Blog", "Privacy Policy", "Warranty Policy"],
  },
];

const PAYMENTS = ["VISA", "MC", "UPI", "GPay", "PhonePe"];

// ── Sub-components ─────────────────────────────────────────────────────

function Logo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
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
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#f0ebe0",
          "& span": { color: GOLD },
        }}
      >
        NEX<span>VOLT</span>
      </Typography>
    </Stack>
  );
}

function SocialButton({ icon, label }) {
  return (
    <IconButton
      aria-label={label}
      size="small"
      sx={{
        width: 38,
        height: 38,
        borderRadius: "8px",
        background: INK3,
        border: `1px solid ${BORDER2}`,
        color: MUTED,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        "&:hover": {
          color: GOLD,
          borderColor: BORDER,
          transform: "translateY(-2px)",
          background: INK3,
        },
      }}
    >
      {icon}
    </IconButton>
  );
}

function FooterColumn({ heading, items }) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontWeight: 800,
          color: "#f0ebe0",
          mb: 2.5,
        }}
      >
        {heading}
      </Typography>
      <Stack spacing={1.5} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {items.map((item) => (
          <Box component="li" key={item}>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: 14,
                color: MUTED,
                display: "flex",
                alignItems: "center",
                gap: 1,
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                position: "relative",
                pl: 0,
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: 0,
                  height: "1px",
                  background: GOLD,
                  transition: "width 0.3s ease",
                  flexShrink: 0,
                },
                "&:hover": {
                  color: "#f0ebe0",
                  pl: "6px",
                  "&::before": { width: "12px" },
                },
              }}
            >
              {item}
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function PaymentChip({ label }) {
  return (
    <Box
      component="span"
      sx={{
        background: INK3,
        border: `1px solid ${BORDER2}`,
        px: 1.5,
        py: 0.5,
        borderRadius: "4px",
        fontSize: 11,
        fontWeight: 700,
        color: MUTED2,
        letterSpacing: "0.5px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {label}
    </Box>
  );
}

// ── Main Footer ────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          background: INK,
          borderTop: `1px solid ${BORDER}`,
          pt: { xs: 6, md: 9 },
          pb: 4,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4 } }}>

          {/* ── Main grid ── */}
          <Grid
            container
            spacing={{ xs: 5, md: 6 }}
            sx={{ mb: { xs: 5, md: 7 } }}
          >
            {/* Brand column */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Logo />
              <Typography
                sx={{
                  fontSize: 14,
                  color: MUTED,
                  lineHeight: 1.8,
                  my: 2.5,
                  maxWidth: 280,
                  fontWeight: 300,
                }}
              >
                Your premium destination for electronics, genuine products, and
                expert repair services in Pimpri-Chinchwad, Pune.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {SOCIAL.map((s) => (
                  <SocialButton key={s.label} {...s} />
                ))}
              </Stack>
            </Grid>

            {/* Link columns */}
            {LINKS.map((col) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={col.heading}>
                <FooterColumn {...col} />
              </Grid>
            ))}
          </Grid>

          {/* ── Bottom bar ── */}
          <Divider sx={{ borderColor: BORDER2, mb: 3.5 }} />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Typography sx={{ fontSize: 13, color: MUTED2 }}>
              © 2025 NEXVOLT. All rights reserved. Crafted with ❤️ in Pune,
              India.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {PAYMENTS.map((p) => (
                <PaymentChip key={p} label={p} />
              ))}
            </Stack>
          </Stack>

        </Container>
      </Box>
    </ThemeProvider>
  );
}

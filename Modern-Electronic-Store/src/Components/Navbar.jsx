import { useState, useEffect } from "react";
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
function NavIconBtn({ children, badgeCount, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{
        width: 42,
        height: 42,
        borderRadius: "8px",
        background: INK3,
        border: `1px solid ${BORDER2}`,
        color: MUTED,
        transition: EASE,
        "&:hover": { color: GOLD, borderColor: BORDER, background: INK3 },
      }}
    >
      {badgeCount !== undefined ? (
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
//  NAVBAR COMPONENT
// ══════════════════════════════════════════════════════════
function NavbarInner() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [cartCount]                 = useState(0);

  const stuck = useScrollTrigger({ disableHysteresis: true, threshold: 60 });

  // Highlight active section on scroll
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
      {/* ────────────────────────────
          APP BAR
      ──────────────────────────── */}
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
              <NavIconBtn>
                <SearchIcon sx={{ fontSize: 18 }} />
              </NavIconBtn>

              {/* Cart icon — hidden on xs */}
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <NavIconBtn badgeCount={cartCount}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />
                </NavIconBtn>
              </Box>

              {/* Account button — hidden on xs */}
              <Button
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
                  transition: EASE,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.06)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.4s ease",
                  },
                  "&:hover": {
                    background: GOLD2,
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(232,160,32,0.35)",
                    "&::before": { transform: "translateX(0)" },
                  },
                }}
              >
                Account
              </Button>

              {/* Burger — mobile only */}
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

      {/* ────────────────────────────
          MOBILE DRAWER
      ──────────────────────────── */}
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

        {/* Drawer bottom — cart row + account button */}
        <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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

          <Button
            fullWidth
            startIcon={<AccountCircleOutlinedIcon />}
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

      {/* Spacer so content clears the fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: "64px !important", md: "80px !important" } }} />
    </>
  );
}

// ══════════════════════════════════════════════════════════
//  DEFAULT EXPORT — wraps with ThemeProvider + global styles
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

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText,
  Avatar, Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* ── Theme ── */
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0e0d0b', paper: '#1a1916' },
    primary: { main: '#e8a020' },
    text: { primary: '#f0ebe0', secondary: '#9a9080' },
  },
  typography: { fontFamily: "'Outfit', sans-serif" },
});

/* ── Design tokens ── */
const T = {
  ink:    '#0e0d0b',
  ink2:   '#1a1916',
  ink3:   '#242220',
  gold:   '#e8a020',
  gold2:  '#f5b840',
  amber:  '#c97a18',
  text:   '#f0ebe0',
  muted:  '#9a9080',
  muted2: '#6a6058',
  border:  'rgba(232,160,32,0.12)',
  border2: 'rgba(240,235,224,0.08)',
};

/* ── Google Fonts (same approach as original — injected via <style> tag) ── */
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
`;

/* ── Data ── */
const services = [
  {
    num: '01', emoji: '💻', title: 'Laptop Repair', price: 'Starting ₹499',
    desc: 'Complete diagnosis and repair for all laptop brands — Apple, Dell, HP, Lenovo, Asus, and more.',
    features: ['Screen & Display Replacement','Battery & Charging Port','Motherboard Repair','Data Recovery Services','Keyboard & Trackpad Fix'],
  },
  {
    num: '02', emoji: '🖥️', title: 'PC / Desktop Repair', price: 'Starting ₹699',
    desc: 'Full servicing, hardware upgrades, OS installs, and virus removal for desktops and all-in-ones.',
    features: ['Hardware Upgrade (RAM/SSD)','Virus & Malware Removal','OS Installation & Setup','Power Supply Repair','Graphics Card Repair'],
  },
  {
    num: '03', emoji: '📱', title: 'Mobile Repair', price: 'Starting ₹299',
    desc: 'Cracked screens, dead batteries, water damage — most mobile repairs completed within 60 minutes.',
    features: ['Screen & Glass Replacement','Battery Replacement','Water Damage Treatment','Camera & Speaker Repair','Charging Port Repair'],
  },
];

const steps = [
  { num: '01', icon: '📋', title: 'Book Appointment', desc: "Fill in our quick form or call us. Tell us your device and issue — we'll confirm your slot." },
  { num: '02', icon: '🔍', title: 'Free Diagnosis',   desc: 'Bring your device in. Our technician runs a full diagnostic — no charge, no obligation.' },
  { num: '03', icon: '🛠️', title: 'Expert Repair',    desc: 'We fix it with genuine parts. Most repairs done same-day. Live updates via WhatsApp.' },
  { num: '04', icon: '✅', title: 'Pick Up & Pay',     desc: "Collect your repaired device, test it on the spot. Pay only when you're 100% satisfied." },
];

const testimonials = [
  {
    av: 'R', name: 'Rahul Sharma', role: 'Software Engineer, Pune',
    text: 'Got my MacBook screen replaced in under 2 hours at a price lower than any other shop in Pune. The technician was incredibly professional and kept me updated throughout.',
  },
  {
    av: 'P', name: 'Priya Desai', role: 'Business Owner, Mumbai',
    text: 'Best place to buy electronics in Pimpri-Chinchwad! Got the Samsung Galaxy S25 at a price lower than online. Genuine product, full warranty and same-day delivery!',
  },
  {
    av: 'A', name: 'Arjun Patil', role: 'Student, Pimpri-Chinchwad',
    text: "My gaming PC had a serious GPU fault. These guys diagnosed it quickly and had it repaired within a single day. Exceptional knowledge, fair pricing — won't go anywhere else.",
  },
];

/* ── Reveal hook ── */
function useReveal(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ── Reveal wrapper ── */
function Reveal({ delay = 0, children }) {
  const ref = useRef(null);
  const visible = useReveal(ref);
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(36px)',
        transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
}

/* ── Eyebrow ── */
function Eyebrow({ children }) {
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: '10px', mb: '20px',
      fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
      color: T.gold, fontFamily: "'Outfit', sans-serif",
      '&::before': { content: '""', display: 'inline-block', width: '28px', height: '1.5px', background: T.gold },
      '&::after':  { content: '""', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: T.gold, opacity: 0.5 },
    }}>
      {children}
    </Box>
  );
}

/* ── Gold gradient text ── */
function GoldText({ children }) {
  return (
    <Box component="span" sx={{
      background: `linear-gradient(135deg,${T.amber},${T.gold},${T.gold2})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {children}
    </Box>
  );
}

/* ── Service Card ── */
function ServiceCard({ sv }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        background: T.ink,
        border: `1px solid ${hovered ? T.border : T.border2}`,
        borderRadius: '20px', padding: '40px 32px',
        position: 'relative', overflow: 'hidden', height: '100%',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,.4)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        '&::after': {
          content: '""',
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg,${T.amber},${T.gold},transparent)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform .45s ease',
        },
      }}
    >
      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', fontWeight: 900, color: 'white', lineHeight: 1, mb: '20px', userSelect: 'none' }}>
        {sv.num}
      </Typography>

      <Box sx={{
        width: '60px', height: '60px', borderRadius: '12px',
        background: hovered ? 'rgba(232,160,32,.12)' : T.ink3,
        border: `1px solid ${hovered ? T.border : T.border2}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '26px', mb: '24px',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {sv.emoji}
      </Box>

      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 800, mb: '12px', color: T.text }}>
        {sv.title}
      </Typography>

      <Box sx={{
        display: 'inline-block', px: '16px', py: '6px', borderRadius: '4px',
        background: 'rgba(232,160,32,.10)', border: `1px solid ${T.border}`,
        fontSize: '12px', fontWeight: 700, color: T.gold, letterSpacing: '.5px', mb: '22px',
      }}>
        {sv.price}
      </Box>

      <Typography sx={{ fontSize: '14px', color: T.muted, lineHeight: 1.8, mb: '22px', fontWeight: 300 }}>
        {sv.desc}
      </Typography>

      <List disablePadding>
        {sv.features.map((f, i) => (
          <ListItem key={f} disablePadding sx={{
            display: 'flex', alignItems: 'center', gap: '10px', py: '7px',
            borderBottom: i < sv.features.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
            '&::before': { content: '"→"', color: T.gold, fontSize: '12px', flexShrink: 0 },
          }}>
            <ListItemText
              primary={f}
              primaryTypographyProps={{ sx: { fontSize: '13px', color: T.muted, fontWeight: 300 } }}
            />
          </ListItem>
        ))}
      </List>

      <Box component="a" href="#contact" sx={{
        display: 'inline-flex', alignItems: 'center',
        gap: hovered ? '14px' : '8px',
        mt: '24px', fontSize: '13px', fontWeight: 600,
        color: T.gold, letterSpacing: '.3px', textDecoration: 'none',
        transition: 'gap .35s ease, color .35s ease',
        '&:hover': { color: T.gold2 },
      }}>
        Book Appointment →
      </Box>
    </Box>
  );
}

/* ── Step Card ── */
function StepCard({ s, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        background: T.ink2,
        border: `1px solid ${hovered ? T.border : T.border2}`,
        borderRadius: '20px', padding: '36px 28px',
        position: 'relative', overflow: 'hidden', height: '100%',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,.3)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {!isLast && (
        <Box sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute', top: '52px', right: '-14px',
          width: '28px', height: '1.5px', background: T.border2, zIndex: 2,
        }} />
      )}

      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 900, color: 'white', lineHeight: 1, mb: '20px', userSelect: 'none' }}>
        {s.num}
      </Typography>
      <Box component="span" sx={{ fontSize: '36px', mb: '16px', display: 'block' }}>{s.icon}</Box>
      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 800, mb: '10px', color: T.text }}>
        {s.title}
      </Typography>
      <Typography sx={{ fontSize: '13px', color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
        {s.desc}
      </Typography>
    </Box>
  );
}

/* ── Testimonial Card ── */
function TestiCard({ t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        background: T.ink2,
        border: `1px solid ${hovered ? T.border : T.border2}`,
        borderRadius: '20px', padding: '32px', height: '100%',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Typography sx={{ fontSize: '48px', lineHeight: 1, color: T.gold, opacity: 0.3, fontFamily: "'Playfair Display', serif", mb: '12px' }}>
        "
      </Typography>
      <Stack direction="row" sx={{ gap: '3px', mb: '16px' }}>
        {[...Array(5)].map((_, j) => (
          <Box key={j} component="span" sx={{ fontSize: '13px', color: T.gold }}>★</Box>
        ))}
      </Stack>
      <Typography sx={{ fontSize: '14px', color: T.muted, lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic', mb: '24px' }}>
        {t.text}
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ gap: '14px' }}>
        <Avatar sx={{
          width: 46, height: 46, minWidth: 46,
          background: `linear-gradient(135deg,${T.amber},${T.gold})`,
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px', fontWeight: 800, color: T.ink,
        }}>
          {t.av}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '14px', mb: '2px', color: T.text }}>{t.name}</Typography>
          <Typography sx={{ fontSize: '12px', color: T.muted2 }}>{t.role}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

/* ════════════════════════════
   MAIN EXPORT
════════════════════════════ */
export default function Services() {
  const sectionSx = { py: { xs: '72px', md: '110px' } };
  const contSx    = { maxWidth: '1300px', mx: 'auto', px: { xs: '20px', md: '32px' } };

  return (
    <ThemeProvider theme={theme}>
      {/* Google Fonts — injected same way as original code */}
      <style>{globalCss}</style>

      <Box sx={{ fontFamily: "'Outfit', sans-serif", color: T.text }}>

        {/* ══ 1. SERVICES ══ */}
        <Box component="section" id="services" sx={{ ...sectionSx, background: T.ink2 }}>
          <Box sx={contSx}>
            <Reveal><Eyebrow>What We Fix</Eyebrow></Reveal>

            <Reveal delay={0.1}>
              <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, lineHeight: 1.1, mb: '12px', color: T.text }}>
                Repair Services<br />
                <GoldText>Done Right.</GoldText>
              </Typography>
            </Reveal>

            <Reveal delay={0.18}>
              <Typography sx={{ fontSize: '15px', color: T.muted, maxWidth: '500px', lineHeight: 1.8, fontWeight: 300 }}>
                Certified technicians, genuine spare parts, fast turnaround. All repairs come with a 90-day service warranty.
              </Typography>
            </Reveal>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '24px', mt: '60px' }}>
              {services.map((sv, i) => (
                <Reveal key={sv.num} delay={i * 0.08}>
                  <ServiceCard sv={sv} />
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ══ 2. HOW IT WORKS ══ */}
        <Box component="section" sx={{ ...sectionSx, background: T.ink }}>
          <Box sx={contSx}>
            <Reveal><Eyebrow>The Process</Eyebrow></Reveal>

            <Reveal delay={0.1}>
              <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, lineHeight: 1.1, mb: '12px', color: T.text, textAlign: 'center' }}>
                How It Works
              </Typography>
            </Reveal>

            <Reveal delay={0.18}>
              <Typography sx={{ fontSize: '15px', color: T.muted, lineHeight: 1.8, fontWeight: 300, textAlign: 'center', mx: 'auto', maxWidth: '500px' }}>
                Getting your device fixed is simple — just 4 easy steps.
              </Typography>
            </Reveal>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: '24px', mt: '60px' }}>
              {steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.08}>
                  <StepCard s={s} isLast={i === steps.length - 1} />
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ══ 3. TESTIMONIALS ══ */}
        <Box component="section" sx={{ ...sectionSx, background: T.ink }}>
          <Box sx={contSx}>
            <Reveal><Eyebrow>Customer Stories</Eyebrow></Reveal>

            <Reveal delay={0.1}>
              <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, lineHeight: 1.1, mb: '12px', color: T.text }}>
                What Our <GoldText>Clients</GoldText> Say
              </Typography>
            </Reveal>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '24px', mt: '60px' }}>
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <TestiCard t={t} />
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { keyframes, margin } from "@mui/system";
import PlaceIcon        from "@mui/icons-material/Place";
import PhoneIcon        from "@mui/icons-material/Phone";
import EmailIcon        from "@mui/icons-material/Email";
import AccessTimeIcon   from "@mui/icons-material/AccessTime";
import MapIcon          from "@mui/icons-material/Map";
import SendIcon         from "@mui/icons-material/Send";

// ══════════════════════════════════════════════════════════════
//  TOKENS — exact match to HTML :root
// ══════════════════════════════════════════════════════════════
const INK    = "#0e0d0b";
const INK2   = "#1a1916";
const INK3   = "#242220";
const GOLD   = "#e8a020";
const GOLD2  = "#f5b840";
const AMBER  = "#c97a18";
const TEXT   = "#f0ebe0";
const MUTED  = "#9a9080";
const MUTED2 = "#6a6058";
const BORDER  = "rgba(232,160,32,0.12)";
const BORDER2 = "rgba(240,235,224,0.08)";
const EASE    = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
const R       = "14px";   // --r
const R2      = "20px";   // --r2

// ── keyframes ─────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ══════════════════════════════════════════════════════════════
//  SHARED — Eyebrow label  (.eyebrow)
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
        animation: `${fadeUp} .7s ease both`,
        "&::before": {
          content: '""',
          width: 28,
          height: "1.5px",
          background: GOLD,
        },
        "&::after": {
          content: '""',
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: GOLD,
          opacity: 0.5,
        },
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
//  INFO CARDS DATA
// ══════════════════════════════════════════════════════════════
const INFO_CARDS = [
  {
    Icon:  PlaceIcon,
    label: "Address",
    value: "Shop No. 12, Sector 27, Pradhikaran\nPimpri-Chinchwad, Pune – 411044",
  },
  {
    Icon:  PhoneIcon,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    Icon:  EmailIcon,
    label: "Email",
    value: "hello@nexvolt.in",
  },
  {
    Icon:  AccessTimeIcon,
    label: "Hours",
    value: "Mon–Sat: 10AM – 8PM\nSunday: 11AM – 6PM",
  },
];

const SUBJECTS = [
  "Product Inquiry",
  "Laptop Repair",
  "PC Repair",
  "Mobile Repair",
  "Bulk Order",
  "Other",
];

// ══════════════════════════════════════════════════════════════
//  SHARED INPUT STYLES  (.fi / .fl)
// ══════════════════════════════════════════════════════════════
const fieldSx = {
  mb: 2.5,
  "& .MuiFormLabel-root": {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: ".5px",
    textTransform: "uppercase",
    color: MUTED,
    "&.Mui-focused": { color: GOLD },
  },
  "& .MuiOutlinedInput-root": {
    background: INK2,
    borderRadius: R,
    color: TEXT,
    fontSize: 14,
    "& fieldset": {
      borderWidth: "1.5px",
      borderColor: BORDER2,
    },
    "&:hover fieldset": {
      borderColor: "rgba(232,160,32,0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: GOLD,
      boxShadow: "0 0 0 3px rgba(232,160,32,.08)",
    },
    "& input::placeholder, & textarea::placeholder": {
      color: MUTED2,
      opacity: 1,
    },
  },
};

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function Contact() {
  const [subject, setSubject] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    // plug in your submit logic here
    alert("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 8, md: 14 },          // .section  →  padding:110px 0
        background: INK2,               // .contact  →  background:var(--ink2)
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>

        {/* ── Section header ── */}
        <Eyebrow>Get In Touch</Eyebrow>

        <Typography
          component="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: TEXT,
            mb: 1.5,
            animation: `${fadeUp} .75s .1s ease both`,
          }}
        >
          Visit Us or <GoldText>Send a Message</GoldText>
        </Typography>

        {/* ── Two-column grid (.ct-grid) ── */}
        {/* HTML: grid-template-columns:1fr 1.4fr; gap:64px */}
        {/* <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          alignItems="flex-start"
          sx={{ mt: { xs: 4, md: 7.5 }  }}
          
          
        > */}

        <Grid
  container
  spacing={{ xs: 5, md: 8 }}
  alignItems="flex-start"
  sx={{ 
    mt: { xs: 4, md: 7.5 },
    ml: "60px"   
  }}
>

          {/* ════════════════════════════════
              LEFT — Info cards (.ct-info)
          ════════════════════════════════ */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5}>

              {INFO_CARDS.map(({ Icon, label, value }, i) => (
                <Box
                  key={label}
                  sx={{
                    /* .ct-card */
                    background: INK,
                    border: `1px solid ${BORDER2}`,
                    borderRadius: R,
                    p: "22px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "18px",
                    transition: EASE,
                    animation: `${fadeUp} .7s ${i * 0.08}s ease both`,
                    "&:hover": {
                      borderColor: BORDER,
                      transform: "translateX(6px)",
                    },
                  }}
                >
                  {/* .ct-ico */}
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      minWidth: 46,
                      borderRadius: "10px",
                      background: "rgba(232,160,32,.1)",
                      border: `1px solid ${BORDER}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: GOLD,
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Box>

                  <Box>
                    {/* .ct-lbl */}
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: MUTED2,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        mb: "5px",
                      }}
                    >
                      {label}
                    </Typography>
                    {/* .ct-val */}
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: TEXT,
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Map placeholder */}
              <Box
                sx={{
                  background: INK,
                  border: `1px solid ${BORDER2}`,
                  borderRadius: R,
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: MUTED,
                  animation: `${fadeUp} .7s .32s ease both`,
                }}
              >
                <MapIcon sx={{ fontSize: 32, color: GOLD }} />
                <Typography sx={{ fontWeight: 600, fontSize: 14, color: MUTED }}>
                  Pimpri-Chinchwad, Pune
                </Typography>
                <Typography sx={{ fontSize: 12, color: MUTED2 }}>
                  📍 Sector 27, Pradhikaran
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* ════════════════════════════════
              RIGHT — Contact form (.ct-form)
          ════════════════════════════════ */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                /* .ct-form */
                background: INK,
                border: `1px solid ${BORDER2}`,
                borderRadius: R2,
                p: { xs: 3, sm: 5.5 },
                animation: `${fadeUp} .7s .1s ease both`,
              }}
            >
              {/* .ct-form-title */}
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: TEXT,
                  mb: 1,
                }}
              >
                Send a Message
              </Typography>

              {/* .ct-form-sub */}
              <Typography
                sx={{
                  fontSize: 14,
                  color: MUTED,
                  mb: 4,
                }}
              >
                We reply within 24 hours — usually much faster.
              </Typography>

              {/* ── First Name + Last Name (.fg-row) ── */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    placeholder="Rahul"
                    value={form.firstName}
                    onChange={handleChange}
                    sx={fieldSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    placeholder="Sharma"
                    value={form.lastName}
                    onChange={handleChange}
                    sx={fieldSx}
                  />
                </Grid>
              </Grid>

              {/* ── Email ── */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                sx={fieldSx}
              />

              {/* ── Phone ── */}
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={handleChange}
                sx={fieldSx}
              />

              {/* ── Subject select ── */}
              <FormControl
                fullWidth
                sx={{
                  ...fieldSx,
                  "& .MuiSelect-select": {
                    color: subject ? TEXT : MUTED2,
                    fontSize: 14,
                  },
                  "& .MuiSelect-icon": { color: MUTED },
                }}
              >
                <InputLabel>Subject</InputLabel>
                <Select
                  value={subject}
                  label="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: INK3,
                        border: `1px solid ${BORDER2}`,
                        borderRadius: R,
                        mt: 0.5,
                        "& .MuiMenuItem-root": {
                          fontSize: 14,
                          color: MUTED,
                          py: 1.25,
                          "&:hover": { color: TEXT, background: "rgba(232,160,32,.06)" },
                          "&.Mui-selected": {
                            background: "rgba(232,160,32,.1)",
                            color: GOLD,
                            "&:hover": { background: "rgba(232,160,32,.14)" },
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled sx={{ color: MUTED2, fontSize: 14 }}>
                    Choose a subject
                  </MenuItem>
                  {SUBJECTS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* ── Message textarea ── */}
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                minRows={5}
                placeholder="Describe your issue or inquiry..."
                value={form.message}
                onChange={handleChange}
                sx={{
                  ...fieldSx,
                  "& textarea": { resize: "vertical" },
                }}
              />

              {/* ── Submit button (.ct-submit) ── */}
              <Button
                fullWidth
                onClick={handleSubmit}
                startIcon={<SendIcon />}
                sx={{
                  py: 2,
                  borderRadius: R,
                  background: GOLD,
                  color: INK,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: EASE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  "&:hover": {
                    background: GOLD2,
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(232,160,32,.3)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

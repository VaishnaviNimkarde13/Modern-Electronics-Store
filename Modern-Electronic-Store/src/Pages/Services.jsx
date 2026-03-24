import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Grid, Button,
  TextField, MenuItem, Select, FormControl, InputLabel,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ArrowForwardIcon       from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon         from '@mui/icons-material/ExpandMore';
import SendIcon               from '@mui/icons-material/Send';
import AccessTimeIcon         from '@mui/icons-material/AccessTime';
import VerifiedIcon           from '@mui/icons-material/Verified';
import SupportAgentIcon       from '@mui/icons-material/SupportAgent';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

/* ══ TOKENS ══ */
const C = {
  ink:'#0e0d0b', ink2:'#1a1916', ink3:'#242220', ink4:'#2f2d2a',
  gold:'#e8a020', gold2:'#f5b840', amber:'#c97a18',
  text:'#f0ebe0', muted:'#9a9080', muted2:'#6a6058',
  border:'rgba(232,160,32,0.12)', border2:'rgba(240,235,224,0.08)',
  rust:'#c44a1a', sage:'#7a9e7e',
};
const G = `linear-gradient(135deg,${C.amber},${C.gold},${C.gold2})`;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Outfit:wght@300;400;500;600;700&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  .rv     { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
  .rv.vis { opacity:1; transform:none; }
  .rv.d1  { transition-delay:.10s; }
  .rv.d2  { transition-delay:.18s; }
  .rv.d3  { transition-delay:.26s; }
  .rv.d4  { transition-delay:.34s; }
`;

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('vis'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Eyebrow({ children, center }) {
  return (
    <Box sx={{
      display:'inline-flex', alignItems:'center', gap:'10px', mb:2,
      fontSize:11, fontWeight:600, letterSpacing:3, textTransform:'uppercase',
      color:C.gold, fontFamily:'"Outfit",sans-serif',
      justifyContent: center ? 'center' : 'flex-start',
      '&::before':{ content:'""', display:'inline-block', width:28, height:'1.5px', bgcolor:C.gold },
      '&::after': { content:'""', display:'inline-block', width:8,  height:8, borderRadius:'50%', bgcolor:C.gold, opacity:.5 },
    }}>
      {children}
    </Box>
  );
}
function GoldText({ children }) {
  return (
    <Box component="span" sx={{ background:G, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
      {children}
    </Box>
  );
}

const goldBtn = {
  borderRadius:'6px', px:3.5, py:1.6, fontSize:13, fontWeight:700,
  fontFamily:'"Outfit",sans-serif', textTransform:'uppercase', letterSpacing:.8,
  background:G, color:C.ink, boxShadow:'0 6px 20px rgba(232,160,32,0.35)',
  transition:'all .3s ease',
  '&:hover':{ transform:'translateY(-2px)', boxShadow:'0 10px 28px rgba(232,160,32,0.45)' },
};
const outlineBtn = {
  borderRadius:'6px', px:3.5, py:1.6, fontSize:13, fontWeight:600,
  fontFamily:'"Outfit",sans-serif', textTransform:'uppercase', letterSpacing:.8,
  color:C.gold, borderColor:C.border, borderWidth:'1.5px',
  transition:'all .3s ease',
  '&:hover':{ borderColor:C.gold, bgcolor:'rgba(232,160,32,0.06)', transform:'translateY(-2px)' },
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius:'12px', backgroundColor:'rgba(255,255,255,0.04)',
    color:C.text, fontSize:14, fontFamily:'"Outfit",sans-serif',
    '& fieldset':{ borderColor:C.border2, borderWidth:'1.5px' },
    '&:hover fieldset':{ borderColor:'rgba(232,160,32,0.35)' },
    '&.Mui-focused fieldset':{ borderColor:C.gold, borderWidth:'1.5px', boxShadow:'0 0 0 3px rgba(232,160,32,0.10)' },
    '& input, & textarea':{ color:C.text },
    '& input::placeholder, & textarea::placeholder':{ color:C.muted2, opacity:1 },
  },
  '& .MuiInputLabel-root':{ color:C.muted, fontSize:13, fontFamily:'"Outfit",sans-serif' },
  '& .MuiInputLabel-root.Mui-focused':{ color:C.gold },
};

/* ══ DATA ══ */
const services = [
  { num:'01', emoji:'💻', title:'Laptop Repair',       price:'Starting ₹499', time:'2–6 hrs',    warranty:'90 days',
    desc:'Complete diagnosis and repair for all laptop brands — Apple, Dell, HP, Lenovo, Asus, and more.',
    features:['Screen & Display Replacement','Battery & Charging Port','Motherboard Repair','Data Recovery Services','Keyboard & Trackpad Fix'] },
  { num:'02', emoji:'🖥️', title:'PC / Desktop Repair', price:'Starting ₹699', time:'1–3 hrs',    warranty:'90 days',
    desc:'Full servicing, hardware upgrades, OS installs, and virus removal for desktops and all-in-ones.',
    features:['Hardware Upgrade (RAM/SSD)','Virus & Malware Removal','OS Installation & Setup','Power Supply Repair','Graphics Card Repair'] },
  { num:'03', emoji:'📱', title:'Mobile Repair',        price:'Starting ₹299', time:'30–60 min',  warranty:'90 days',
    desc:'Cracked screens, dead batteries, water damage — most mobile repairs completed within 60 minutes.',
    features:['Screen & Glass Replacement','Battery Replacement','Water Damage Treatment','Camera & Speaker Repair','Charging Port Repair'] },
  { num:'04', emoji:'🖨️', title:'Printer & Peripheral', price:'Starting ₹399', time:'1–4 hrs',    warranty:'60 days',
    desc:'Repair and servicing for all printer brands, scanners, external drives and other peripherals.',
    features:['Ink/Toner System Repair','Paper Feed Fix','Driver & Setup Support','Network Printer Config','External Device Repair'] },
  { num:'05', emoji:'📺', title:'Monitor Repair',       price:'Starting ₹599', time:'2–5 hrs',    warranty:'90 days',
    desc:'LCD, LED, and OLED monitor repairs including screen replacements, backlight issues, and dead pixels.',
    features:['LCD / LED Panel Replacement','Backlight Repair','Dead Pixel Fix','Power Board Repair','Port & Cable Repair'] },
  { num:'06', emoji:'🔋', title:'Battery Replacement',  price:'Starting ₹249', time:'30–90 min',  warranty:'6 months',
    desc:'Genuine replacement batteries for laptops, mobiles, tablets and smartwatches. Same-day service.',
    features:['Laptop Battery Replacement','Mobile Battery Replacement','Tablet Battery Service','Smartwatch Battery','Battery Health Check'] },
];

const steps = [
  { num:'01', icon:'📋', title:'Book Appointment', desc:"Fill in our quick form or call us. Tell us your device and issue — we'll confirm your slot." },
  { num:'02', icon:'🔍', title:'Free Diagnosis',   desc:'Bring your device in. Our technician runs a full diagnostic — no charge, no obligation.' },
  { num:'03', icon:'🛠️', title:'Expert Repair',   desc:'We fix it with genuine parts. Most repairs done same-day. Live updates via WhatsApp.' },
  { num:'04', icon:'✅', title:'Pick Up & Pay',    desc:"Collect your repaired device, test it on the spot. Pay only when you're 100% satisfied." },
];

const whyUs = [
  { icon:<VerifiedIcon sx={{ fontSize:28, color:C.gold }}/>,           title:'Certified Technicians', desc:'All engineers are trained and certified. We handle every brand with expertise.' },
  { icon:<AccessTimeIcon sx={{ fontSize:28, color:C.gold }}/>,         title:'Fast Turnaround',       desc:'Most repairs done within the same day. Walk in, walk out with a working device.' },
  { icon:<ThumbUpAltOutlinedIcon sx={{ fontSize:28, color:C.gold }}/>, title:'Genuine Spare Parts',  desc:'We only use OEM or brand-certified spare parts. No cheap knockoffs ever.' },
  { icon:<SupportAgentIcon sx={{ fontSize:28, color:C.gold }}/>,       title:'90-Day Warranty',       desc:'Every repair comes with a 90-day service warranty. We stand behind our work.' },
];

const testimonials = [
  { stars:5, text:'Got my MacBook screen replaced in under 2 hours. Incredibly professional and the price was very fair. Will definitely be back.', av:'R', name:'Rahul Sharma', role:'Software Engineer, Pune' },
  { stars:5, text:'My iPhone had water damage and I thought it was gone. NEXVOLT recovered it fully within the same afternoon. Amazing service!', av:'P', name:'Priya Desai', role:'Business Owner, Mumbai' },
  { stars:5, text:'Gaming PC GPU fault — diagnosed and repaired the same day. Excellent knowledge, honest pricing. My go-to repair shop.', av:'A', name:'Arjun Patil', role:'Student, Pimpri-Chinchwad' },
];

const faqs = [
  { q:'Do you provide a warranty on repairs?',             a:'Yes! All repairs come with a minimum 90-day service warranty. Battery replacements carry a 6-month warranty. If the same issue returns, we fix it free of charge.' },
  { q:'How long does a typical repair take?',              a:'Most mobile screen and battery replacements are done in 30–60 minutes. Laptop and PC repairs usually take 2–6 hours. Complex motherboard-level repairs may take 1–2 days.' },
  { q:'Do you use genuine / original spare parts?',        a:'We only use OEM or brand-certified spare parts. We never use low-quality knock-offs, which is why our repairs last longer and carry a warranty.' },
  { q:'Is the initial diagnosis really free?',             a:"Yes, the diagnostic check is completely free with no obligation. We'll tell you exactly what's wrong and give you a quote before any work begins." },
  { q:'Can you repair brands not listed on your website?', a:'Absolutely. Our technicians are trained across all major brands including Apple, Samsung, Dell, HP, Lenovo, Asus, Acer, OnePlus, Google, Sony and more.' },
  { q:'Do you offer home visit / pickup services?',        a:'Yes, we offer doorstep pickup and delivery for repairs within Pimpri-Chinchwad and select areas of Pune. Contact us to arrange a pickup.' },
];

/* ══ SERVICES PAGE ══ */
export default function Services() {
  useReveal();
  const [hovered,  setHovered]  = useState(null);
  const [subject,  setSubject]  = useState('');
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{css}</style>
      <Box id="services" sx={{ bgcolor:C.ink, color:C.text, fontFamily:'"Outfit",sans-serif' }}>

        {/* ══ HERO BANNER ══ */}
        <Box sx={{ pt:'120px', pb:'80px', position:'relative', overflow:'hidden', background:`linear-gradient(160deg,${C.ink} 0%,${C.ink2} 100%)` }}>
          <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(circle,rgba(232,160,32,0.07) 1px,transparent 1px)', backgroundSize:'40px 40px', opacity:.6 }} />
          <Box sx={{ position:'absolute', top:-100, right:-100, width:500, height:500, background:'radial-gradient(circle,rgba(232,160,32,0.07),transparent 65%)', pointerEvents:'none' }} />

          <Container maxWidth="xl">
            <Box sx={{ maxWidth:680 }}>
              <Box className="rv"><Eyebrow>What We Fix</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:38, md:58, lg:68 }, lineHeight:1.08, letterSpacing:-1, mb:2.5, color:C.text }}>
                Repair Services<br />
                <GoldText>Done Right.</GoldText>
              </Typography>
              <Typography className="rv d2" sx={{ fontSize:16, color:C.muted, lineHeight:1.85, fontWeight:300, maxWidth:520, mb:4.5 }}>
                Certified technicians, genuine spare parts, fast turnaround. All repairs come with a 90-day service warranty.
              </Typography>
              <Box className="rv d3" sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>
                <Button variant="contained" href="#book" endIcon={<ArrowForwardIcon />} sx={goldBtn}>Book a Repair</Button>
                <Button variant="outlined" href="tel:+919876543210" sx={outlineBtn}>📞 Call Now</Button>
              </Box>
            </Box>

            {/* Stats */}
            <Box className="rv d4" sx={{ display:'flex', gap:{ xs:3, md:6 }, mt:7, pt:5, borderTop:`1px solid ${C.border2}`, flexWrap:'wrap' }}>
              {[{ num:'12K+', label:'Devices Repaired' },{ num:'98%', label:'Customer Satisfaction' },{ num:'90', label:'Day Warranty' },{ num:'< 1h', label:'Avg. Mobile Repair' }].map(s => (
                <Box key={s.label}>
                  <Typography sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:36 }, color:C.gold, lineHeight:1 }}>{s.num}</Typography>
                  <Typography sx={{ fontSize:13, color:C.muted, mt:.6 }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ══ WHY CHOOSE US ══ */}
        <Box sx={{ py:7, bgcolor:C.ink3, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
          <Container maxWidth="xl">
            <Grid container spacing={0}>
              {whyUs.map((w,i) => (
                <Grid item xs={12} sm={6} md={3} key={w.title}>
                  <Box className={`rv d${i+1}`} sx={{ px:{ xs:2, md:4 }, py:3, borderRight:{ md: i<3?`1px solid ${C.border2}`:'none' }, borderBottom:{ xs: i<3?`1px solid ${C.border2}`:'none', md:'none' }, textAlign:{ xs:'left', md:'center' }, display:'flex', flexDirection:{ xs:'row', md:'column' }, alignItems:{ xs:'flex-start', md:'center' }, gap:2 }}>
                    <Box sx={{ mb:{ md:1.5 }, minWidth:36 }}>{w.icon}</Box>
                    <Box>
                      <Typography sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:16, mb:.6, color:C.text }}>{w.title}</Typography>
                      <Typography sx={{ fontSize:13, color:C.muted, lineHeight:1.7, fontWeight:300 }}>{w.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ SERVICE CARDS ══ */}
        <Box sx={{ py:'90px', bgcolor:C.ink2 }}>
          <Container maxWidth="xl">
            <Box sx={{ mb:7 }}>
              <Box className="rv"><Eyebrow>Our Services</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text, mb:1.5, lineHeight:1.1 }}>
                Everything We Repair
              </Typography>
              <Typography className="rv d2" sx={{ fontSize:15, color:C.muted, maxWidth:500, lineHeight:1.85, fontWeight:300 }}>
                From smartphones to workstations — if it has a circuit board, we can fix it.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {services.map((sv,i) => (
                <Grid item xs={12} sm={6} lg={4} key={sv.num} className={`rv d${(i%4)+1}`}>
                  <Box
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    sx={{
                      height:'100%', bgcolor:C.ink, border:`1px solid ${C.border2}`, borderRadius:'20px', p:'40px 32px',
                      position:'relative', overflow:'hidden', transition:'all .35s ease',
                      transform: hovered===i ? 'translateY(-5px)' : 'none',
                      borderColor: hovered===i ? C.border : C.border2,
                      boxShadow: hovered===i ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
                      '&::after':{ content:'""', position:'absolute', bottom:0, left:0, right:0, height:'3px', background:`linear-gradient(90deg,${C.amber},${C.gold},transparent)`, transform: hovered===i ? 'scaleX(1)' : 'scaleX(0)', transformOrigin:'left', transition:'transform .45s ease' },
                    }}
                  >
                    <Typography sx={{ fontFamily:'"Playfair Display",serif', fontSize:52, fontWeight:900, color:'rgba(232,160,32,0.10)', lineHeight:1, mb:2.5, userSelect:'none' }}>{sv.num}</Typography>
                    <Box sx={{ width:60, height:60, borderRadius:'12px', bgcolor: hovered===i ? 'rgba(232,160,32,0.12)' : C.ink3, border:`1px solid ${ hovered===i ? C.border : C.border2}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, mb:3, transition:'all .35s ease' }}>
                      {sv.emoji}
                    </Box>
                    <Typography sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:22, color:C.text, mb:1.5, lineHeight:1.2 }}>{sv.title}</Typography>
                    <Box sx={{ display:'inline-block', px:2, py:.7, borderRadius:'4px', bgcolor:'rgba(232,160,32,0.10)', border:`1px solid ${C.border}`, fontSize:12, fontWeight:700, color:C.gold, letterSpacing:.5, mb:2.5 }}>{sv.price}</Box>
                    <Box sx={{ display:'flex', gap:1, mb:2.5, flexWrap:'wrap' }}>
                      <Box sx={{ fontSize:11, color:C.muted, bgcolor:C.ink3, border:`1px solid ${C.border2}`, px:1.4, py:.5, borderRadius:'4px' }}>⏱ {sv.time}</Box>
                      <Box sx={{ fontSize:11, color:C.muted, bgcolor:C.ink3, border:`1px solid ${C.border2}`, px:1.4, py:.5, borderRadius:'4px' }}>🛡 {sv.warranty} warranty</Box>
                    </Box>
                    <Typography sx={{ fontSize:14, color:C.muted, lineHeight:1.85, fontWeight:300, mb:2.5 }}>{sv.desc}</Typography>
                    <Box component="ul" sx={{ listStyle:'none', p:0, mb:3 }}>
                      {sv.features.map(f => (
                        <Box component="li" key={f} sx={{ display:'flex', alignItems:'center', gap:1.2, fontSize:13, color:C.muted, py:.85, borderBottom:`1px solid rgba(255,255,255,0.04)`, '&:last-child':{ borderBottom:'none' }, '&::before':{ content:'"→"', color:C.gold, fontSize:12, flexShrink:0 } }}>{f}</Box>
                      ))}
                    </Box>
                    <Box component="a" href="#book" sx={{ display:'inline-flex', alignItems:'center', gap: hovered===i ? 1.6 : 1, fontSize:13, fontWeight:600, color:C.gold, textDecoration:'none', transition:'gap .25s ease', '&:hover':{ color:C.gold2 } }}>
                      Book Appointment <ArrowForwardIcon sx={{ fontSize:14 }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ HOW IT WORKS ══ */}
        <Box sx={{ py:'90px', bgcolor:C.ink }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign:'center', mb:7 }}>
              <Box className="rv" sx={{ display:'flex', justifyContent:'center' }}><Eyebrow center>The Process</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text, mb:1.5 }}>How It Works</Typography>
              <Typography className="rv d2" sx={{ fontSize:15, color:C.muted, lineHeight:1.85, fontWeight:300, maxWidth:480, mx:'auto' }}>Getting your device fixed is simple — just 4 easy steps.</Typography>
            </Box>
            <Grid container spacing={3}>
              {steps.map((step,i) => (
                <Grid item xs={12} sm={6} md={3} key={step.num} className={`rv d${i+1}`}>
                  <Box sx={{ bgcolor:C.ink2, border:`1px solid ${C.border2}`, borderRadius:'20px', p:'36px 28px', position:'relative', overflow:'hidden', transition:'all .3s ease', '&:hover':{ transform:'translateY(-4px)', borderColor:C.border, boxShadow:'0 16px 48px rgba(0,0,0,0.3)' } }}>
                    {i < 3 && <Box sx={{ display:{ xs:'none', md:'block' }, position:'absolute', top:52, right:-14, width:28, height:1.5, bgcolor:C.border, zIndex:2 }} />}
                    <Typography sx={{ fontFamily:'"Playfair Display",serif', fontSize:44, fontWeight:900, color:'rgba(232,160,32,0.10)', lineHeight:1, mb:2.5, userSelect:'none' }}>{step.num}</Typography>
                    <Typography sx={{ fontSize:36, mb:2, display:'block' }}>{step.icon}</Typography>
                    <Typography sx={{ fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:18, color:C.text, mb:1.2 }}>{step.title}</Typography>
                    <Typography sx={{ fontSize:13, color:C.muted, lineHeight:1.8, fontWeight:300 }}>{step.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ TESTIMONIALS ══ */}
        <Box sx={{ py:'90px', bgcolor:C.ink2 }}>
          <Container maxWidth="xl">
            <Box sx={{ mb:7 }}>
              <Box className="rv"><Eyebrow>Customer Stories</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text, lineHeight:1.1 }}>
                What Our <GoldText>Clients Say</GoldText>
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {testimonials.map((t,i) => (
                <Grid item xs={12} md={4} key={t.name} className={`rv d${i+1}`}>
                  <Box sx={{ bgcolor:C.ink, border:`1px solid ${C.border2}`, borderRadius:'20px', p:'32px', height:'100%', transition:'all .3s ease', '&:hover':{ transform:'translateY(-4px)', borderColor:C.border } }}>
                    <Typography sx={{ fontFamily:'"Playfair Display",serif', fontSize:48, color:C.gold, opacity:.3, lineHeight:1, mb:1 }}>"</Typography>
                    <Box sx={{ display:'flex', gap:.3, mb:2 }}>
                      {Array(t.stars).fill(0).map((_,j) => <Typography key={j} sx={{ color:C.gold, fontSize:14 }}>★</Typography>)}
                    </Box>
                    <Typography sx={{ fontSize:14, color:C.muted, lineHeight:1.85, fontStyle:'italic', fontWeight:300, mb:3 }}>{t.text}</Typography>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                      <Box sx={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${C.amber},${C.gold})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Playfair Display",serif', fontWeight:800, fontSize:17, color:C.ink }}>{t.av}</Box>
                      <Box>
                        <Typography sx={{ fontWeight:700, fontSize:14, color:C.text }}>{t.name}</Typography>
                        <Typography sx={{ fontSize:12, color:C.muted2 }}>{t.role}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ BOOK APPOINTMENT FORM ══ */}
        <Box id="book" sx={{ py:'90px', bgcolor:C.ink }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign:'center', mb:6 }}>
              <Box className="rv" sx={{ display:'flex', justifyContent:'center' }}><Eyebrow center>Get In Touch</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text, mb:1.5 }}>Book a Repair</Typography>
              <Typography className="rv d2" sx={{ fontSize:15, color:C.muted, lineHeight:1.85, fontWeight:300 }}>
                Fill in the form below and we'll confirm your appointment within 1 hour.
              </Typography>
            </Box>
            <Box className="rv d2" sx={{ bgcolor:C.ink2, border:`1px solid ${C.border}`, borderRadius:'24px', p:{ xs:'28px 22px', sm:'48px' } }}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Full Name"     placeholder="Rahul Sharma"      size="small" sx={inputSx} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Phone Number"  placeholder="+91 XXXXX XXXXX"   type="tel"   size="small" sx={inputSx} /></Grid>
                <Grid item xs={12}>       <TextField fullWidth label="Email Address" placeholder="you@example.com"   type="email" size="small" sx={inputSx} /></Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color:C.muted, fontFamily:'"Outfit",sans-serif', '&.Mui-focused':{ color:C.gold } }}>Device Type</InputLabel>
                    <Select value={subject} onChange={e => setSubject(e.target.value)} label="Device Type"
                      sx={{ borderRadius:'12px', color:C.text, fontFamily:'"Outfit",sans-serif', bgcolor:'rgba(255,255,255,0.04)', '& .MuiOutlinedInput-notchedOutline':{ borderColor:C.border2, borderWidth:'1.5px' }, '&:hover .MuiOutlinedInput-notchedOutline':{ borderColor:'rgba(232,160,32,0.35)' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline':{ borderColor:C.gold, boxShadow:'0 0 0 3px rgba(232,160,32,0.10)' }, '& .MuiSvgIcon-root':{ color:C.muted } }}
                      MenuProps={{ PaperProps:{ sx:{ bgcolor:C.ink3, border:`1px solid ${C.border}`, color:C.text, '& .MuiMenuItem-root:hover':{ bgcolor:'rgba(232,160,32,0.08)' } } } }}>
                      {['Laptop','Desktop / PC','Mobile Phone','Monitor','Printer','Battery Replacement','Other'].map(o => (
                        <MenuItem key={o} value={o} sx={{ fontFamily:'"Outfit",sans-serif', fontSize:14 }}>{o}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Device Brand & Model" placeholder="e.g. MacBook Pro 2021" size="small" sx={inputSx} /></Grid>
                <Grid item xs={12}>       <TextField fullWidth label="Describe the Issue" placeholder="Tell us what's wrong with your device…" multiline rows={4} size="small" sx={inputSx} /></Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth size="large" startIcon={<SendIcon />}
                    onClick={() => alert("Appointment booked! We'll confirm within 1 hour.")}
                    sx={{ ...goldBtn, borderRadius:'12px', py:1.8, fontSize:14, fontWeight:700, letterSpacing:.8 }}>
                    Book Appointment
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ FAQ ══ */}
        <Box sx={{ py:'90px', bgcolor:C.ink2 }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign:'center', mb:6 }}>
              <Box className="rv" sx={{ display:'flex', justifyContent:'center' }}><Eyebrow center>FAQ</Eyebrow></Box>
              <Typography className="rv d1" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text }}>
                Frequently Asked Questions
              </Typography>
            </Box>
            <Box className="rv d2">
              {faqs.map((faq,i) => (
                <Accordion key={i} expanded={expanded===i} onChange={() => setExpanded(expanded===i ? false : i)} elevation={0}
                  sx={{ bgcolor:C.ink, border:`1px solid ${C.border2}`, borderRadius:'14px !important', mb:1.5, overflow:'hidden', '&:before':{ display:'none' }, '&.Mui-expanded':{ borderColor:C.border } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded===i ? C.gold : C.muted }} />} sx={{ px:3, py:.5, '& .MuiAccordionSummary-content':{ my:2 } }}>
                    <Typography sx={{ fontWeight:600, fontSize:15, color: expanded===i ? C.gold : C.text, fontFamily:'"Outfit",sans-serif', transition:'color .2s' }}>{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px:3, pb:3, pt:0 }}>
                    <Typography sx={{ fontSize:14, color:C.muted, lineHeight:1.85, fontWeight:300 }}>{faq.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ══ BOTTOM CTA ══ */}
        <Box sx={{ py:'80px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#1c1409,#2a1e08)', borderTop:`1px solid rgba(232,160,32,0.2)` }}>
          <Box sx={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(232,160,32,0.12),transparent 65%)', pointerEvents:'none' }} />
          <Container maxWidth="md" sx={{ textAlign:'center', position:'relative', zIndex:1 }}>
            <Typography className="rv" sx={{ fontFamily:'"Playfair Display",serif', fontWeight:900, fontSize:{ xs:28, md:44 }, color:C.text, mb:1.5, lineHeight:1.1 }}>
              Device Broken? <GoldText>We Fix It Fast.</GoldText>
            </Typography>
            <Typography className="rv d1" sx={{ fontSize:15, color:C.muted, lineHeight:1.85, fontWeight:300, mb:4.5, maxWidth:460, mx:'auto' }}>
              Walk in anytime. Free diagnosis. Same-day repairs. 90-day warranty. Located in Pimpri-Chinchwad, Pune.
            </Typography>
            <Box className="rv d2" sx={{ display:'flex', gap:2, justifyContent:'center', flexWrap:'wrap' }}>
              <Button variant="contained" href="#book" sx={goldBtn}>Book a Repair</Button>
              <Button variant="outlined" href="tel:+919876543210" sx={outlineBtn}>📞 +91 98765 43210</Button>
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  );
}
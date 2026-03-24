import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Divider,
  Checkbox, FormControlLabel, IconButton,
  InputAdornment, Alert, Fade, Paper, Container, Grid,
} from '@mui/material';
import GoogleIcon               from '@mui/icons-material/Google';
import AppleIcon                from '@mui/icons-material/Apple';
import Visibility               from '@mui/icons-material/Visibility';
import VisibilityOff            from '@mui/icons-material/VisibilityOff';
import LoginIcon                from '@mui/icons-material/Login';
import PersonAddIcon            from '@mui/icons-material/PersonAdd';
import PersonOutlineIcon        from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon        from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon         from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon        from '@mui/icons-material/PhoneOutlined';
import CheckCircleIcon          from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowBackIcon            from '@mui/icons-material/ArrowBack';


const C = {
  bg:       '#111010',
  card:     '#1e1c1a',
  border:   'rgba(255,255,255,0.10)',
  borderH:  'rgba(232,160,32,0.50)',
  gold:     '#e8a020',
  gold2:    '#f5b840',
  goldD:    '#c97a18',
  text:     '#f0ebe0',
  muted:    '#9a9080',
  muted2:   '#6a6058',
  coral:    '#c44a1a',
  green:    '#10b981',
  amber:    '#f59e0b',
  blue3:    '#3b82f6',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;0,900;1,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  @keyframes blobMove {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  @keyframes scaleIn     { from { opacity:0; transform:scale(0.94); }      to { opacity:1; transform:scale(1); }    }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #111010; overflow-y: auto; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #111010; }
  ::-webkit-scrollbar-thumb { background: #e8a020; border-radius: 3px; }
  /* Override autofill background color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #1e1c1a inset !important;
    -webkit-text-fill-color: #f0ebe0 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontSize: 14,
    color: C.text,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    '& fieldset':               { borderColor: C.border,  borderWidth: '1.5px' },
    '&:hover fieldset':         { borderColor: C.borderH                        },
    '&.Mui-focused fieldset':   { borderColor: C.gold, borderWidth: '1.5px', boxShadow: '0 0 0 3px rgba(232,160,32,0.12)' },
    '& input':                  { color: C.text },
    '& input::placeholder':     { color: C.muted2, opacity: 1 },
  },
  '& .MuiInputLabel-root': {
    color: C.muted, fontSize: 11, letterSpacing: 1,
    textTransform: 'uppercase', fontWeight: 700,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: C.gold },
};

const pwdRules = [
  { label: 'At least 8 characters',     test: p => p.length >= 8          },
  { label: 'One uppercase letter (A–Z)', test: p => /[A-Z]/.test(p)        },
  { label: 'One number (0–9)',           test: p => /[0-9]/.test(p)        },
  { label: 'One special character',     test: p => /[^A-Za-z0-9]/.test(p) },
];
const getStrength  = pwd => pwdRules.filter(r => r.test(pwd)).length;
const strengthMeta = [
  { label: '',        color: C.muted  },
  { label: 'Weak',   color: C.coral  },
  { label: 'Fair',   color: C.amber  },
  { label: 'Good',   color: C.blue3  },
  { label: 'Strong', color: C.green  },
];

const submitSx = (loading) => ({
  borderRadius: '10px', py: 1.75, fontSize: 14, fontWeight: 800,
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  textTransform: 'uppercase', letterSpacing: 0.8,
  background: loading
    ? 'rgba(232,160,32,0.35)'
    : `linear-gradient(135deg, ${C.goldD}, ${C.gold}, ${C.gold2})`,
  color: '#0e0d0b',
  boxShadow: '0 4px 20px rgba(232,160,32,0.35)',
  transition: 'all .3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 28px rgba(232,160,32,0.50)',
  },
  '&:disabled': { background: 'rgba(232,160,32,0.30)', color: '#0e0d0b' },
});

function SocialBtn({ icon, label }) {
  return (
    <Button fullWidth startIcon={icon} variant="outlined"
      sx={{
        borderRadius: '10px', py: 1.1, fontSize: 13, fontWeight: 600,
        color: C.text, borderColor: C.border, borderWidth: '1.5px',
        bgcolor: 'rgba(255,255,255,0.04)', textTransform: 'none',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        '&:hover': { borderColor: C.borderH, bgcolor: 'rgba(232,160,32,0.07)', color: C.gold, borderWidth: '1.5px' },
        transition: 'all .2s',
      }}
    >{label}</Button>
  );
}


function LoginForm({ onSwitch }) {
  const [showPwd,  setShowPwd]  = useState(false);
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [form,     setForm]     = useState({ email: '', password: '' });

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password)         { setError('Please fill in all fields.');        return; }
    if (!/\S+@\S+\.\S+/.test(form.email))      { setError('Enter a valid email address.');      return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));  
    setLoading(false);
    alert('Logged in successfully!');             
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ animation: 'fadeSlideIn 0.3s ease' }}>

      <Box sx={{ display: 'flex', gap: 1.2, mb: 2 }}>
        <SocialBtn icon={<GoogleIcon sx={{ fontSize: 17 }} />} label="Google" />
        <SocialBtn icon={<AppleIcon  sx={{ fontSize: 17 }} />} label="Apple"  />
      </Box>

      <Divider sx={{ my: 1.8, borderColor: 'rgba(255,255,255,0.08)' }}>
        <Typography sx={{ fontSize: 12, color: C.muted2, px: 1.5, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>or use email</Typography>
      </Divider>

      <Fade in={!!error}>
        <Alert severity="error" sx={{ mb: 1.5, borderRadius: '10px', bgcolor: 'rgba(196,74,26,0.15)', border: '1px solid rgba(196,74,26,0.3)', color: C.text, '& .MuiAlert-icon': { color: C.coral } }}>
          {error}
        </Alert>
      </Fade>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>

        <TextField fullWidth label="EMAIL" name="email" type="email"
          placeholder="you@example.com" value={form.email} onChange={onChange}
          size="small" sx={inputSx}
          InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment> }}
        />

        <TextField fullWidth label="PASSWORD" name="password"
          type={showPwd ? 'text' : 'password'}
          placeholder="••••••••" value={form.password} onChange={onChange}
          size="small" sx={inputSx}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShowPwd(v => !v)} sx={{ color: C.muted2, '&:hover': { color: C.gold } }}>
                  {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: -0.5 }}>
          <FormControlLabel
            control={<Checkbox size="small" checked={remember} onChange={e => setRemember(e.target.checked)} sx={{ color: 'rgba(255,255,255,0.15)', '&.Mui-checked': { color: C.gold }, p: '4px' }} />}
            label={<Typography sx={{ fontSize: 13, color: C.muted, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Remember me</Typography>}
          />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: C.gold, cursor: 'pointer', '&:hover': { color: C.gold2 } }}>
            Forgot password?
          </Typography>
        </Box>

        <Button type="submit" variant="contained" fullWidth size="large"
          disabled={loading} startIcon={!loading && <LoginIcon />} sx={submitSx(loading)}>
          {loading ? 'Signing In…' : 'Sign In'}
        </Button>

        <Typography sx={{ textAlign: 'center', fontSize: 13, color: C.muted }}>
          No account?{' '}
          <Box component="span" onClick={onSwitch} sx={{ color: C.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { color: C.gold2 } }}>
            Create one free
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}


function SignupForm({ onSwitch }) {
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [agreed,   setAgreed]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });

  const onChange    = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const strength    = getStrength(form.password);
  const pwdMatch    = form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const pwdBadMatch = form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !password || !confirmPassword) { setError('Please fill in all required fields.'); return; }
    if (!/\S+@\S+\.\S+/.test(email))   { setError('Enter a valid email address.'); return; }
    if (password.length < 8)            { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword)   { setError('Passwords do not match.'); return; }
    if (!agreed)                        { setError('Please accept the Terms & Privacy Policy.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); 
    setLoading(false);
    alert('Account created successfully!');     
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ animation: 'fadeSlideIn 0.3s ease' }}>

      <Box sx={{ display: 'flex', gap: 1.2, mb: 2 }}>
        <SocialBtn icon={<GoogleIcon sx={{ fontSize: 17 }} />} label="Google" />
        <SocialBtn icon={<AppleIcon  sx={{ fontSize: 17 }} />} label="Apple"  />
      </Box>

      <Divider sx={{ my: 1.8, borderColor: 'rgba(255,255,255,0.08)' }}>
        <Typography sx={{ fontSize: 12, color: C.muted2, px: 1.5, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>or sign up with email</Typography>
      </Divider>

      <Fade in={!!error}>
        <Alert severity="error" sx={{ mb: 1.5, borderRadius: '10px', bgcolor: 'rgba(196,74,26,0.15)', border: '1px solid rgba(196,74,26,0.3)', color: C.text, '& .MuiAlert-icon': { color: C.coral } }}>
          {error}
        </Alert>
      </Fade>

      <Grid container spacing={1.5}>

        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="FIRST NAME" name="firstName" placeholder="Rahul"
            value={form.firstName} onChange={onChange} size="small" sx={inputSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="LAST NAME" name="lastName" placeholder="Sharma"
            value={form.lastName} onChange={onChange} size="small" sx={inputSx}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="EMAIL" name="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={onChange} size="small" sx={inputSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment> }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="PHONE (OPTIONAL)" name="phone" type="tel" placeholder="+91 XXXXX XXXXX"
            value={form.phone} onChange={onChange} size="small" sx={inputSx}
            InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment> }}
          />
        </Grid>

        {/* Password + strength */}
        <Grid item xs={12}>
          <TextField fullWidth label="PASSWORD" name="password"
            type={showPwd ? 'text' : 'password'} placeholder="Min 8 characters"
            value={form.password} onChange={onChange} onFocus={() => setPwdFocus(true)}
            size="small" sx={inputSx}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPwd(v => !v)} sx={{ color: C.muted2, '&:hover': { color: C.gold } }}>
                    {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {form.password.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', gap: '5px', mb: 0.5 }}>
                {[1, 2, 3, 4].map(s => (
                  <Box key={s} sx={{ flex: 1, height: 4, borderRadius: 4, bgcolor: strength >= s ? strengthMeta[strength].color : 'rgba(255,255,255,0.10)', transition: 'background-color 0.3s ease' }} />
                ))}
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: strengthMeta[strength].color }}>
                {strengthMeta[strength].label && `${strengthMeta[strength].label} password`}
              </Typography>
            </Box>
          )}
          {pwdFocus && form.password.length > 0 && (
            <Box sx={{ mt: 1, p: '10px 12px', bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              {pwdRules.map(r => {
                const pass = r.test(form.password);
                return (
                  <Box key={r.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4, '&:last-child': { mb: 0 } }}>
                    {pass ? <CheckCircleIcon sx={{ fontSize: 12, color: C.green }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: 12, color: C.muted2 }} />}
                    <Typography sx={{ fontSize: 11, color: pass ? C.green : C.muted, fontWeight: pass ? 600 : 400 }}>{r.label}</Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="CONFIRM PASSWORD" name="confirmPassword"
            type={showCPwd ? 'text' : 'password'} placeholder="Re-enter your password"
            value={form.confirmPassword} onChange={onChange} size="small"
            sx={{
              ...inputSx,
              '& .MuiOutlinedInput-root': {
                ...inputSx['& .MuiOutlinedInput-root'],
                '& fieldset': {
                  borderColor: pwdMatch ? 'rgba(16,185,129,0.6)' : pwdBadMatch ? 'rgba(196,74,26,0.6)' : C.border,
                  borderWidth: '1.5px',
                },
              },
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 17, color: C.muted2 }} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowCPwd(v => !v)} sx={{ color: C.muted2, '&:hover': { color: C.gold } }}>
                    {showCPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {pwdMatch    && <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.5 }}><CheckCircleIcon sx={{ fontSize: 12, color: C.green }} /><Typography sx={{ fontSize: 11, color: C.green, fontWeight: 600 }}>Passwords match</Typography></Box>}
          {pwdBadMatch && <Typography sx={{ fontSize: 11, color: C.coral, mt: 0.5 }}>Passwords do not match</Typography>}
        </Grid>

        {/* Terms */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox size="small" checked={agreed} onChange={e => setAgreed(e.target.checked)} sx={{ color: 'rgba(255,255,255,0.15)', '&.Mui-checked': { color: C.gold }, p: '4px', mr: 0.5 }} />}
            label={
              <Typography sx={{ fontSize: 12, color: C.muted, lineHeight: 1.5, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                I agree to the{' '}
                <Box component="span" sx={{ color: C.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { color: C.gold2 } }}>Terms of Service</Box>
                {' '}and{' '}
                <Box component="span" sx={{ color: C.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { color: C.gold2 } }}>Privacy Policy</Box>
              </Typography>
            }
            sx={{ alignItems: 'flex-start', mt: 0.5 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth size="large"
            disabled={loading} startIcon={!loading && <PersonAddIcon />} sx={submitSx(loading)}>
            {loading ? 'Creating Account…' : 'Create Account'}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'center', fontSize: 13, color: C.muted }}>
            Already have an account?{' '}
            <Box component="span" onClick={onSwitch} sx={{ color: C.gold, fontWeight: 600, cursor: 'pointer', '&:hover': { color: C.gold2 } }}>
              Sign in here
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}


export default function AuthPage({ defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);
  const isLogin  = tab === 'login';
  const isSignup = tab === 'signup';

  return (
    <>
      <style>{globalStyles}</style>

      <Box sx={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        bgcolor: C.bg, position: 'relative', overflow: 'hidden',
        fontFamily: '"Plus Jakarta Sans", sans-serif', py: 4,
      }}>

        {/* Amber glow blobs */}
        <Box sx={{ position: 'absolute', width: 480, height: 480, top: -120, right: -120, background: 'rgba(232,160,32,0.06)', filter: 'blur(70px)', animation: 'blobMove 10s ease-in-out infinite', borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%', pointerEvents: 'none', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', width: 340, height: 340, bottom: -80, left: -80, background: 'rgba(196,74,26,0.05)', filter: 'blur(70px)', animation: 'blobMove 10s 3s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />

        {/* Dot grid */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(232,160,32,0.07) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

        <Container maxWidth={isSignup ? 'sm' : 'xs'} sx={{ position: 'relative', zIndex: 1 }}>

          {/* ── Card ── */}
          <Paper elevation={0} sx={{
            borderRadius: '24px',
            border: '1.5px solid rgba(232,160,32,0.18)',
            bgcolor: C.card,
            p: { xs: '24px 20px', sm: '32px' },
            boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
            animation: 'scaleIn 0.35s ease',
            transition: 'all 0.3s ease',
          }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.2, mb: 2.5 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: '10px', background: `linear-gradient(135deg, ${C.goldD}, ${C.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(232,160,32,0.40)' }}>
                <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 900, fontSize: 18, color: '#0e0d0b' }}>V</Typography>
              </Box>
              <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 800, fontSize: 20, letterSpacing: 2, color: C.text }}>
                VOLT<span style={{ color: C.gold }}>EX</span>
              </Typography>
            </Box>

            {/* Heading */}
            <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 900, fontSize: 28, color: C.text, textAlign: 'center', mb: 0.5, letterSpacing: '-0.5px' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography sx={{ fontSize: 13, color: C.muted, textAlign: 'center', mb: 2.5 }}>
              {isLogin ? 'Sign in to your account' : 'Join 12,000+ happy VOLTEX customers'}
            </Typography>

            {/* Tab switcher — dark pill style matching screenshot */}
            <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '12px', p: '4px', border: '1.5px solid rgba(255,255,255,0.08)', mb: 2.5, gap: '4px' }}>
              <Box onClick={() => setTab('login')} sx={{ flex: 1, py: 1, borderRadius: '9px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s ease', bgcolor: isLogin ? C.gold : 'transparent', boxShadow: isLogin ? '0 4px 12px rgba(232,160,32,0.35)' : 'none', '&:hover': !isLogin ? { bgcolor: 'rgba(255,255,255,0.06)' } : {} }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: isLogin ? '#0e0d0b' : C.muted, fontFamily: '"Plus Jakarta Sans", sans-serif', transition: 'color 0.25s' }}>Sign In</Typography>
              </Box>
              <Box onClick={() => setTab('signup')} sx={{ flex: 1, py: 1, borderRadius: '9px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s ease', bgcolor: isSignup ? C.gold : 'transparent', boxShadow: isSignup ? '0 4px 12px rgba(232,160,32,0.35)' : 'none', '&:hover': !isSignup ? { bgcolor: 'rgba(255,255,255,0.06)' } : {} }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: isSignup ? '#0e0d0b' : C.muted, fontFamily: '"Plus Jakarta Sans", sans-serif', transition: 'color 0.25s' }}>Create Account</Typography>
              </Box>
            </Box>

            {/* Render active form */}
            {isLogin
              ? <LoginForm  onSwitch={() => setTab('signup')} />
              : <SignupForm onSwitch={() => setTab('login')}  />
            }
          </Paper>

          {/* Back to home */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button href="/" startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
              sx={{ color: C.muted2, fontSize: 12, fontWeight: 500, textTransform: 'none', fontFamily: '"Plus Jakarta Sans", sans-serif', '&:hover': { color: C.gold, bgcolor: 'transparent' } }}>
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
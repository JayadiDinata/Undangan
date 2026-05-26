import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScrollReveal from './ScrollReveal';

const Corner = ({ top, right, bottom, left }) => (
  <Box
    sx={{
      position: 'absolute',
      top: top ?? 'auto',
      right: right ?? 'auto',
      bottom: bottom ?? 'auto',
      left: left ?? 'auto',
      width: { xs: 35, sm: 45 },
      height: { xs: 35, sm: 45 },
      borderColor: 'primary.main',
      borderStyle: 'solid',
      borderWidth: `${top ? 3 : 0}px ${right ? 3 : 0}px ${bottom ? 3 : 0}px ${left ? 3 : 0}px`,
    }}
  />
);

const staggerItems = [
  { Component: 'div', sx: { width: '100%' }, delay: 0 },
  { Component: Typography, props: { variant: 'body2', sx: { fontSize: 11, letterSpacing: 4, color: 'secondary.main', textTransform: 'uppercase', mb: 2 } }, text: 'The Wedding of', delay: 0.1 },
  { Component: Box, sx: { width: 160, height: 190, mx: 'auto', mb: 2, borderRadius: '50% / 55%', overflow: 'hidden', border: '3px solid', borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(26,58,92,0.2)' }, children: <Box component="img" src="/img/bride.jpg" alt="Ellysa Fitri" sx={{ width: 1, height: 1, objectFit: 'cover', display: 'block' }} />, delay: 0.2 },
  { Component: Typography, props: { variant: 'h1', sx: { fontSize: { xs: 28, sm: 34 }, color: 'primary.main', textAlign: 'center' } }, text: 'Ellysa Fitri', delay: 0.35 },
  { Component: Typography, props: { variant: 'body2', sx: { fontSize: 22, color: 'secondary.main', textAlign: 'center', fontStyle: 'italic', fontFamily: '"Playfair Display", serif' } }, text: '&', delay: 0.5 },
  { Component: Typography, props: { variant: 'h1', sx: { fontSize: { xs: 28, sm: 34 }, color: 'primary.main', textAlign: 'center' } }, text: 'Muhammad Imron', delay: 0.6 },
  { Component: Box, sx: { width: 50, height: 2, bgcolor: 'secondary.main', mx: 'auto', my: 2, transform: 'scaleX(0)', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1) 0.75s' }, delay: 0 },
  { Component: Box, sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }, children: <><CalendarTodayIcon sx={{ color: 'secondary.main', fontSize: 18 }} /><Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>23 Mei 2026</Typography></>, delay: 0.85 },
];

export default function CoverSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: { xs: 2.5, sm: 3 },
        py: { xs: 3, sm: 4 },
        pt: 'calc(40px + env(safe-area-inset-top, 0px))',
        pb: 'calc(40px + env(safe-area-inset-bottom, 0px))',
        background: 'linear-gradient(180deg, #eaf1f8 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.82)',
          pointerEvents: 'none',
        },
      }}
    >
      <ScrollReveal sx={{ position: 'relative', zIndex: 1, width: 1, maxWidth: 360 }}>
        <Box sx={{ p: { xs: 2.5, sm: 3.5 }, bgcolor: 'background.paper', border: '2px solid', borderColor: '#d6e6f2', boxShadow: '0 10px 30px rgba(26,58,92,0.1)', position: 'relative' }}>
          <Corner top={-2} left={-2} />
          <Corner top={-2} right={-2} />
          <Corner bottom={-2} left={-2} />
          <Corner bottom={-2} right={-2} />
          <Typography variant="body2" sx={{ fontSize: 11, letterSpacing: 4, color: 'secondary.main', textTransform: 'uppercase', mb: 2 }}>
            The Wedding of
          </Typography>
          <Box sx={{ width: { xs: 130, sm: 160 }, height: { xs: 155, sm: 190 }, mx: 'auto', mb: 2, borderRadius: '50% / 55%', overflow: 'hidden', border: '3px solid', borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(26,58,92,0.2)' }}>
            <Box component="img" src="/img/bride.jpg" alt="Ellysa Fitri" sx={{ width: 1, height: 1, objectFit: 'cover', display: 'block' }} />
          </Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 34 }, color: 'primary.main' }}>
            Ellysa Fitri
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 22, color: 'secondary.main', textAlign: 'center', fontStyle: 'italic', fontFamily: '"Playfair Display", serif', my: 0.5 }}>
            &
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 34 }, color: 'primary.main' }}>
            Muhammad Imron
          </Typography>
          <Box sx={{ width: 50, height: 2, bgcolor: 'secondary.main', mx: 'auto', my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ color: 'secondary.main', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>
              23 Mei 2026
            </Typography>
          </Box>
        </Box>
      </ScrollReveal>
    </Box>
  );
}

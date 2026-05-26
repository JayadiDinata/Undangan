import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ScrollReveal from './ScrollReveal';

export default function ClosingSection() {
  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(180deg, #1a3a5c 0%, #0f2440 100%)',
        textAlign: 'center',
        py: { xs: 5, sm: 8 },
        px: { xs: 2, sm: 3 },
        pt: 'calc(80px + env(safe-area-inset-top, 0px))',
        pb: 'calc(80px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <ScrollReveal>
        <Typography variant="body2" sx={{ fontSize: 18, color: '#eaf1f8', fontFamily: '"Playfair Display", serif', mb: 1 }}>
          Kami yang berbahagia
        </Typography>
        <Divider sx={{ width: 40, mx: 'auto', my: 1.5, borderColor: '#d6e6f2', borderWidth: 1 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 36 }, color: 'white', my: 1 }}>
          Ellysa Fitri & Muhammad Imron
        </Typography>
        <Divider sx={{ width: 40, mx: 'auto', my: 1.5, borderColor: '#d6e6f2', borderWidth: 1 }} />
        <Typography variant="body2" sx={{ fontSize: 14, color: '#eaf1f8', mt: 0.5 }}>
          Beserta Keluarga Besar
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 14, color: '#eaf1f8', opacity: 0.9, lineHeight: 1.6, mt: 1 }}>
          Wassalamu'alaikum Warahmatullahi Wabarakatuh
        </Typography>
      </ScrollReveal>
    </Box>
  );
}

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScrollReveal from './ScrollReveal';

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{ textAlign: 'center', py: { xs: 3, sm: 4 }, px: { xs: 1.5, sm: 2.5 }, bgcolor: 'background.paper' }}
    >
      <ScrollReveal>
        <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
          Terima kasih atas kehadiran dan doa restunya
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, my: 1 }}>
          <FavoriteIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
          <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>23 Mei 2026</Typography>
        </Box>
        <Typography variant="body2" sx={{ fontFamily: '"Dancing Script", "Playfair Display", cursive', fontSize: { xs: 15, sm: 18 }, color: 'primary.main', mt: 1 }}>
          Ellysa Fitri & Muhammad Imron
        </Typography>
      </ScrollReveal>
    </Box>
  );
}

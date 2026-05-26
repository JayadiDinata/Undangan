import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fade } from '@mui/material';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={visible}>
      <Fab
        onClick={scrollToTop}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
          right: 'max(20px, env(safe-area-inset-right, 20px))',
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.light' },
          zIndex: 1200,
          boxShadow: '0 4px 12px rgba(26,58,92,0.25)',
        }}
        aria-label="Scroll to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
}

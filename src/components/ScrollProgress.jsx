import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / h) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 'env(safe-area-inset-top, 0px)',
        left: '50%',
        transform: 'translateX(-50%)',
        height: 3,
        background: 'linear-gradient(90deg, #1a3a5c, #2b6b9e)',
        width: `${width}%`,
        maxWidth: 420,
        zIndex: 1300,
        transition: 'width 0.2s ease',
        pointerEvents: 'none',
      }}
    />
  );
}

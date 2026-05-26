import React from 'react';
import Box from '@mui/material/Box';
import useScrollReveal from '../hooks/useScrollReveal';

const variants = {
  fadeInUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  fadeInLeft: { from: { opacity: 0, transform: 'translateX(-24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
  fadeInRight: { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
  fadeInScale: { from: { opacity: 0, transform: 'scale(0.9)' }, to: { opacity: 1, transform: 'scale(1)' } },
};

export default function ScrollReveal({ children, variant = 'fadeInUp', delay = 0, duration = 0.8, sx, ...props }) {
  const [ref, isVisible] = useScrollReveal();
  const v = variants[variant] || variants.fadeInUp;

  return (
    <Box
      ref={ref}
      sx={{
        ...v.from,
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        transitionDelay: `${delay}s`,
        ...(isVisible && v.to),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScrollReveal from './ScrollReveal';

export default function SectionWrapper({ title, children, bgImage, sx }) {
  return (
    <Box
      component="section"
      sx={{
        px: { xs: 1.5, sm: 2.5 },
        py: { xs: 3.5, sm: 5 },
        position: 'relative',
        overflow: 'hidden',
        ...(bgImage ? { background: `url(${bgImage}) center / cover no-repeat`, '&::before': { content: '""', position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)', pointerEvents: 'none' } } : {}),
        ...sx,
      }}
    >
      <ScrollReveal>
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            border: '2px solid',
            borderColor: '#d6e6f2',
            p: { xs: 2.5, sm: 3 },
            bgcolor: 'rgba(255,255,255,0.97)',
            boxShadow: '0 4px 12px rgba(26,58,92,0.06)',
            transition: 'box-shadow 0.3s ease',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: { xs: 30, sm: 40 },
              height: { xs: 30, sm: 40 },
              borderColor: 'primary.main',
              borderStyle: 'solid',
              borderWidth: '3px 0 0 3px',
            },
            '&::before': { top: -2, left: -2 },
            '&::after': { top: -2, right: -2, borderWidth: '3px 3px 0 0' },
          }}
        >
          <Box sx={{ position: 'absolute', bottom: -2, left: -2, width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, border: '3px solid', borderColor: 'primary.main', borderWidth: '0 0 3px 3px' }} />
          <Box sx={{ position: 'absolute', bottom: -2, right: -2, width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, border: '3px solid', borderColor: 'primary.main', borderWidth: '0 3px 3px 0' }} />
          {title && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 22, sm: 20 },
                  color: 'primary.main',
                  letterSpacing: 1,
                  display: 'inline-block',
                  '&::before, &::after': { content: '"~"', color: 'secondary.main', fontSize: { xs: 16, sm: 20 }, mx: { xs: 0.5, sm: 1.5 }, fontWeight: 400 },
                }}
              >
                {title}
              </Typography>
            </Box>
          )}
          {children}
        </Box>
      </ScrollReveal>
    </Box>
  );
}

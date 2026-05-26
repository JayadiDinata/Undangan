import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

export default function CommentsSection({ comments }) {
  return (
    <SectionWrapper title="Ucapan & Doa Tamu" bgImage="/img/frame-bg.jpg">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 400, overflowY: 'auto', mb: 2.5 }}>
        {comments.length === 0 ? (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center', py: 2 }}>
            Belum ada ucapan. Jadilah yang pertama memberikan doa dan ucapan!
          </Typography>
        ) : (
          [...comments].reverse().map((c, i) => (
            <ScrollReveal key={i} variant="fadeInLeft" delay={Math.min(i * 0.08, 0.3)}>
              <Box sx={{ display: 'flex', gap: 1.5, p: { xs: 1.5, sm: 2 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateX(4px)', boxShadow: '0 2px 12px rgba(26,58,92,0.1)' } }}>
                <Icon sx={{ fontSize: 32, color: 'secondary.main', flexShrink: 0 }}>person</Icon>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontSize: 14, color: 'primary.main', fontWeight: 600, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.5, mb: 0.5, wordBreak: 'break-word' }}>
                    {c.message}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 11, color: 'text.secondary', opacity: 0.7 }}>
                    {c.timestamp}
                  </Typography>
                </Box>
              </Box>
            </ScrollReveal>
          ))
        )}
      </Box>
    </SectionWrapper>
  );
}

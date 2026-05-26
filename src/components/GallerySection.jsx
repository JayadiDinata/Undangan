import React from 'react';
import Box from '@mui/material/Box';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

const images = [
  { src: '/img/gallery1.jpg', span: true, delay: 0 },
  { src: '/img/gallery2.jpg', span: false, delay: 0.1 },
  { src: '/img/gallery3.jpg', span: false, delay: 0.2 },
  { src: '/img/gallery4.jpg', span: false, delay: 0.3 },
];

export default function GallerySection() {
  return (
    <SectionWrapper title="Galeri" bgImage="/img/frame-bg.jpg">
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1, sm: 1.5 } }}>
        {images.map((img, i) => (
          <ScrollReveal key={i} variant="fadeInScale" delay={img.delay} sx={img.span ? { gridColumn: '1 / -1' } : {}}>
            <Box sx={{ overflow: 'hidden', borderRadius: 1, transition: 'transform 0.4s ease, box-shadow 0.4s ease', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 25px rgba(26,58,92,0.2)' } }}>
              <Box
                component="img"
                src={img.src}
                alt={`Galeri ${i + 1}`}
                sx={{ width: 1, height: img.span ? { xs: 220, sm: 280 } : { xs: 150, sm: 200 }, objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.03)' } }}
              />
            </Box>
          </ScrollReveal>
        ))}
      </Box>
    </SectionWrapper>
  );
}

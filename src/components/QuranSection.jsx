import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

export default function QuranSection() {
  return (
    <SectionWrapper title="Al-Qur'an Ar-Rum: 21" bgImage="/img/frame-bg.jpg" sx={{ background: 'linear-gradient(180deg, #eaf1f8 0%, #ffffff 100%)' }}>
      <ScrollReveal variant="fadeInScale" delay={0.2}>
        <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 3 }, bgcolor: 'rgba(255,255,255,0.97)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)' }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Amiri", serif',
              fontSize: { xs: 18, sm: 24 },
              color: 'primary.main',
              lineHeight: 2,
              mb: 2,
            }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 }, color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.6 }}>
            <strong>Artinya:</strong> "Dan di antara tanda-tanda kekuasaan-Nya ialah bahwa Dia menciptakan untuk kamu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih sayang dan belas kasihan."
          </Typography>
        </Box>
      </ScrollReveal>
      <ScrollReveal variant="fadeInUp" delay={0.4}>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Box sx={{ display: 'inline-block', maxWidth: { xs: 220, sm: 280 } }}>
            <Box component="img" src="/img/couple-sketch.png" alt="Ilustrasi Pasangan Pengantin" sx={{ width: 1, height: 'auto', display: 'block' }} />
          </Box>
        </Box>
      </ScrollReveal>
    </SectionWrapper>
  );
}

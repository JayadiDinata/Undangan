import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keyframes } from '@mui/material/styles';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

export default function CoupleSection() {
  return (
    <SectionWrapper title="Mempelai" bgImage="/img/frame-bg.jpg">
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: { xs: 1.5, sm: 2.5 }, mb: 2.5 }}>
        <ScrollReveal variant="fadeInLeft" sx={{ textAlign: 'center', flex: 1, maxWidth: 160 }}>
          <Box
            component="img"
            src="/img/bride.jpg"
            alt="Ellysa Fitri"
            sx={{ width: { xs: 110, sm: 140 }, height: { xs: 110, sm: 140 }, borderRadius: '50%', objectFit: 'cover', border: '3px solid', borderColor: 'primary.main', boxShadow: '0 4px 15px rgba(26,58,92,0.15)', mb: 1.5, transition: 'transform 0.4s ease, box-shadow 0.4s ease', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 6px 25px rgba(26,58,92,0.25)' } }}
          />
          <Typography variant="h3" sx={{ fontFamily: '"Dancing Script", "Playfair Display", cursive', fontSize: 18, color: 'primary.main', mb: 0.5 }}>
            Ellysa Fitri
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 11, color: 'text.secondary', mb: 0.5 }}>Putri dari</Typography>
          <Typography variant="body2" sx={{ fontSize: 11, color: 'secondary.main', fontWeight: 500, lineHeight: 1.4 }}>
            Bapak Budiman & Ibu Siti Sawanah
          </Typography>
        </ScrollReveal>

        <ScrollReveal variant="fadeInScale" delay={0.3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 4, sm: 5.5 } }}>
          <FavoriteIcon sx={{ fontSize: 24, color: 'primary.main', animation: `${pulse} 2s ease-in-out infinite` }} />
        </ScrollReveal>

        <ScrollReveal variant="fadeInRight" sx={{ textAlign: 'center', flex: 1, maxWidth: 160 }}>
          <Box
            component="img"
            src="/img/groom.jpg"
            alt="Muhammad Imron"
            sx={{ width: { xs: 110, sm: 140 }, height: { xs: 110, sm: 140 }, borderRadius: '50%', objectFit: 'cover', border: '3px solid', borderColor: 'primary.main', boxShadow: '0 4px 15px rgba(26,58,92,0.15)', mb: 1.5, transition: 'transform 0.4s ease, box-shadow 0.4s ease', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 6px 25px rgba(26,58,92,0.25)' } }}
          />
          <Typography variant="h3" sx={{ fontFamily: '"Dancing Script", "Playfair Display", cursive', fontSize: 18, color: 'primary.main', mb: 0.5 }}>
            Muhammad Imron
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 11, color: 'text.secondary', mb: 0.5 }}>Putra dari</Typography>
          <Typography variant="body2" sx={{ fontSize: 11, color: 'secondary.main', fontWeight: 500, lineHeight: 1.4 }}>
            Bapak Obay & Ibu Nyai
          </Typography>
        </ScrollReveal>
      </Box>

      <ScrollReveal variant="fadeInUp" delay={0.5}>
        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)' }}>
          <Typography variant="body2" sx={{ fontSize: 13, color: 'primary.main', fontWeight: 600, letterSpacing: 1, mb: 1.5 }}>
            Turut Mengundang:
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {[
              'Keluarga Besar alm Bpk Suhada & Ibu Unay',
              'Keluarga Besar Bpk Obay & Ibu Nyai',
              'Ibu Hindun (Uwa)',
              'Taufik/Ende (Paman)',
            ].map((item, i) => (
              <Box
                component="li"
                key={i}
                sx={{ fontFamily: '"Poppins", sans-serif', fontSize: 12, color: 'text.secondary', py: 0.5, borderBottom: i < 3 ? '1px solid rgba(26,58,92,0.06)' : 'none', wordBreak: 'break-word' }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollReveal>
    </SectionWrapper>
  );
}

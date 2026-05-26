import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MosqueIcon from '@mui/icons-material/Mosque';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import { keyframes } from '@mui/material/styles';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const CeremonyCard = ({ icon: Icon, title, time, date, delay, variant }) => (
  <ScrollReveal variant={variant} delay={delay}>
    <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', transition: 'box-shadow 0.3s ease, transform 0.3s ease', '&:hover': { boxShadow: '0 10px 25px rgba(26,58,92,0.1)', transform: 'translateY(-2px)' } }}>
      <Icon sx={{ fontSize: { xs: 30, sm: 40 }, color: 'secondary.main', mb: 1, animation: `${float} 3s ease-in-out infinite` }} />
      <Typography variant="h3" sx={{ fontSize: { xs: 17, sm: 20 }, color: 'primary.main', mb: 1 }}>{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
        <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>{time}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>{date}</Typography>
      </Box>
    </Box>
  </ScrollReveal>
);

export default function CeremonySection() {
  return (
    <SectionWrapper title="Detail Acara" bgImage="/img/frame-bg.jpg">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2.5 }}>
        <CeremonyCard icon={MosqueIcon} title="Akad Nikah" time="09:00 - 10:00 WITA" date="Rabu, 23 Mei 2026" delay={0.2} variant="fadeInLeft" />
        <CeremonyCard icon={RestaurantIcon} title="Resepsi" time="11:00 - Selesai" date="Rabu, 23 Mei 2026" delay={0.4} variant="fadeInRight" />
      </Box>

      <ScrollReveal variant="fadeInUp" delay={0.6}>
        <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <LocationOnIcon sx={{ fontSize: 22, color: 'secondary.main' }} />
            <Typography variant="h3" sx={{ fontSize: { xs: 18, sm: 20 }, color: 'primary.main' }}>Lokasi Acara</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: { xs: 15, sm: 16 }, color: 'primary.main', fontWeight: 600, mb: 0.5 }}>
            Villa Nyoman (Swastika Wood)
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
            Jln Veteran III Tapos Desa Cibedug Rt.03/01 No.36 Kec.Ciawi-Bogor
          </Typography>
          <Box sx={{ width: 1, height: { xs: 220, sm: 250 }, mb: 1.5, borderRadius: 1, overflow: 'hidden', '& iframe': { width: 1, height: 1, border: 'none' } }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.6478953896777!2d106.86328!3d-6.618857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8c8c8c8c8c9%3A0x8c8c8c8c8c8c8c8c!2sJln%20Veteran%20III%20Tapos%2C%20Cibedug%2C%20Ciawi%2C%20Bogor!5e0!3m2!1sid!2sid!4v1234567890"
              title="Google Maps"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
          <Button
            variant="contained"
            href="https://maps.google.com/?q=Jln+Veteran+III+Tapos+Cibedug+Ciawi+Bogor"
            target="_blank"
            startIcon={<DirectionsIcon />}
            sx={{ mt: 1, px: 3, py: 1.2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.light' }, borderRadius: 2, textTransform: 'none', fontSize: 13, fontWeight: 500 }}
          >
            Buka Google Maps
          </Button>
        </Box>
      </ScrollReveal>
    </SectionWrapper>
  );
}

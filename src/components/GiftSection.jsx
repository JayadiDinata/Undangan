import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const cb = navigator.clipboard;
    if (cb && cb.writeText) {
      cb.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <IconButton
      onClick={handleCopy}
      size="small"
      sx={{
        bgcolor: copied ? 'success.main' : 'primary.main',
        color: 'white',
        width: 36,
        height: 36,
        flexShrink: 0,
        '&:hover': { bgcolor: copied ? 'success.dark' : 'primary.light', transform: 'scale(1.1)' },
        transition: 'all 0.2s ease',
      }}
      aria-label="Salin"
    >
      {copied ? <CheckIcon sx={{ fontSize: 18 }} /> : <ContentCopyIcon sx={{ fontSize: 18 }} />}
    </IconButton>
  );
};

export default function GiftSection() {
  return (
    <SectionWrapper title="Wedding Gift" bgImage="/img/frame-bg.jpg">
      <ScrollReveal variant="fadeInUp" delay={0.2}>
        <Box sx={{ textAlign: 'center', p: { xs: 2, sm: 2.5 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', mb: 2 }}>
          <Icon sx={{ fontSize: 36, color: 'secondary.main', mb: 1 }}>card_giftcard</Icon>
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 }, color: 'text.secondary', lineHeight: 1.6 }}>
            Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah, berikut adalah informasi rekening kami:
          </Typography>
        </Box>
      </ScrollReveal>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <ScrollReveal variant="fadeInLeft" delay={0.3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: { xs: 1.5, sm: 2 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 15px rgba(26,58,92,0.15)' } }}>
            <Icon sx={{ fontSize: 28, color: 'secondary.main' }}>account_balance</Icon>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontSize: 11, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>BTN</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 13, sm: 15 }, color: 'primary.main', fontWeight: 600, letterSpacing: 1, wordBreak: 'break-all' }}>
                287015001101902
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>a.n Muhammad Imron</Typography>
            </Box>
            <CopyButton text="287015001101902" />
          </Box>
        </ScrollReveal>

        <ScrollReveal variant="fadeInRight" delay={0.4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: { xs: 1.5, sm: 2 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 15px rgba(26,58,92,0.15)' } }}>
            <Icon sx={{ fontSize: 28, color: 'secondary.main' }}>smartphone</Icon>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontSize: 11, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>Dana</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 13, sm: 15 }, color: 'primary.main', fontWeight: 600, letterSpacing: 1, wordBreak: 'break-all' }}>
                085695037519
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>a.n Ellysa Fitri</Typography>
            </Box>
            <CopyButton text="085695037519" />
          </Box>
        </ScrollReveal>
      </Box>

      <ScrollReveal variant="fadeInUp" delay={0.5}>
        <Box sx={{ textAlign: 'center', mt: 2, p: { xs: 1.5, sm: 2 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)' }}>
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 }, color: 'primary.main', fontWeight: 600, mb: 0.5 }}>Alamat Rumah:</Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 13 }, color: 'text.secondary', lineHeight: 1.6 }}>
            Jln Veteran III Tapos Desa Cibedug Rt.03/01 No.36 Kec.Ciawi-Bogor
          </Typography>
        </Box>
      </ScrollReveal>
    </SectionWrapper>
  );
}

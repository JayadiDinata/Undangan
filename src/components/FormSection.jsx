import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionWrapper from './SectionWrapper';
import ScrollReveal from './ScrollReveal';

export default function FormSection({ onCommentAdded }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    onCommentAdded({
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString('id-ID'),
    });
    setName('');
    setMessage('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <SectionWrapper title="Berikan Ucapan Anda" bgImage="/img/frame-bg.jpg">
      <ScrollReveal variant="fadeInScale" delay={0.2}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)' }}>
          <TextField
            fullWidth
            required
            label="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            slotProps={{
              inputLabel: { sx: { fontFamily: '"Poppins", sans-serif', fontSize: 13 } },
              input: { sx: { fontFamily: '"Poppins", sans-serif', fontSize: 14 } },
            }}
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Ucapan & Doa"
            placeholder="Tulis ucapan dan doa Anda untuk pengantin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
            slotProps={{
              inputLabel: { sx: { fontFamily: '"Poppins", sans-serif', fontSize: 13 } },
              input: { sx: { fontFamily: '"Poppins", sans-serif', fontSize: 14 } },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<SendIcon />}
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.light' },
              borderRadius: 2,
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(26,58,92,0.2)',
            }}
          >
            Kirim Ucapan
          </Button>
        </Box>
      </ScrollReveal>

      {showSuccess && (
        <ScrollReveal variant="fadeInScale" delay={0.1}>
          <Box sx={{ textAlign: 'center', p: 2.5, bgcolor: 'rgba(255,255,255,0.95)', border: '1px solid', borderColor: '#d6e6f2', boxShadow: '0 2px 8px rgba(26,58,92,0.06)', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
            <Typography variant="body2" sx={{ fontSize: 14, color: 'primary.main' }}>
              Terima kasih atas ucapan dan doa Anda!
            </Typography>
          </Box>
        </ScrollReveal>
      )}
    </SectionWrapper>
  );
}

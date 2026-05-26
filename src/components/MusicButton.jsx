import React from 'react';
import IconButton from '@mui/material/IconButton';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { keyframes } from '@mui/material/styles';
import { useAudio } from '../hooks/useAudio';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function MusicButton() {
  const { isPlaying, toggleMusic } = useAudio();

  return (
    <IconButton
      onClick={toggleMusic}
      sx={{
        position: 'fixed',
        top: 'calc(15px + env(safe-area-inset-top, 0px))',
        right: 'calc(15px + env(safe-area-inset-right, 0px))',
        zIndex: 1300,
        bgcolor: 'primary.main',
        color: 'white',
        width: 44,
        height: 44,
        '&:hover': { bgcolor: 'primary.light' },
        boxShadow: '0 4px 12px rgba(26,58,92,0.25)',
        animation: isPlaying ? `${spin} 2s linear infinite` : 'none',
      }}
      aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
    >
      {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
    </IconButton>
  );
}

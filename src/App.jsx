import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import CoverSection from './components/CoverSection';
import QuranSection from './components/QuranSection';
import CoupleSection from './components/CoupleSection';
import CeremonySection from './components/CeremonySection';
import GallerySection from './components/GallerySection';
import GiftSection from './components/GiftSection';
import ClosingSection from './components/ClosingSection';
import CommentsSection from './components/CommentsSection';
import FormSection from './components/FormSection';
import FooterSection from './components/FooterSection';
import MusicButton from './components/MusicButton';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import { AudioProvider } from './hooks/useAudio';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '420px !important',
  padding: '0 !important',
  minHeight: '100dvh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 0 60px rgba(26, 58, 92, 0.08)',
  position: 'relative',
  overflow: 'hidden',
}));

export default function App() {
  const [comments, setComments] = useState([]);

  const loadComments = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem('weddingComments') || '[]');
    setComments(stored);
  }, []);

  useEffect(() => { loadComments(); }, [loadComments]);

  const addComment = useCallback((comment) => {
    const updated = [...comments, comment];
    localStorage.setItem('weddingComments', JSON.stringify(updated));
    setComments(updated);
  }, [comments]);

  return (
    <AudioProvider>
      <StyledContainer disableGutters>
        <MusicButton />
        <ScrollProgress />
        <ScrollToTop />
        <CoverSection />
        <QuranSection />
        <CoupleSection />
        <CeremonySection />
        <GallerySection />
        <GiftSection />
        <ClosingSection />
        <CommentsSection comments={comments} />
        <FormSection onCommentAdded={addComment} />
        <FooterSection />
      </StyledContainer>
    </AudioProvider>
  );
}

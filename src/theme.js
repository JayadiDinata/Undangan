import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1a3a5c', light: '#2b6b9e' },
    secondary: { main: '#2b6b9e' },
    background: { default: '#faf8f5', paper: '#ffffff' },
    text: { primary: '#3d3d3d', secondary: '#6b6b6b' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontFamily: "'Dancing Script', 'Playfair Display', cursive", fontWeight: 700 },
    h2: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    body1: { fontFamily: "'Poppins', sans-serif" },
    body2: { fontFamily: "'Poppins', sans-serif" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitTextSizeAdjust: '100%',
          overflowX: 'hidden',
        },
        '*': {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        },
      },
    },
  },
});

export default theme;

import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000',
    },
    primary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#E0E0E0',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#CCCCCC',
      contrastText: '#000000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.2)',
    error: {
      main: '#FFFFFF',
    },
    success: {
      main: '#FFFFFF',
    },
    warning: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.75rem',
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
      color: '#FFFFFF',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    subtitle1: {
      color: 'rgba(255, 255, 255, 0.75)',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      color: '#FFFFFF',
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '0.875rem',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif',
          WebkitFontSmoothing: 'antialiased',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#000000',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '0px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          border: '1px solid #FFFFFF',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#000000',
            color: '#FFFFFF',
            borderColor: '#FFFFFF',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: '#FFFFFF',
          color: '#FFFFFF',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderColor: '#FFFFFF',
          },
        },
        text: {
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#000000',
          border: '1px solid #FFFFFF',
          borderRadius: '0px',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#000000',
          border: '1px solid #FFFFFF',
          borderRadius: '0px',
          boxShadow: 'none',
          transition: 'transform 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.015)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '0.75rem',
        },
        outlined: {
          borderColor: '#FFFFFF',
          color: '#FFFFFF',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
          border: '1px solid #FFFFFF',
          borderRadius: '0px',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&:hover fieldset': {
              borderColor: '#FFFFFF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            '&.Mui-focused': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
});


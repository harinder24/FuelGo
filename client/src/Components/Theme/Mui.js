import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#747c88', // A deep blue color
    },
    secondary: {
      main: '#ff4081', // A pink color
    },
    // background: {
    //   default: '#f5f5f5', // Light gray background
    // },
    text: {
      primary: '#fff', // Dark text color
      secondary: '#757575', // Lighter text color
    },
  },  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#747c88', // Change the border color for TextField
          },
        },
      },
    },
    // Add more components and styles as needed
  },
});

export default theme;

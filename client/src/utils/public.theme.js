import { createTheme, responsiveFontSizes } from "@mui/material";
import { red, teal } from "@mui/material/colors"; // Tambahkan import untuk warna

/**
 * color base public
 * "Hijau Mint - #95E1D3"
 * "Putih bersih - #FFFFFF"
 * "Pink pastel - #F2D7EE"
 *
 */

const base = createTheme({
  palette: {
    // Diperbaiki dari 'pallete' menjadi 'palette'
    primary: {
      main: "#4d547d", //abuabu
    },
    secondary: {
      main: "#ffe3a3", //kekuningan
    },
    neutral: {
      main: "#666666", //abubau gelap
    },
    background: {
      main: "#21295c", //gelap
    },
    error: {
      main: red[400],
    },
    success: {
      main: teal[400],
    },
  },
});

const themePublic = responsiveFontSizes(base);

export default themePublic;

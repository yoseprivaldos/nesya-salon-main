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
      main: "#4d547d", // blue
      light: "#4d547d",
    },
    secondary: {
      main: "#ffe3a3", // yellow
    },
    neutral: {
      main: "#666666", //abubau gelap
    },
    background: {
      main: "#21295c",
      default: "525252",
      alt: "#21295c",
    },
    error: {
      main: red[400],
    },
    success: {
      main: teal[400],
    },
    custom: {
      // Palet khusus
      mint: "#95E1D3",
      white: "#FFFFFF",
      pink: "#F2D7EE",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});

const themePublic = responsiveFontSizes(base);

export default themePublic;

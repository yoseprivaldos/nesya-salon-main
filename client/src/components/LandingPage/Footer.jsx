import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      className="foooter"
      spacing={3}
      sx={{
        display: "flex",
        bgcolor: "primary.main",
        p: 6,
        height: 250,
      }}
    >
      INI FOOTER
    </Box>
  );
}

export default Footer;

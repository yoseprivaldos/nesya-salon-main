import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";

const Reservation = () => {
  return (
    <Box sx={{ padding: 3, bgcolor: "#121212", color: "white" }}>
      <Typography variant="h4" gutterBottom>
        My Reservation
      </Typography>

      {/* bagian kiri */}
      <Grid container>
        <Grid item xs={12} sm={2} gap="10rem">
          <Box alignItems="center">
            <List>
              <ListItem>
                <Button href="/account" variant="text">
                  Acccount
                </Button>
              </ListItem>
              <ListItem>
                <Button href="/reservation" variant="text">
                  Reservation
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="text">WishList</Button>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box
            sx={{
              margin: 2,
              padding: 2,
              border: "1px solid #333",
              bgcolor: "white",
              color: "black",
            }}
          >
            <ListItem>
              <ListItemIcon>
                <CheckCircle sx={{ color: "lightblue" }} />
              </ListItemIcon>
              <ListItemText primary="Belum ada reservasi" />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Buat Rerservasi
              </Button>
            </ListItem>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reservation;

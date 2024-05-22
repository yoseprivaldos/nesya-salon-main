import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const EditUserPassword = () => {
  return (
    <Box sx={{ padding: 3, bgcolor: "#121212", color: "white" }}>
      <Typography variant="h4" gutterBottom>
        My Account
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
            <List>
              <ListItem>
                <ListItemText primary="Kontak Informasi" color="123123" />
                <Button variant="outlined">UBAH</Button>
              </ListItem>
              <ListItem>
                <ListItemText flex primary="Usename" secondary="yoseprivaldo" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary="rivaldo.yoseps@gmail.com"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nomor HP" secondary="0812392392481" />
              </ListItem>

              <Divider sx={{ marginY: 2 }} />

              <ListItem>
                <ListItemText primary="Password" color="123123" />
                <Button variant="outlined">UBAH</Button>
              </ListItem>
              <ListItem>
                <ListItemText flex primary="*************" />
              </ListItem>

              <Divider sx={{ marginY: 2 }} />

              <ListItem>
                <ListItemText primary="Alamat" color="123123" />
                <Button variant="outlined">UBAH</Button>
              </ListItem>

              <ListItem>
                <ListItemText primary="JALAN PENGANGSA TIMUR BLOK 3, YOGYAKARTA" />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserPassword;

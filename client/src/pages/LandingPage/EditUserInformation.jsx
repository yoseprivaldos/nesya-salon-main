import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  TextField,
} from "@mui/material";

const EditUserInformation = () => {
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
            component="form"
            noValidate
            sx={{
              margin: 2,
              padding: 2,
              border: "1px solid #333",
              bgcolor: "white",
              color: "black",
            }}
          >
            <Typography>Ubah Username</Typography>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autofocus
            />
            <Typography>Ubah Email</Typography>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
              autofocus
            />

            <Typography mb="0.5px" mt="3px">
              Ubah Password
            </Typography>
            <TextField
              margin="dense"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              autofocus
            />
            <Button
              disabled={false}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Konfirmasi
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserInformation;

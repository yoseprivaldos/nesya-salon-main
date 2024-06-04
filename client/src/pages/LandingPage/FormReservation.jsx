import { Box, Grid, TextField, Typography } from "@mui/material";

const services = [
  { id: 1, name: "Layanan A" },
  { id: 2, name: "Layanan B" },
  { id: 3, name: "Layanan C" },
];

const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const FormReservation = () => {
  return (
    <Box sx={{ bgcolor: "background.alt", padding: { xs: 2, sm: 4, md: 6 } }}>
      <Box>
        <Typography>HALAMAN FORM RESERVASI</Typography>
      </Box>
      <Box component="form" noValidate sx={{ bgcolor: "secondary.main" }}>
        <Box>
          <Box>
            <Typography>Nama</Typography>
            <TextField
              margin="dense"
              fullWidth
              id="name"
              name="name"
              value="masukkan nama anda"
              autoComplete="name"
              autoFocus
            />
          </Box>
          <Box>
            <Typography>Email</Typography>
            <TextField
              margin="dense"
              fullWidth
              id="email"
              name="email"
              value="masukkan email anda"
              autoComplete="email"
              autoFocus
            />
          </Box>
          <Box>
            <Typography>NomorHp</Typography>
            <TextField
              margin="dense"
              fullWidth
              id="nomorHp"
              value="masukkan nomor hp anda"
              autoComplete="noHp"
              autoFocus
            />
          </Box>
          <Box>
            <Typography>Pilih Layanan</Typography>
            {/* tambahkan komponen untuk fungsi pilih layananan, bisa menambahkan layanan  */}
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item>
                <Typography>Pilih Tanggal</Typography>
                {/* tambahkan komponen date picker */}
              </Grid>
              <Grid item>
                <Typography>Pilih Waktu</Typography>
                {/* tambahkan komponen list tree -- listnya nantinya berupa jam yang disediakan, ketika diklik mengisi field dengan data waktu  */}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography>Catatan</Typography>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormReservation;

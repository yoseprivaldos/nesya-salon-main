import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";

const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const options = times.map((time) => ({ value: time })); // mengubah array times menjadi array of objects

const FormReservation = () => {
  const today = dayjs();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    pilihanLayanan: [],
    tanggal: today,
    waktu: "",
    catatan: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "pilihanLayanan"
          ? checked
            ? [...prevData.pilihanLayanan, value]
            : prevData.pilihanLayanan.filter((item) => item !== value)
          : value,
    }));

    //Hapus pesan error saat input berubah
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Validasi input
    const newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama harus diisi";
    if (!formData.email) newErrors.email = "Email harus diisi";
    if (!formData.nomorHp) newErrors.nomorHp = "Nomor HP harus diisi";
    if (formData.pilihanLayanan.length === 0)
      newErrors.pilihanLayanan = "Pilih setidaknya satu layanan";
    if (!formData.tanggal) newErrors.tanggal = "Tanggal harus diisi";
    if (!formData.waktu) newErrors.waktu = "Waktu harus diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; //hentikan pengiriman jika ada error
    }
    //ubah data tanggal
    const tanggalString = formData.tanggal.format("DD-MM-YYYY");
    const dataToSend = {
      ...formData,
      tanggal: tanggalString,
    };

    //logika kirim data ke backend
    console.log(dataToSend);
  };

  return (
    <Box sx={{ bgcolor: "background.alt", padding: { xs: 2, sm: 4, md: 6 } }}>
      <Box>
        <Typography>FORM RESERVASI SALON</Typography>
        <Typography>Isi data yang sesuai di kolom yang disediakan</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
          "& .MuiPickersCalendar-root": {
            backgroundColor: "background.paper", // Menggunakan warna dari tema Material UI
          },
          bgcolor: "secondary.main",
          padding: 3,
        }}
        noValidate
        autoComplete="off"
      >
        {/* field name */}
        <Box>
          <Typography>Masukkan Nama</Typography>
          <TextField
            margin="dense"
            fullWidth
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            error={!!errors.nama}
            helperText={errors.nama}
          />
        </Box>
        {/* field email */}
        <Box>
          <Typography>Masukkan Email</Typography>
          <TextField
            margin="dense"
            fullWidth
            id="email"
            label="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>
        {/* field nomor HP */}
        <Box>
          <Typography>Masukkan nomo HP</Typography>
          <TextField
            margin="dense"
            label="nomor Hp"
            fullWidth
            id="nomorHp"
            name="nomorHp"
            value={formData.nomorHp}
            onChange={handleChange}
            required
            error={!!errors.nomorHp}
            helperText={errors.nomorHp}
          />
        </Box>
        {/* field pilih Layanan */}
        <Box>
          <Typography>Pilih Layanan</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="pilihanLayanan"
                value="Potong Rambut"
                onChange={handleChange}
              />
            }
            label="Potong Rambut"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="pilihanLayanan"
                value="Creambath"
                onChange={handleChange}
              />
            }
            label="Creambath"
          />
          <FormHelperText sx={{ color: "#ef5350" }}>
            {errors.pilihanLayanan}
          </FormHelperText>{" "}
          {/* Tampilkan pesan error */}
        </Box>
        {/* field pilih tanggal */}
        <Box>
          <Typography sx={{ color: "primary.main" }}>Pilih Tanggal</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
            <DatePicker
              value={formData.tanggal}
              onChange={(newValue) =>
                setFormData((prevData) => ({ ...prevData, tanggal: newValue }))
              }
              disablePast
              componentsProps={{
                textField: {
                  // Styling untuk TextField di dalam DatePicker
                  sx: {
                    svg: { color: "primary.main" },
                    input: { color: "primary.main" },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "& .Mui-focused": {
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
                    },
                  },
                },
              }}
            />
            {!!errors.tanggal && (
              <FormHelperText error>{errors.tanggal}</FormHelperText>
            )}
          </LocalizationProvider>
        </Box>
        {/* field pilih waktu */}
        <Box>
          <Typography sx={{ color: "primary.main" }}>
            Pilih Jam Tersedia
          </Typography>
          <FormControl fullWidth>
            <Select
              name="waktu" //penting
              labelId="time-select-label"
              id="time-select"
              value={formData.waktu}
              label="pilih jam"
              onChange={handleChange}
              sx={{
                svg: { color: "primary.main" },
                input: { color: "primary.main" },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "& .Mui-focused": {
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#ef5350" }}>
              {errors.waktu}
            </FormHelperText>{" "}
            {/* Tampilkan pesan error */}
          </FormControl>
        </Box>
        {/* Field Catatan Reservasi */}
        <Box>
          <Typography>Masukkan Catatan Reservasi - Opsional</Typography>
          <TextField
            margin="dense"
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            id="username"
          />
        </Box>
        {/* tombol Submit */}
        <Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Konfirmasi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormReservation;

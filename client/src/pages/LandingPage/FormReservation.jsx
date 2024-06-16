import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/id";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  useGetServicesQuery,
  useCreateReservationMutation,
} from "../../redux/api/api";
import { useSelector } from "react-redux";

dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.locale("id");

// Fungsi untuk menghitung endTime
const calculateEndTime = (startTime, totalDurationMinutes) => {
  const startTimeDayjs = dayjs(startTime, "HH:mm");
  const endTimeDayjs = startTimeDayjs.add(totalDurationMinutes, "minute");
  return endTimeDayjs.format("HH:mm");
};

const FormReservation = () => {
  const [proses, setProses] = useState(false);
  const [endTimeFormatted, setEndTimeFormatted] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState("");
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openTimeDialog, setOpenTimeDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [reservationName, setReservationName] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationPhoneNumber, setReservationPhoneNumber] = useState("");
  const [reservationNote, setReservationNote] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [selectedServiceNames, setSelectedServiceNames] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const { data } = useGetServicesQuery();
  const [totalPrice, setTotalPrice] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [createReservation, { isLoading, isError }] =
    useCreateReservationMutation();

  // mengambil data layanan
  const services = useMemo(
    () =>
      data?.map((service) => ({
        _id: service._id,
        name: service.name,
        duration: service.duration,
        price: service.price,
      })) || [],
    [data]
  );
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    let totalDurationMinutes = 0;
    // Menghitung total durasi dari layanan yang dipilih
    selectedServiceIds.forEach((serviceId) => {
      const service = services.find((s) => s._id === serviceId);
      if (service) {
        totalDurationMinutes += service.duration;
      }
    });

    // Menghitung endTime menggunakan fungsi terpisah
    if (selectedTime) {
      const calculatedEndTime = calculateEndTime(
        selectedTime,
        totalDurationMinutes
      );
      setEndTimeFormatted(calculatedEndTime);
    }
  }, [selectedServiceIds, selectedTime, services]);

  useEffect(() => {
    if (isLoading) {
      setShowAlert(true);
      setAlertSeverity("info");
      setAlertMessage("memprosess....");
    } else if (isError) {
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal membuat Service. Coba lagi nanti");
    }
  }, [isLoading, isError]);

  useEffect(() => {
    const total = selectedServiceIds.reduce((acc, id) => {
      const service = services.find((service) => service._id === id);
      return acc + (service ? service.price : 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedServiceIds, services]);
  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleOpenServiceDialog = () => {
    setOpenServiceDialog(true);
  };
  const handleCloseServiceDialog = () => {
    setOpenServiceDialog(false);
  };
  const handleOpenTimeDialog = () => {
    setOpenTimeDialog(true);
  };

  const handleCloseTimeDialog = () => {
    setOpenTimeDialog(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedServiceIds((prevIds) =>
      prevIds.includes(service._id)
        ? prevIds.filter((id) => id !== service._id)
        : [...prevIds, service._id]
    );
    setSelectedServiceNames((prevNames) =>
      prevNames.includes(service.name)
        ? prevNames.filter((name) => name !== service.name)
        : [...prevNames, service.name]
    );
  };

  const handleDeleteService = (serviceId, serviceName) => {
    setSelectedServiceIds((prevIds) =>
      prevIds.filter((id) => id !== serviceId)
    );
    setSelectedServiceNames((prevNames) =>
      prevNames.filter((name) => name !== serviceName)
    );
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    handleCloseTimeDialog();
  };

  const handleDateChange = (date) => {
    //konversi Dayjs ke JavaScript Date
    const jsDate = date ? date.format("DD/MM/YYYY") : null;
    setSelectedDate(jsDate);
  };

  const handleSubmit = async () => {
    setProses(true);

    //mengonversi tanggal dari string "DD/MM/YYYY" menjadi objek date
    const parts = selectedDate.split("/");
    const day = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const formattedDate = new Date(year, monthIndex, day);

    const reservationData = {
      user: currentUser._id,
      reservationName,
      reservationEmail,
      reservationPhoneNumber,
      note: reservationNote,
      services: selectedServiceIds,
      totalPrice,
      date: formattedDate,
      startTime: selectedTime,
      endTime: endTimeFormatted,
    };

    try {
      const { data, error } = await createReservation(reservationData);
      if (data) {
        setProses(false);
        setShowAlert(true);
        setAlertSeverity("success");
        setAlertMessage("Berhasil membuat reservasi");

        console.log(data);
        //resetStateForm
        setReservationName("");
        setReservationEmail("");
        setReservationPhoneNumber("");
        setReservationNote("");
        setSelectedServiceNames([]);
        setSelectedDate("");
        setTotalPrice("");
        setEndTimeFormatted("");
      } else if (error) {
        console.error("Error saat membuat service ini", error);
        setProses(false);
        setShowAlert(true);
        setAlertSeverity("error");
        setAlertMessage("Gagal membuat Reservasi. Coba Lagi Nanti");
      }
    } catch (error) {
      console.error("Error Creating Reservation", error);
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal membuat Reservasi. Coba Lagi Nanti");
      setProses(false);
    }
  };

  return (
    <Box m={"1.5rem 2.5rem"}>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* Header Field */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            backgroundColor: "secondary.main",
            padding: 1.5,
            fontWeight: "bold",
            color: "background.alt",
          }}
        >
          BUAT RESERVASI BARU
        </Typography>
      </Box>
      <Box>
        {/* Button Field */}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              disabled={proses}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 3,
                backgroundColor: "secondary.main",
                color: "primary.main",
                borderRadius: 0,
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
            >
              {proses ? "Memproses..." : "KONFIRMASI RESERVASI"}
            </Button>
          </Grid>
        </Grid>

        {/* form Section */}
        <Grid container spacing={4} mt={0.5}>
          {/* pilih layanan tanggal  dan waktu*/}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: "secondary.main" }}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  fontSize: "14px",
                  borderRadius: 0,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onClick={handleOpenServiceDialog}
              >
                Tambah Layanan
              </Button>
              <Box mt={2}>
                {selectedServiceNames.map((serviceName, index) => (
                  <Chip
                    key={index}
                    label={serviceName}
                    onDelete={() =>
                      handleDeleteService(
                        selectedServiceIds[index],
                        serviceName
                      )
                    }
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
              {/* Field Untuk total harga */}
              <Box mt={3}>
                <TextField
                  label="Total Harga"
                  variant="outlined"
                  fullWidth
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Paper>

            {/* pilih tanggal */}
            <Paper
              elevation={3}
              sx={{ p: 3, mt: 3, bgcolor: "secondary.main" }}
            >
              <Typography
                backgroundColor="primary.main"
                variant="body1"
                component="h3"
                gutterBottom
                sx={{
                  color: "secondary.main",
                  padding: 1.3,
                  paddingLeft: 2.5,
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                PILIH TANGGAL RESERVASI
              </Typography>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="id"
              >
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}></FormLabel>
                  <DatePicker
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={handleDateChange}
                    disablePast
                    inputFormat="DD-MM-YYYY"
                    componentsProps={{
                      textField: {
                        //styling untuk textfield didalam date picker
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
                </FormControl>
              </LocalizationProvider>
            </Paper>

            {/* Pilih waktu */}
            <Paper
              elevation={3}
              sx={{ p: 3, mt: 3, bgcolor: "secondary.main" }}
            >
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  bgcolor: "primary.main",
                  color: "secondary.main",
                  borderRadius: 0,
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onClick={handleOpenTimeDialog}
              >
                PILIH WAKTU
              </Button>

              <Box>
                {selectedTime && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      marginTop: 0.2,
                      padding: 0.8,
                      paddingLeft: 2,
                      color: "white",
                    }}
                  >
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Estimasi Durasi Layanan:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <AccessTimeIcon /> {selectedTime} WIB - {endTimeFormatted}{" "}
                      WIB
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Informasi pelanggan */}
          <Grid item xs={12} sm={6}>
            {/* informasi pelanggan */}
            <Paper elevation={3} sx={{ p: 3, bgcolor: "secondary.main" }}>
              <Typography
                variant="body1"
                component="h3"
                backgroundColor="primary.main"
                gutterBottom
                sx={{
                  color: "secondary.main",
                  fontSize: "14px",
                  padding: 1.1,
                  paddingLeft: 3,
                  fontWeight: "bold",
                }}
              >
                INFORMASI PELANGGAN
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Nama Pelanggan</FormLabel>
                    <TextField
                      variant="outlined"
                      placeholder="name"
                      value={reservationName}
                      onChange={(e) => setReservationName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Nomor HP Pelanggan</FormLabel>
                    <TextField
                      variant="outlined"
                      placeholder="+62"
                      value={reservationPhoneNumber}
                      onChange={(e) =>
                        setReservationPhoneNumber(e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Email Pelanggan</FormLabel>
                    <TextField
                      variant="outlined"
                      placeholder="username@gmail.com"
                      value={reservationEmail}
                      onChange={(e) => setReservationEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* note field */}
            <Paper
              elevation={3}
              sx={{ p: 3, mt: 3, bgcolor: "secondary.main" }}
            >
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  color: "secondary.main",
                  padding: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "primary.main",
                }}
              >
                TAMBAHKAN CATATAN ( OPSIONAL )
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      minRows={6}
                      placeholder="catatan reservasi"
                      value={reservationNote}
                      onChange={(e) => setReservationNote(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        fontSize: "16px",
                        lineHeight: 1.5,
                        resize: "vertical",
                        outline: "none",
                        color: "black",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Modal Untuk memilih layanan */}
          <Dialog
            open={openServiceDialog}
            onClose={handleCloseServiceDialog}
            fullWidth
            maxWidth="sm"
          >
            <Box sx={{ bgcolor: "background.alt", color: "secondary.main" }}>
              <DialogTitle>Pilih Layanan</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="serviceSearch"
                  label="Cari Layanan Lain"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setSearch("")}>Clear</Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  style={{
                    maxHeight: "300px",
                    overflow: "auto",
                    marginTop: "16px",
                  }}
                >
                  {services
                    .filter((service) =>
                      service.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .slice(0, 6) //menampilkan hanya 5 layanan utama secara default
                    .map((service) => (
                      <Button
                        key={service._id}
                        onClick={() => handleServiceSelect(service)}
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          borderRadius: 0,
                          bgcolor: selectedServiceIds.includes(service._id)
                            ? "secondary.main"
                            : "primary.main",

                          color: "background.alt",
                          "&:hover": {
                            bgcolor: "secondary.main",
                          },
                        }}
                      >
                        {service.name}
                      </Button>
                    ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseServiceDialog}
                  variant="contained"
                  sx={{ borderradius: 0 }}
                >
                  Keluar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>

          {/* modal untuk memilih waktu tersedia */}
          <Dialog
            open={openTimeDialog}
            onClose={handleCloseTimeDialog}
            fullWidth
            maxWidth="xs"
          >
            <Box sx={{ bgcolor: "background.alt", color: "secondary.main" }}>
              <DialogTitle>Pilih Waktu</DialogTitle>
              <DialogContent>
                <div
                  style={{
                    maxHeight: "300px",
                    marginTop: "5px",
                  }}
                >
                  {availableTimes.map((time, index) => (
                    <Button
                      key={index}
                      onClick={() => handleTimeSelect(time)}
                      fullWidth
                      sx={{
                        justifyContent: "flex-start",
                        mb: 1,
                        textAlign: "center",

                        bgcolor:
                          selectedTime === time
                            ? "secondary.main"
                            : "primary.main",
                        color: "background.alt",
                        "&:hover": {
                          bgcolor: "secondary.main",
                        },
                      }}
                    >
                      {time} WIB
                    </Button>
                  ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleCloseTimeDialog}>
                  Keluar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormReservation;

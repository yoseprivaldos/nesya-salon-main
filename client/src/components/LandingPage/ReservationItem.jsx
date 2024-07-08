/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  useDeleteScheduleByReservationMutation,
  useCreateRatingMutation,
} from "../../redux/api/api";
import { useSelector } from "react-redux";

const ReservationItem = ({
  id,
  services,
  date,
  status,
  note,
  startTime,
  endTime,
  totalPrice,
  image,
  message,
  onCancelReservation,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openReasonDialog, setOpenReasonDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [deleteScheduleByReservationId] =
    useDeleteScheduleByReservationMutation();
  const [createRating] = useCreateRatingMutation();

  // State untuk rating
  const [serviceRatings, setServiceRatings] = useState(
    services.map((service) => ({
      service_id: service._id,
      rating: 0,
    }))
  );
  const [overallRatings, setOverallRatings] = useState(0);
  const [additionalComment, setAdditionalComment] = useState("");

  // Handle membuka dialog review
  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  // Handle menutup dialog review
  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  // Handle membuka dialog cancel
  const handleOpenCancelDialog = () => {
    setOpenCancelDialog(true);
  };

  // Handle menutup dialog cancel
  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  // Handle mengkonfirmasi pembatalan
  const handleConfirmCancel = () => {
    setOpenCancelDialog(false);
    setOpenReasonDialog(true);
  };

  // Handle menutup dialog alasan pembatalan
  const handleCloseReasonDialog = () => {
    setOpenReasonDialog(false);
    setCancelReason("");
    setOtherReason("");
  };

  // Handle perubahan alasan pembatalan
  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  // Handle perubahan alasan lain
  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
  };

  // Handle mengkonfirmasi alasan pembatalan
  const handleConfirmReason = async () => {
    const reason = cancelReason === "Lainnya" ? otherReason : cancelReason;
    console.log("Alasan Pembatalan:", reason);
    setOpenReasonDialog(false);
    setCancelReason("");
    setOtherReason("");

    const canceledData = {
      reservationMessage: reason,
      status: "canceled",
    };
    console.log(id);
    console.log(canceledData);

    try {
      // await updateReservation({id, ...canceledData}).unwrap()
      const result = await deleteScheduleByReservationId({
        reservationId: id,
        ...canceledData,
      });
      // Inform parent component (Reservation.jsx) about cancellation
      onCancelReservation(id);
    } catch (error) {
      console.error("Failed to delete schedule", error);
    }
  };

  // Handle perubahan rating layanan
  const handleServiceRatingChange = (index, value) => {
    const newServiceRatings = [...serviceRatings];
    newServiceRatings[index].rating = value;
    setServiceRatings(newServiceRatings);
  };

  // Handle perubahan rating keseluruhan
  const handleOverallRatingChange = (event) => {
    setOverallRatings(event.target.value);
  };

  // Handle perubahan komentar tambahan
  const handleAdditionalCommentChange = (event) => {
    setAdditionalComment(event.target.value);
  };

  // Handle submit rating
  const handleSubmitRating = async () => {
    const ratingData = {
      reservation_id: id,
      user_id: currentUser._id,
      serviceRatings,
      overallRatings,
      additionalComment,
    };
    try {
      const { data, error } = await createRating(ratingData);

      if (data) {
        console.log("Berhasil Rating berhasil ");
        console.log(data);
      } else if (error) {
        console.error("Rating gagal dibuat", error.message);
      }
      // Reset state dan tutup dialog
      setServiceRatings(
        services.map((service) => ({
          service_id: service._id,
          rating: 0,
        }))
      );
      setOverallRatings(0);
      setAdditionalComment("");
      handleCloseReviewDialog();
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  const dateString = date;
  const dateObj = new Date(dateString);
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const tanggal = dateObj.getDate();
  const bulan = namaBulan[dateObj.getMonth()];
  const tahun = dateObj.getFullYear();
  const formattedDate = `${tanggal} ${bulan} ${tahun}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        border: 1,
        borderColor: "secondary.main",
        borderRadius: 2,
        padding: { xs: 2, md: 2 },
        marginBottom: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        width: "100%",
        height: { xs: 330, md: 220 },
      }}
    >
      <Box
        component="img"
        src={image}
        alt="Reservation Image"
        sx={{
          width: { xs: "100%", md: "30%" },
          height: { xs: "40%", md: "100%" },
          borderRadius: 2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          marginLeft: { xs: 0.1, md: 2 },
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "75%" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary.main"
              fontFamily="cursive"
              sx={{ textDecoration: "underline" }}
            >
              {services.map((service) => service.name).join(", ")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                mt: { xs: 0.5, md: 0.6 },
                fontWeight: "bold",
              }}
            >
              Tanggal&nbsp;: {formattedDate}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ mt: { xs: 0.5, md: 0.5 }, fontWeight: "bold" }}
            >
              Jam&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {startTime} -{" "}
              {endTime} WIB
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                mt: { xs: 0.5, md: 0.5 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Catatan&nbsp;:</span>
              <span>{note}</span>
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              sx={{ mt: { xs: 0.5, md: 0.5 }, fontWeight: "bold" }}
            >
              Harga: Rp.{totalPrice}
            </Typography>
          </Box>
          <Box sx={{ width: "25%" }}>
            <Typography
              sx={{ height: "20%" }}
              variant="body1"
              color={
                status === "pending"
                  ? "black"
                  : status === "canceled"
                  ? "red"
                  : status === "confirmed"
                  ? "green"
                  : "primary.main"
              }
              fontWeight="bold"
              align="center"
              fontFamily="initial"
            >
              {status.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="black"
              sx={{ height: "45%", display: "flex", flexDirection: "column" }}
            >
              <span>Pesan:</span>
              <span style={{ fontSize: "10px", fontStyle: "italic" }}>
                {message}
              </span>
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                height: "35%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              {status === "completed" && (
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={handleOpenReviewDialog}
                >
                  NILAI
                </Button>
              )}
              {(status === "pending" || status === "confirmed") && (
                <Button
                  sx={{ mt: 0.5 }}
                  variant="contained"
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={handleOpenCancelDialog}
                >
                  Batalkan
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dialog untuk Nilai */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle>Nilai Reservasi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Berikan penilaian untuk reservasi ini.
          </DialogContentText>
          {serviceRatings.map((serviceRating, index) => (
            <Box key={serviceRating.service_id} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id={`service-rating-label-${index}`}>
                  Penilaian Layanan
                </InputLabel>
                <Select
                  labelId={`service-rating-label-${index}`}
                  value={serviceRating.rating}
                  onChange={(e) =>
                    handleServiceRatingChange(index, e.target.value)
                  }
                  label={`Penilaian Layanan ${index}`}
                >
                  <MenuItem value={0}>Tidak Dinilai</MenuItem>
                  <MenuItem value={1}>1 - Sangat Buruk</MenuItem>
                  <MenuItem value={2}>2 - Buruk</MenuItem>
                  <MenuItem value={3}>3 - Biasa</MenuItem>
                  <MenuItem value={4}>4 - Baik</MenuItem>
                  <MenuItem value={5}>5 - Sangat Baik</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="overall-rating-label">
                Penilaian Keseluruhan
              </InputLabel>
              <Select
                labelId="overall-rating-label"
                value={overallRatings}
                onChange={handleOverallRatingChange}
                label="Penilaian Keseluruhan"
              >
                <MenuItem value={0}>Tidak Dinilai</MenuItem>
                <MenuItem value={1}>1 - Sangat Buruk</MenuItem>
                <MenuItem value={2}>2 - Buruk</MenuItem>
                <MenuItem value={3}>3 - Biasa</MenuItem>
                <MenuItem value={4}>4 - Baik</MenuItem>
                <MenuItem value={5}>5 - Sangat Baik</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            sx={{ mt: 2 }}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Komentar Tambahan (opsional)"
            value={additionalComment}
            onChange={handleAdditionalCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog} color="primary">
            Batal
          </Button>
          <Button onClick={handleSubmitRating} color="primary">
            Kirim
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog untuk Batalkan */}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Batalkan Reservasi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin membatalkan reservasi ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Tidak
          </Button>
          <Button onClick={handleConfirmCancel} color="primary">
            Ya, Batalkan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog untuk Alasan Pembatalan */}
      <Dialog open={openReasonDialog} onClose={handleCloseReasonDialog}>
        <DialogTitle>Alasan Pembatalan</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="cancel-reason-label">Pilih Alasan</InputLabel>
            <Select
              labelId="cancel-reason-label"
              value={cancelReason}
              label="Pilih Alasan"
              onChange={handleReasonChange}
            >
              <MenuItem value="Perubahan Layanan">Perubahan Layanan</MenuItem>
              <MenuItem value="Perubahan Jadwal">Perubahan Jadwal</MenuItem>
              <MenuItem value="Ketidak Puasan Pelayanan">
                Ketidak Puasan Pelayanan
              </MenuItem>
              <MenuItem value="Lainnya">Lainnya</MenuItem>
            </Select>
          </FormControl>
          {cancelReason === "Lainnya" && (
            <TextField
              autoFocus
              margin="dense"
              id="other-reason"
              label="Alasan Lainnya"
              fullWidth
              value={otherReason}
              onChange={handleOtherReasonChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReasonDialog} color="primary">
            Batal
          </Button>
          <Button onClick={handleConfirmReason} color="primary">
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReservationItem;

/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import {
  useGetReservationsQuery,
  useUpdateReservationMutation,
  useCreateScheduleMutation,
  useDeleteScheduleByReservationMutation,
  useCreateEmailMutation,
  useUpdateServiceViewsMutation,
} from "../../redux/api/api";
import { useLocation } from "react-router-dom";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";

function Row(props) {
  const { row, handleStatusChange } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [newStatus, setNewStatus] = React.useState(row.status);
  const [message, setMessage] = React.useState("");

  const getStatusButtonStyle = (status) => {
    switch (status) {
      case "completed":
        return {
          backgroundColor: "green",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        };
      case "absent":
        return {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            backgroundColor: "darkred",
          },
        };
      case "confirmed":
        return {
          backgroundColor: "blue",
          color: "white",
          "&:hover": {
            backgroundColor: "darkblue",
          },
        };
      case "canceled":
        return {
          backgroundColor: "gray",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgray",
          },
        };
      case "pending":
        return {
          backgroundColor: "orange",
          color: "white",
          "&:hover": {
            backgroundColor: "darkorange",
          },
        };
      default:
        return {
          backgroundColor: "orange",
          color: "white",
          "&:hover": {
            backgroundColor: "darkorange",
          },
        };
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEmailModalOpen = () => {
    setEmailModalOpen(true);
  };

  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
  };

  const handleStatusUpdate = () => {
    handleStatusChange(
      row._id,
      newStatus,
      message,
      row.date,
      row.startTime,
      row.endTime,
      row.note,
      row.services,
      row.reservationName
    );
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.reservationName}
        </TableCell>
        <TableCell align="center">
          {new Date(row.date).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">{`${row.startTime} - ${row.endTime}`}</TableCell>
        <TableCell align="center">{row.totalPrice}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleModalOpen}
            disabled={
              row.status === "completed" ||
              row.status === "absent" ||
              row.status === "canceled"
            }
            sx={{ ...getStatusButtonStyle(row.status), width: "170px" }}
          >
            {row.status}
          </Button>
        </TableCell>
        <TableCell align="center">
          {row.status === "confirmed" && (
            <Tooltip title="Kirim email notifikasi">
              <span>
                <IconButton
                  color="primary"
                  onClick={handleEmailModalOpen}
                  disabled={row.status !== "confirmed"}
                >
                  <SendIcon
                    sx={{
                      color: row.status !== "confirmed" ? "grey" : "blue",
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          )}
          {row.status !== "confirmed" && ( // Hanya IconButton yang ditampilkan jika row.status bukan "confirmed"
            <IconButton
              color="primary"
              onClick={handleEmailModalOpen}
              disabled={row.status !== "confirmed"}
            >
              <SendIcon
                sx={{
                  color: row.status !== "confirmed" ? "grey" : "blue",
                }}
              />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <TableRow sx={{ "& > *": { borderBottom: "unset" }, mb: 2 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail Reservasi
              </Typography>
              <Table
                size="small"
                aria-label="reservation details"
                sx={{
                  backgroundColor: "secondary.alt",
                  color: "primary.main",
                  "& .MuiTableCell-root": {
                    color: "primary.main",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Waktu</TableCell>
                    <TableCell>Layanan</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Nomor Telepon</TableCell>
                    <TableCell>Total Harga</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Pesan Tambahan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{`${row.startTime} - ${row.endTime}`}</TableCell>
                    <TableCell>
                      {row.services.map((service) => service.name).join(", ")}
                    </TableCell>
                    <TableCell>{row.reservationEmail}</TableCell>
                    <TableCell>{row.reservationPhoneNumber}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell>{row.note}</TableCell>
                    <TableCell>{row.reservationMessage}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Dialog untuk status           */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Update Status Reservasi</DialogTitle>
        <DialogContent>
          <TextField
            label="Pesan Pemberitahuan"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="pending">Menunggu</MenuItem>
            <MenuItem value="confirmed">Setujui</MenuItem>
            <MenuItem value="completed">Selesaikan</MenuItem>
            <MenuItem value="canceled">Batalkan</MenuItem>
            <MenuItem value="absent">Tidak Hadir</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleStatusUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog untuk email icon */}
      <Dialog open={emailModalOpen} onClose={handleEmailModalClose}>
        <DialogTitle>Konfirmasi Pengiriman Email</DialogTitle>
        <DialogContent>
          <Typography>
            Anda akan mengirimkan notifikasi email ke: {row.reservationEmail}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailModalClose}>Tutup</Button>
          <Button onClick={props.handleSendEmail} color="primary">
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    reservationName: PropTypes.string.isRequired,
    reservationEmail: PropTypes.string.isRequired,
    reservationPhoneNumber: PropTypes.string,
    note: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        // numberOfViews: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reservationMessage: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default function BeautySalonReservationTable() {
  const {
    data: reservations,
    error,
    isLoading,
    refetch,
  } = useGetReservationsQuery();
  const [createSchedule] = useCreateScheduleMutation();
  const [updateReservation] = useUpdateReservationMutation();
  const [updateServiceViews] = useUpdateServiceViewsMutation();
  const [deleteScheduleByReservationId] =
    useDeleteScheduleByReservationMutation();
  const location = useLocation();
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [updatedReservations, setUpdatedReservations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortConfig, setSortConfig] = React.useState({
    key: "date",
    direction: "desc",
  });

  const [createEmail] = useCreateEmailMutation();
  React.useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  React.useEffect(() => {
    if (reservations) {
      setUpdatedReservations(reservations);
    }
  }, [reservations]);

  const handleStatusChange = async (
    reservationId,
    newStatus,
    message,
    date,
    startTime,
    endTime,
    note,
    services
  ) => {
    const serviceIds = services.map((service) => service._id);
    const newEvent = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      type: "reservation",
      reservation: reservationId,
      notes: note,
    };
    try {
      if (newStatus === "canceled") {
        // jika mengubah ke cancelled ya melakukan perubahan status dan mengurangi jadwal
        await deleteScheduleByReservationId({
          reservationId,
          message,
          status: newStatus,
        }).unwrap();
      } else if (newStatus === "confirmed") {
        // jika mengubah ke confirmed ya melakukan perubahan status dan menambah jadwal
        await updateReservation({
          reservationId,
          status: newStatus,
          message,
        }).unwrap();
        await createSchedule(newEvent).unwrap();
      } else if (newStatus === "completed") {
        // jika ada perubahan ke selesai
        await updateReservation({
          reservationId,
          status: newStatus,
          message,
        }).unwrap();
        // menambahkan jumlah number of views terhadap semua service yang ada di reservasi
        await updateServiceViews(serviceIds).unwrap();
      } else {
        // jika ada perubahan status absent
        await updateReservation({
          reservationId,
          status: newStatus,
          message,
        }).unwrap();
      }

      refetch();
      // Setelah refetch selesai, update state lokal
      setUpdatedReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );
    } catch (error) {
      console.error("Failed to update reservation status: ", error);
    }
  };

  const handleSendEmail = async (reservationData) => {
    try {
      await createEmail(reservationData).unwrap();
      alert("Email berhasil dikirim")
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim email")
    }
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredReservations = updatedReservations.filter((reservation) => {
    if (filterStatus === "All") {
      return true;
    }
    return reservation.status === filterStatus;
  });

  const searchedReservations = filteredReservations.filter((reservation) =>
    reservation.reservationName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedReservations = searchedReservations.sort((a, b) => {
    if (sortConfig.key === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortConfig.direction === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    } else if (sortConfig.key === "totalPrice") {
      if (sortConfig.direction === "asc") {
        return a.totalPrice - b.totalPrice;
      } else {
        return b.totalPrice - a.totalPrice;
      }
    }
    return 0;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading reservations.</div>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: 2, backgroundColor: "background.alt" }}
      >
        Manajemen Reservasi
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "background.alt",
        }}
      >
        <Select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          displayEmpty
          inputProps={{ "aria-label": "Filter by status" }}
        >
          <MenuItem value="All">Semua</MenuItem>
          <MenuItem value="pending">Proses</MenuItem>
          <MenuItem value="confirmed">Disetujui</MenuItem>
          <MenuItem value="completed">Selesai</MenuItem>
          <MenuItem value="canceled">Dibatalkan</MenuItem>
          <MenuItem value="absent">Absent</MenuItem>
        </Select>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nama Pelanggan</TableCell>
              <TableCell
                align="center"
                sortDirection={
                  sortConfig.key === "date" ? sortConfig.direction : false
                }
              >
                <TableSortLabel
                  active={sortConfig.key === "date"}
                  direction={sortConfig.direction || "asc"}
                  onClick={() => handleSortRequest("date")}
                >
                  Tanggal
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Waktu</TableCell>
              <TableCell
                align="center"
                sortDirection={
                  sortConfig.key === "totalPrice" ? sortConfig.direction : false
                }
              >
                <TableSortLabel
                  active={sortConfig.key === "totalPrice"}
                  direction={sortConfig.direction || "asc"}
                  onClick={() => handleSortRequest("totalPrice")}
                >
                  Total Harga
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "background.alt" }}>
            {sortedReservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation) => (
                <Row
                  key={reservation._id}
                  row={reservation}
                  handleStatusChange={handleStatusChange}
                  handleSendEmail={() =>
                    handleSendEmail({
                      email: reservation.reservationEmail,
                      reservationName: reservation.reservationName,
                      reservationDate: reservation.date,
                      startTime: reservation.startTime,
                      endTime: reservation.endTime,
                      services: reservation.services,
                      note: reservation.note,
                    })
                  }
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ backgroundColor: "background.alt" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedReservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}

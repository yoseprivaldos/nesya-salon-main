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
} from "../../redux/api/api";
import { useLocation } from "react-router-dom";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function Row(props) {
  const { row, handleStatusChange } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
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

  const handleStatusUpdate = () => {
    handleStatusChange(row._id, newStatus, message);
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
            disabled={row.status == "completed" || row.status === "absent"}
            sx={{ ...getStatusButtonStyle(row.status), widht: "170px" }}
          >
            {row.status}
          </Button>
        </TableCell>
      </TableRow>

      <TableRow sx={{ "& > *": { borderBottom: "unset" }, mb: 2 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleStatusUpdate} color="primary">
            Update
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

  const [updateReservation] = useUpdateReservationMutation();

  const [filterStatus, setFilterStatus] = React.useState("All");
  const [updatedReservations, setUpdatedReservations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [sortConfig, setSortConfig] = React.useState({
    key: "",
    direction: "",
  });
  const location = useLocation();

  React.useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  React.useEffect(() => {
    if (reservations) {
      setUpdatedReservations(reservations);
    }
  }, [reservations]);

  const handleChangeStatus = async (id, newStatus, message) => {
    try {
      const changeStatus = {
        status: newStatus,
        reservationMessage: message,
      };
      console.log(id);

      const { data, error } = await updateReservation({
        reservationId: id,
        ...changeStatus,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (id, newStatus, message) => {
    handleChangeStatus(id, newStatus, message);

    const updatedData = updatedReservations.map((reservation) => {
      if (reservation._id === id) {
        // Lakukan sesuatu dengan message jika diperlukan
        console.log(`Pesan Pemberitahuan: ${message}`);
        return { ...reservation, status: newStatus };
      }
      return reservation;
    });
    setUpdatedReservations(updatedData);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedReservations = React.useMemo(() => {
    const sortedData = [...updatedReservations];
    if (sortConfig.key !== "") {
      sortedData.sort((a, b) => {
        if (sortConfig.key === "totalPrice") {
          return sortConfig.direction === "asc"
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        } else {
          return sortConfig.direction === "asc"
            ? new Date(a.date + " " + a.startTime) -
                new Date(b.date + " " + b.startTime)
            : new Date(b.date + " " + b.startTime) -
                new Date(a.date + " " + a.startTime);
        }
      });
    }
    return sortedData;
  }, [updatedReservations, sortConfig]);

  const filteredRows = sortedReservations
    .filter((row) => filterStatus === "All" || row.status === filterStatus)
    .filter((row) => {
      const searchTerm = searchQuery.toLowerCase();
      const reservationDate = new Date(row.date);
      const month = reservationDate
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const year = reservationDate.getFullYear().toString();

      return (
        row.reservationName.toLowerCase().includes(searchTerm) ||
        row.reservationEmail.toLowerCase().includes(searchTerm) ||
        row.services.some((service) =>
          service.name.toLowerCase().includes(searchTerm)
        ) ||
        month.includes(searchTerm) ||
        year.includes(searchTerm)
      );
    });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reservations</div>;

  return (
    <Box sx={{ backgroundColor: "background.alt" }}>
      <Box sx={{ marginBottom: 1, padding: 1 }}>
        <Typography variant="h5">Filter Status:</Typography>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          sx={{
            fontSize: 12,
            borderRadius: 0,
            border: 1,
            color: "primary",
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ marginLeft: 2 }}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "background.alt", borderRadius: 0 }}
      >
        <Table aria-label="beauty salon reservation table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nama Pelanggan</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortConfig.key === "date"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("date")}
                >
                  Tanggal
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortConfig.key === "startTime"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("startTime")}
                >
                  Waktu
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={sortConfig.key === "totalPrice"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("totalPrice")}
                >
                  Total Harga
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <Row
                key={row._id}
                row={row}
                handleStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24]}
      />
    </Box>
  );
}

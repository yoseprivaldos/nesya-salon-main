import { Box } from "@mui/material";
import Header from "../../components/dashboard/Header";
import ReservationTable from "../../components/dashboard/ReservationTable";
const Reservation = () => {
  return (
    <Box m="0.8rem 2.5rem">
      <Header title="DATA RESERVASI" />
      <ReservationTable />
    </Box>
  );
};

export default Reservation;

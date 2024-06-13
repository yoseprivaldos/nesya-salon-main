import { Box } from "@mui/material";
import FormReservation from "./FormReservation";
import DetailService from "./DetailService";

const CreateReservation = () => {
  return (
    <Box>
      <DetailService />
      <FormReservation />
    </Box>
  );
};

export default CreateReservation;

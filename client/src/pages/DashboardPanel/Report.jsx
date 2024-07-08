import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/dashboard/Header";

const ReportDownload = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `/api/report/pdf?startDate=${startDate}&endDate=${endDate}`
      );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfData(reader.result); // Simpan data base64 ke state
        setShowPreview(true);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const downloadPDF = () => {
    const url = `/api/report/pdf?startDate=${startDate}&endDate=${endDate}`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Laporan_Reservasi.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  const downloadExcel = () => {
    const url = `/api/report/excel?startDate=${startDate}&endDate=${endDate}`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Laporan_Reservasi.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading Excel:", error);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="HALAMAN LAPORAN" />
      <Grid
        container
        spacing={2}
        backgroundColor="primary.main"
        mt={3}
        pb={3}
        pr={3}
        pl={3}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Pilih Rentang Tanggal Laporan</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Awal"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Tanggal Akhir"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchReservations}
            fullWidth
            sx={{ backgroundColor: "background.alt" }}
          >
            Tampilkan PDF
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPDF}
            fullWidth
            sx={{ backgroundColor: "background.alt" }}
          >
            Download PDF
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadExcel}
            fullWidth
            sx={{ backgroundColor: "background.alt" }}
          >
            Download EXCEL
          </Button>
        </Grid>
      </Grid>

      {showPreview && (
        <Box mt={4}>
          <Typography variant="h6">Preview PDF:</Typography>
          {/* Gunakan <embed> untuk menampilkan preview PDF */}
          <embed
            title="PDF Preview"
            src={pdfData} // Gunakan data base64 dari state
            type="application/pdf"
            width="100%"
            height="600px"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowPreview(false)}
            fullWidth
            mt={2}
          >
            Tutup Preview
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ReportDownload;

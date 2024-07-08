import express from "express";
import Reservation from "../models/reservation.model.js";
import { generatePdfTemplate } from "../public/pdf-templates/pdf-template.js";
import generateExcelTemplate from "../public/excel-templates/excel-template.js";
import XLSX from "xlsx";
import XLSXStyle from "xlsx-style";
const router = express.Router();

// // Fungsi untuk mendapatkan data reservasi sesuai dengan tanggal dan status "completed"
async function getReservations(startDate, endDate) {
  const reservations = await Reservation.find({
    $or: [
      {
        reservationDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
      { status: "completed" },
    ],
  }).populate({
    path: "services",
    select: "name price duration", // Hanya pilih field ini
  });

  return reservations;
}

router.get("/pdf", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Fetch data based on the date range
    const reservations = await getReservations(startDate, endDate);

    // Check if reservations data is available
    if (!reservations || reservations.length === 0) {
      return res.status(404).send("Data reservasi tidak ditemukan.");
    }

    // Create a new jsPDF instance
    const doc = generatePdfTemplate(reservations, startDate, endDate);

    // Convert the jsPDF document to a buffer arrayx
    const pdfBuffer = doc.output("arraybuffer");

    // Set response headers for PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Laporan_Reservasi.pdf"
    );

    // Send the PDF buffer as response
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("Error fetching or generating PDF:", error);
    res
      .status(500)
      .send("Terjadi kesalahan dalam mengambil data atau membuat PDF.");
  }
});

router.get("/excel", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Fetch data based on startDate and endDate
    const reservations = await getReservations(startDate, endDate); // Implement this function to get data

    if (!reservations || reservations.length === 0) {
      return res.status(400).send("No data found for the specified date range");
    }

    // Generate Excel file
    const excelBuffer = generateExcelTemplate(reservations, startDate, endDate);

    // Send the file
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Laporan_Reservasi.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error fetching or generating Excel:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

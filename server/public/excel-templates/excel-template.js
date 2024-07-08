import XLSX from "xlsx";
import XLSXStyle from "xlsx-style";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Import locale untuk Bahasa Indonesia

export default function generateExcelTemplate(
  reservations,
  startDate,
  endDate
) {
  const wb = XLSX.utils.book_new();
  const ws_name = "LAPORAN RESERVASI";
  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  // Judul (Laporan Reservasi) with styling and width adjustment
  XLSX.utils.sheet_add_aoa(ws, [["LAPORAN RESERVASI"]], { origin: "A1" });
  const titleStyle = {
    fill: { fgColor: { rgb: "92D050" } },
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center" },
  };

  // Set column widths to match header columns
  const colWidths = [
    { wch: 5 }, // NO
    { wch: 20 }, // NAMA
    { wch: 15 }, // TANGGAL
    { wch: 20 }, // NAMA LAYANAN
    { wch: 15 }, // DURASI LAYANAN
    { wch: 15 }, // HARGA LAYANAN
    { wch: 20 }, // TOTAL HARGA
  ];
  ws["!cols"] = colWidths;

  // Get the last column index
  const lastCol = colWidths.length - 1;

  // Apply the title style to all cells in the first row
  for (let col = 0; col <= lastCol; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!ws[cellAddress]) ws[cellAddress] = {}; // Ensure cell exists
    ws[cellAddress].s = titleStyle;
  }

  // Merge cells to create a single title cell
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: lastCol } }];

  // Rentang Tanggal
  const formattedStartDate = format(new Date(startDate), "d MMMM yyyy", {
    locale: id,
  });
  const formattedEndDate = format(new Date(endDate), "d MMMM yyyy", {
    locale: id,
  });
  const dateRange = `RENTANG ${formattedStartDate} - ${formattedEndDate}`;
  XLSX.utils.sheet_add_aoa(ws, [[dateRange]], { origin: "A3" });
  const dateRangeStyle = {
    font: { sz: 12 },
    alignment: { horizontal: "center" },
  };
  for (let col = 0; col <= lastCol; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 2, c: col });
    if (!ws[cellAddress]) ws[cellAddress] = {}; // Ensure cell exists
    ws[cellAddress].s = dateRangeStyle;
  }
  ws["!merges"].push({ s: { r: 2, c: 0 }, e: { r: 2, c: lastCol } });

  // Header Tabel
  const header = [
    "NO",
    "NAMA",
    "TANGGAL",
    "NAMA LAYANAN",
    "DURASI LAYANAN",
    "HARGA LAYANAN",
    "TOTAL HARGA",
  ];
  XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A4" });

  // Styling untuk header
  const headerStyle = {
    fill: { fgColor: { rgb: "D9D9D9" } },
    font: { bold: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };
  for (let col = 0; col < header.length; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 3, c: col });
    if (!ws[cellAddress]) ws[cellAddress] = {}; // Ensure cell exists
    ws[cellAddress].s = headerStyle;
  }

  // Data untuk tabel
  let currentRow = 5;
  reservations.forEach((reservation, index) => {
    reservation.services.forEach((service, serviceIndex) => {
      const rowData =
        serviceIndex === 0
          ? [
              index + 1,
              reservation.reservationName,
              format(new Date(reservation.date), "d MMMM yyyy", { locale: id }),
              service.name,
              `${service.duration} menit`,
              `Rp${service.price}`,
              `Rp${reservation.totalPrice}`,
            ]
          : [
              "",
              "",
              "",
              service.name,
              `${service.duration} menit`,
              `Rp${service.price}`,
              "",
            ];

      XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: `A${currentRow}` });

      // Styling untuk data (border untuk setiap cell)
      for (let col = 0; col < rowData.length; col++) {
        const cellAddress = XLSX.utils.encode_cell({
          r: currentRow - 1,
          c: col,
        });
        if (!ws[cellAddress]) ws[cellAddress] = {}; // Ensure cell exists
        ws[cellAddress].s = {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }

      currentRow++;
    });
  });

  return XLSXStyle.write(wb, { bookType: "xlsx", type: "buffer" });
}

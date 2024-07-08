import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Import locale untuk Bahasa Indonesia

export function generatePdfTemplate(reservations, startDate, endDate) {
  const doc = new jsPDF();

  // Format tanggal
  const formattedStartDate = format(new Date(startDate), "d MMMM yyyy", {
    locale: id,
  });
  const formattedEndDate = format(new Date(endDate), "d MMMM yyyy", {
    locale: id,
  });
  const dateRange = `Rentang data: ${formattedStartDate} - ${formattedEndDate}`;

  // Judul
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Laporan Reservasi", 105, 10, { align: "center" });

  // Rentang Tanggal
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(dateRange, 105, 18, { align: "center" });

  // Header tabel
  const head = [
    [
      { content: "NO", rowSpan: 2 },
      { content: "Nama", rowSpan: 2 },
      { content: "Tanggal", rowSpan: 2 },
      { content: "Total Price", rowSpan: 2 },
      { content: "Service", colSpan: 3 },
    ],
    ["Nama", "Durasi", "Harga"],
  ];

  // Data untuk tabel
  const tableData = [];

  reservations.forEach((reservation, index) => {
    const services = reservation.services.map((service) => [
      service.name,
      `${service.duration} menit`,
      `Rp${service.price}`,
    ]);

    services.forEach((service, serviceIndex) => {
      if (serviceIndex === 0) {
        tableData.push([
          index + 1,
          reservation.reservationName,
          format(new Date(reservation.date), "d MMMM yyyy", { locale: id }),
          `Rp${reservation.totalPrice}`,
          service[0],
          service[1],
          service[2],
        ]);
      } else {
        tableData.push(["", "", "", "", service[0], service[1], service[2]]);
      }
    });
  });

  // Membuat tabel
  doc.autoTable({
    head: head,
    body: tableData,
    startY: 25, // Mengatur posisi awal tabel setelah rentang tanggal
    headStyles: { fillColor: [41, 128, 185] },
    theme: "striped",
    styles: {
      cellPadding: 3,
      fontSize: 10,
    },
    didDrawPage: function (data) {
      // Tambahkan header pada setiap halaman baru
      if (data.pageNumber > 1) {
        doc.setFontSize(16);
        doc.text("Laporan Reservasi", 105, 10, { align: "center" });
        doc.setFontSize(12);
        doc.text(dateRange, 105, 18, { align: "center" });
      }
    },
    margin: { top: 30 },
    pageBreak: "auto", // Pengaturan pemisahan halaman otomatis
  });

  return doc;
}

import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Tanggal harus diisi"],
  },
  startTime: {
    type: String,
    required: [true, "Waktu mulai harus diisi"],
  },
  endTime: {
    type: String,
    required: [true, "Waktu selesai harus diisi"],
  },
  type: {
    type: String,
    enum: ["reservation", "holiday", "break", "other"], // Tipe jadwal
    required: [true, "Tipe jadwal harus diisi"],
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", // Referensi ke model Reservation
    default: null, // Boleh null jika bukan tipe 'reservation'
  },
  notes: {
    // Opsional, untuk catatan tambahan
    type: String,
    default: "",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;

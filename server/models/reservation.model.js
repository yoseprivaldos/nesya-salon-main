const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["Diproses", "Selesai", "Dibatalkan"],
    default: "Diproses",
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;

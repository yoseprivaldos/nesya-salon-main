import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Id User pembuat harus ada"],
  },
  reservationName: {
    type: String,
    required: [true, "reservasi name harus diisi"],
  },

  reservationPhoneNumber: {
    type: String,
  },
  reservationEmail: {
    type: String,
    required: [true, "Email harus diisi"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  note: {
    type: String,
    default: "",
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    required: [true, "tanggal harus diisi"],
  },
  startTime: {
    type: String,
    required: [true, "waktu mulai harus diisi"],
  },
  endTime: {
    type: String,
    required: [true, "waktu selesai harus diisi"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled", "completed", "absent"],
    default: "pending",
  },
  reservationMessage: {
    type: String,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;

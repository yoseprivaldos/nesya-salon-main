import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: [true, "Reservasi harus ada"],
    },
    amount: {
      type: Number,
      required: [true, "Jumlah pembayaran harus ada"],
      min: [0, "Jumlah pembayaran tidak boleh kurang dari 0"],
    },
    paymentMethod: {
      type: String,
      enum: [
        "credit card",
        "debit card",
        "cash",
        "online",
        "e-wallet",
        "bank transfer",
      ],
      required: [true, "Metode pembayaran harus ada"],
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: [true, "ID transaksi harus ada"],
    },

    paymentGatewayResponse: {
      type: mongoose.Schema.Types.Mixed, // Menyimpan respon dari payment gateway
      default: {},
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama layanan harus ada"],
      unique: [true, "layanan sudah terdaftar"],
    },
    description: {
      type: String,
    },
    kategori: {
      type: String,
      enum: ["Rambut", "Wajah", "Tubuh"], //segera ubah ini buat referensi dari tabel kategori
    },
    duration: {
      type: Number,
      required: [true, "durasi layanan wajib ada"],
      min: 0,
    },
    imageService: [
      {
        type: String, //URL gambar
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;

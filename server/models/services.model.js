import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama layanan harus ada"],
      unique: [true, "layanan sudah terdaftar"],
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Kategori layanan harus ada"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Subkategori layanan harus ada"],
    },
    duration: {
      type: Number,
      required: [true, "durasi layanan wajib ada"],
      min: [0, "durasi layanan tidak boleh kurang dari 0"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "harga layanan tidak boleh kurang dari 0"],
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
    numberOfViews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "rating tidak boleh kurang dari 0"],
      max: [5, "rating tidak boleh lebih dari 5"],
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;

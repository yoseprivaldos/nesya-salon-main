import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama kategori harus tersedia"],
    unique: true, // Pastikan nama kategori unik
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

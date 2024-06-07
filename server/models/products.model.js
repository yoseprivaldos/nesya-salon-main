import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama produk harus ada"],
      unique: [true, "Produk sudah terdaftar"],
    },
    description: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [String],
      default: "",
    },
    category: [
      {
        type: String,
        required: [true, "category harus ada"],
      },
    ],
    price: {
      type: Number,
      required: [true, "Harga Produk harus ada"],
      min: [0, "harga tidak boleh negatif"],
    },
    imageProduct: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stok tidak boleh negatif"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

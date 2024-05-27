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
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "category harus ada"],
    },
    brand: {
      type: String,
      required: [true, "Nama brand produk harus ada"],
    },
    productType: {
      type: String,
      enum: [
        "Shampoo",
        "Conditioner",
        "Hair Mask",
        "Hair Serum",
        "Pomade",
        "Hair Spray",
        "Face Wash",
        "Toner",
        "Moisturizer",
        "Serum",
        "Sunscreen",
        "Mask",
        "Scrub",
        "Body Lotion",
        "Body Wash",
        "Soap",
        "Essential Oil",
        "Makeup",
        "Nail Polish",
        "Others",
      ],
    },
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
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

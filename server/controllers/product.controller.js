import mongoose from "mongoose";
import Product from "../models/products.model.js";

//createProduct by admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      category,
      price,
      imageProduct,
      stock,
    } = req.body;

    //validasi input
    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ message: "Nama, Kategori dan Harga Wajib diisi" });
    }

    // Pastikan kategori adalah array
    if (!Array.isArray(category)) {
      return res.status(400).json({ message: "Kategori harus berupa array" });
    }

    const newProduct = new Product({
      name,
      description,
      ingredients,
      category,
      price,
      imageProduct,
      stock,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product berhasil dibuat" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Data tidak valid", errors });
    } else if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Produk dengan nama yang sama sudah ada" });
    } else {
      res.status(500).json({ message: "Gagal membuat produk", error });
    }
  }
};

//getProductById
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    // pastikan product ada
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal fetching produk" });
  }
};

//getAllProducts
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan server ketika menampilkan semua produk",
    });
  }
};

// UpdateProduct - only by admin
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("berikut merupakan tipe data dari productId", typeof productId);
    console.log("log dari productId", productId);
    console.log("log dari params", req.params);

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedData = req.body;

    // Pastikan kategori adalah array jika ada dalam updatedData
    if (updatedData.category && !Array.isArray(updatedData.category)) {
      return res.status(400).json({ message: "Kategori harus berupa array" });
    }

    // Pastikan imageProduct adalah array jika ada dalam updatedData
    if (updatedData.imageProduct && !Array.isArray(updatedData.imageProduct)) {
      return res
        .status(400)
        .json({ message: "imageProduct harus berupa array" });
    }

    // Hapus _id dari updatedData jika ada
    delete updatedData._id;

    // Update Produk
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Penanganan Error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Data tidak valid", errors });
    } else if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Produk dengan nama yang sama sudah ada" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error updating product", error });
    }
  }
};

//DeleteProduct - onlyby Admin
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validasi ID Produk
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID produk tidak valid" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting produk" });
  }
};

//mendapatkan jumlah item produk
export const jumlahProduk = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah produk", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

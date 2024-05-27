import mongoose from "mongoose";
import Product from "../models/products.model.js";

//createProduct
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      category,
      brand,
      price,
      productType,
      imageProduct,
    } = req.body;

    //validasi input
    if (!name || !category || !brand || !price || !productType) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    //validasi field  productType
    const validProductTypes = Product.schema.path("productType").enumValues;
    if (!validProductTypes.includes(productType)) {
      return res.status(400).json({ message: "Jenis produk tidak valid" });
    }

    const newProduct = new Product({
      name,
      description,
      ingredients,
      category,
      brand,
      price,
      productType,
      imageProduct,
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

//UpdateProduct
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    // //validasi ID produk
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID produk tidak valid" });
    }

    //validasi productType (jika ada di updateData)
    if (updatedData.productType) {
      const validProductTypes = Product.schema.path("productType").enumValues;
      if (!validProductTypes.includes(updatedData.productType)) {
        return res.status(400).json({ message: "Jenis produk tidak valid" });
      }
    }

    // //Query Update
    // const updateQuery = { $set: updatedData };

    //Update Produk
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    // penanganan Error
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

//DeleteProduct
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

import Category from "../models/category.model.js";
import Service from "../models/services.model.js";

// controller untuk membuat kategori baru
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // membuat kategori baru
    const newCategory = new Category({ name });

    // menyimpan kategori baru
    const savedCategory = await newCategory.save();

    res
      .status(201)
      .json({ message: "Kategori berhasil dibuat", category: savedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating category", error });
  }
};

// mengambil semua kategori
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan mengambil data kategori" });
  }
};

// mengambil kategori berdasarkan id
export const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "gagal fetching data kategori", error });
  }
};

// updateCategory
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json({
      message: "Kategori berhasil diupdate",
      category: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "gagal fetching kategori" });
  }
};

// controller untuk delete kategori
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    // Hapus referensi kategori dari semua layanan yang terkait
    await Service.updateMany(
      { categories: categoryId },
      { $pull: { categories: categoryId } }
    );
    await category.deleteOne();

    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category", error });
  }
};

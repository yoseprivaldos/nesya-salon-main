import Category from "../models/category.model.js";

// controller untuk membuat kategori baru
export const createCategory = async (req, res) => {
  try {
    const { name, parent, subCategories } = req.body;

    // membuat kategori baru
    const newCategory = new Category({
      name,
      parent: parent || null,
    });

    // menyimpan kategori baru
    const savedCategory = await newCategory.save();

    //jika ada subCategoriees, tambahkan mereka
    if (subCategories && subCategories.length > 0) {
      const subCategoryObjects = subCategories.map((subCategory) => ({
        name: subCategory.name,
        parent: savedCategory._id,
      }));
      const createdSubCategories = await Category.insertMany(
        subCategoryObjects
      );

      //menyimpan referensi subCategories di parent category
      savedCategory.subCategories = createdSubCategories.map((sub) => sub._id);
      await savedCategory.save();
    }
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
    const categories = await Category.find().pupulate("subCategories");
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
    const category = await Category.findById(categoryId).populate(
      "subCategories"
    );

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "gagal fetching data kategori", error });
  }
};

// mengambil kategori berdasarkan parent
export const getCategoriesByParent = async (req, res) => {
  try {
    const { parentId } = req.params;
    const categories = await Category.find({ parent: parentId }).populate(
      "subCategories"
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// updateCategory
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, parent, subCategories } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    category.name = name || category.name;
    category.parent = parent || category.parent;

    if (subCategories && subCategories.length > 0) {
      category.subCategories = subCategories;
    }

    const updateCategory = await category.save();
    res
      .status(200)
      .json({
        message: "Kategori berhasil diupdate",
        category: updateCategory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "gagal fetching kategori" });
  }
};

// Controller untuk mengambil kategori utama (parent: null)
export const getMainCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null }).populate(
      "subCategories"
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching main categories", error });
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

    // Menghapus kategori beserta subkategori terkait
    await Category.deleteMany({ parent: categoryId });

    // menghapus kategori
    await category.deleteOne();

    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category", error });
  }
};

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
    res.status(201).json(savedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating category", error });
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

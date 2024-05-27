import Service from "../models/services.model.js";
import Category from "../models/category.model.js";

//create service
export const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      duration,
      price,
      imageService,
      active,
    } = req.body;

    // validasi keberadaan category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    // validasi keberadaan subcategory
    const subCategoryExists = categoryExists.subCategories.some(
      (subCat) => subCat.toString() === subCategory
    );
    if (!subCategoryExists) {
      return res
        .status(404)
        .json({ message: "Subkategori tidak ditemukan di kategori" });
    }

    // membuat instance service baru
    const newService = new Service({
      name,
      description,
      category,
      subCategory,
      duration,
      price,
      imageService,
      active,
    });

    // menyimpan service baru ke database
    await newService.save();
    res.status(201).json({ message: "Service berhasil dibuat" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saat create service", error });
  }
};

//getAllServices
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("category");
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan ketika menampilkan semua service" });
  }
};
//getService
export const getService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Temukan service dan populate category dan subCategory
    const service = await Service.findById(serviceId).populate({
      path: "category",
      select: "name subCategories",
      populate: {
        path: "subCategories",
        select: "name",
      },
    });

    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    // Temukan subkategori yang sesuai dalam kategori
    const subCategory = service.category.subCategories.find(
      (subCat) => subCat._id.toString() === service.subCategory.toString()
    );

    if (!subCategory) {
      return res
        .status(404)
        .json({ message: "Subkategori tidak ditemukan dalam kategori" });
    }

    // Format respon agar subCategory menampilkan namanya
    const response = {
      ...service.toObject(),
      category: service.category.name,
      subCategory: service.category.subCategories.find(
        (subCat) => subCat._id.toString() === service.subCategory.toString()
      ).name,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching service", error });
  }
};

//updateService
export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const updatedData = req.body;

    // validasi keberadaan kategori jika kategori yang diperbarui
    if (updatedData.category) {
      const categoryExists = await Category.findById(updatedData.category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
      }

      // validasi keberadaan subkategori dalam kategori jika subkategori diperharui
      if (updatedData.subCategory) {
        const subCategoryExists = categoryExists.subCategories.some(
          (subcat) => subcat.toString() === updatedData.subCategory
        );
        if (!subCategoryExists) {
          return res
            .status(404)
            .json({ message: "Subkategori tidak ditemukan di kategori" });
        }
      }
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      updatedData,
      { new: true }
    );

    if (!updateService) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating service", error });
  }
};
//deleteService
export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.status(200).json({ message: "layanan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};

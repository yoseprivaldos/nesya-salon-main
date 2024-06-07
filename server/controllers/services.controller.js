import Service from "../models/services.model.js";
import Reservation from "../models/reservation.model.js";
import Category from "../models/category.model.js";

//create service
export const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      categories,
      duration,
      price,
      imageService,
      isActive,
    } = req.body;

    // validasi data
    if (
      !name ||
      !duration ||
      !price ||
      !categories ||
      !Array.isArray(categories)
    ) {
      return res.status(400).json({
        message: "Nama, duration, price, and categories are required",
      });
    }

    // Cari semua kategori yang diberikan
    const foundCategories = await Category.find({
      _id: { $in: categories },
    });

    // Validasi apakah semua kategori ditemukan
    if (foundCategories.length !== categories.length) {
      return res
        .status(404)
        .json({ message: "Beberapa Kategori tidak ditemukan" });
    }

    // membuat instance service baru
    const newService = new Service({
      name,
      description,
      duration,
      price,
      imageService,
      isActive,
      categories, // Langsung simpan array of category IDs
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
    const services = await Service.find()
      .populate("category", "name")
      .populate("subCategory", "name");
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

    // Jika ada update categories, validasi dan update relasi langsung
    if (updatedData.categories) {
      // Validasi categories
      if (!Array.isArray(updatedData.categories)) {
        return res.status(400).json({ message: "Kategori harus berupa array" });
      }

      const foundCategories = await Category.find({
        _id: { $in: updatedData.categories },
      });

      if (foundCategories.length !== updatedData.categories.length) {
        return res.status(404).json({ message: "Some categories not found" });
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
    res.status(200).json(updatedService); // Langsung kembalikan service yang sudah diupdate
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
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }
    res.status(200).json({ message: "layanan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};

//soft delete -- deactiveService
export const deactivateService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    //Periksa apakah layanan ada
    const service = await Service.findById(serviceid);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    //periksa apakah ada reservasi yang belum selesai untuk layanan ini
    const existingReservations = await Reservation.find({
      services: serviceId,
      status: { $nin: ["completed", "canceled"] },
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({
        message:
          "Layanan tidak dapat dinonaktifkan karena masih terkait dengan reservasi yang belum selesai.",
      });
    }
    // Update field isActive menjadi false
    service.isActive = false;
    await service.save();

    res.status(200).json({ message: "Layanan berhasil dinonaktifkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menonaktifkan layanan" });
  }
};

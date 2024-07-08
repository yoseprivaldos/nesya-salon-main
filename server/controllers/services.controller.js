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
      categories,
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
    const services = await Service.find().populate("categories", "name");
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

    const service = await Service.findById(serviceId).populate(
      "categories",
      "name"
    );

    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    // Tidak perlu mencari subCategory karena tidak ada di skema
    const response = {
      ...service.toObject(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching service", error });
  }
};

export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const updatedData = req.body;

    // Validasi unik untuk nama layanan
    if (updatedData.name) {
      const existingService = await Service.findOne({ name: updatedData.name });
      if (existingService && existingService._id.toString() !== serviceId) {
        return res
          .status(400)
          .json({ message: "Nama layanan sudah terdaftar" });
      }
    }

    // Validasi dan update untuk categories
    if (updatedData.categories) {
      // Validasi categories sebagai array
      if (!Array.isArray(updatedData.categories)) {
        return res.status(400).json({ message: "Kategori harus berupa array" });
      }

      // Pastikan kategori yang diberikan valid
      const validCategories = await Category.find({
        _id: { $in: updatedData.categories },
      });
      if (validCategories.length !== updatedData.categories.length) {
        return res
          .status(404)
          .json({ message: "Beberapa kategori tidak ditemukan" });
      }

      updatedData.categories = validCategories.map((cat) => cat._id); // Update categories dalam updatedData
    }

    // Perbarui layanan menggunakan findByIdAndUpdate
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      updatedData,
      {
        new: true, // Mengembalikan dokumen yang baru diperbarui
        runValidators: true, // Menjalankan validasi pada dokumen yang diperbarui
      }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Tangani kesalahan validasi dari Mongoose
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res
        .status(400)
        .json({ message: "Validation Error", errors: validationErrors });
    }

    console.error(error);
    res.status(500).json({ message: "Error updating service", error });
  }
};

//deleteService
export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Periksa apakah layanan ada
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    // Periksa apakah ada reservasi yang belum selesai
    const existingReservations = await Reservation.find({
      services: serviceId,
      status: { $nin: ["completed", "canceled"] },
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({
        message:
          "Layanan tidak dapat dihapus karena masih terkait dengan reservasi yang belum selesai.",
      });
    }

    // Hapus layanan jika tidak ada reservasi yang belum selesai
    await Service.findByIdAndDelete(serviceId);

    res.status(200).json({ message: "Layanan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};

//soft delete -- deactivateService
export const deactivateService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Periksa apakah layanan ada
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    // Periksa apakah ada reservasi yang belum selesai untuk layanan ini
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
    res.status(500).json({ message: "Gagal menonaktifkan layanan", error });
  }
};

//mendapatkan jumlah item service
export const jumlahService = async (req, res) => {
  try {
    const count = await Service.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah layanan", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// mendapatkan nilai numberOfViews dari suatu layanan berdasarkan id
export const getNumberOfViewsById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId).select("numberOfViews"); // Hanya ambil numberOfViews

    if (!service) {
      return res.status(404).json({ error: "Layanan tidak ditemukan" });
    }

    res.json({ numberOfViews: service.numberOfViews });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data layanan" });
  }
};

export const updateNumberOfViewsService = async (req, res) => {
  try {
    const serviceIds = req.body;

    // Meningkatkan numberOfViews untuk setiap serviceId
    const updatePromises = serviceIds.map(async (serviceId) => {
      return Service.findByIdAndUpdate(
        serviceId,
        { $inc: { numberOfViews: 1 } },
        { new: true, useFindAndModify: false }
      );
    });
    const updatedServices = await Promise.all(updatePromises);
    res.status(200).json({
      message: "Berhasil memperbarui numberOfViews.",
      updatedServices,
    });
  } catch (error) {
    console.error("Error updating numberOfViews:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui numberOfViews." });
  }
};

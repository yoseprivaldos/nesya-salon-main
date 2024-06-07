import mongoose from "mongoose";
import Category from "./category.model.js";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama layanan harus ada"],
      unique: [true, "layanan sudah terdaftar"],
    },
    description: {
      type: String,
      default: "",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    duration: {
      type: Number,
      required: [true, "durasi layanan wajib ada"],
      min: [0, "durasi layanan tidak boleh kurang dari 0"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "harga layanan tidak boleh kurang dari 0"],
    },
    imageService: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "rating tidak boleh kurang dari 0"],
      max: [5, "rating tidak boleh lebih dari 5"],
    },
  },
  { timestamps: true }
);
//memastikan categories tidak bernilai null jika terjadi penghapusan category di tabel categories
serviceSchema.pre("save", async function (next) {
  if (this.categories.length === 0) {
    const defaultCategory = await Category.findOne({ name: "Lainnya" });
    if (defaultCategory) {
      this.categories.push(defaultCategory._id);
    }
  }
  next();
});

// memastikan service tidak dapat dihapus ketika terkait dengan reservasi aktif
serviceSchema.pre("remove", async function (next) {
  const existingReservations = await Reservation.find({
    services: this._id,
    status: { $nin: ["completed", "canceled"] },
  });

  if (existingReservations.length > 0) {
    throw new Error(
      "Layanan tidak dapat dihapus karena masih terkait dengan reservasi yang belum selesai"
    );
  } else {
    const newDefaultCategory = new Category({ name: "Lainnya" });
    await newDefaultCategory.save();
    this.categories.push(newDefaultCategory._id);
  }
  next();
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;

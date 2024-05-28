import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama pegawai harus ada"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    addresses: {
      type: String,
      default: "",
    },
    imageProfile: {
      type: String,
      default: "",
    },
    startWorking: {
      type: Date,
      default: Date.now,
    },
    availability: [
      {
        day: {
          type: String,
          required: [true, "Hari ketersediaan harus ada"],
        },
        startTime: {
          type: String,
          required: [true, "Waktu mulai harus ada"],
        },
        endTime: {
          type: String,
          required: [true, "Waktu  selesai harus ada"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

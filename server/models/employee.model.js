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
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} bukan format email yang valid!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v); // Format nomor telepon 10-15 digit
        },
        message: (props) =>
          `${props.value} bukan format nomor telepon yang valid!`,
      },
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
          enum: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
          required: [true, "Hari ketersediaan harus ada"],
        },
        startTime: {
          type: String,
          required: [true, "Waktu mulai harus ada"],
          validate: {
            validator: function (v) {
              return /\d{2}:\d{2}/.test(v); // Format HH:MM
            },
            message: (props) => `${props.value} bukan format waktu yang valid!`,
          },
        },
        endTime: {
          type: String,
          required: [true, "Waktu selesai harus ada"],
          validate: {
            validator: function (v) {
              return /\d{2}:\d{2}/.test(v); // Format HH:MM
            },
            message: (props) => `${props.value} bukan format waktu yang valid!`,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

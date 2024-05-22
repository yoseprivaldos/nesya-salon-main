const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  noTelepon: {
    type: String,
    required: true,
  },
  imageProfil: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

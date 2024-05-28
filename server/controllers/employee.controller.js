import Employee from "../models/employee.model.js";

//createEmployee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, addresses, imageProfile, availability } =
      req.body;

    // validasi input dari body request
    if (!name || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Nama, email, dan nomor telepon harus diisi" });
    }

    // validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    // validasi nomor telepon
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Format nomor tidak valid" });
    }

    // validasi email apakah sudah terdaftar
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // buat objek employee baru
    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      addresses,
      imageProfile,
      availability,
    });

    // simpan employee ke database
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "gagal fetching employee" });
  }
};

//getAllEmployees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Gagal Fetching Employee", error });
  }
};

//getEmployeeById
export const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log(req.params);
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "staff tidak ditemukan" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal Fetching Employee", error });
  }
};

//updateEmployee
export const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Staff tidak ditemukan" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

//addAvailability
export const addAvailability = async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log(req.params);
    const { day, startTime, endTime } = req.body;

    //validasi input dari body request
    if (!day || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "Hari, waktu mulai, dan waktu selsai harus diisi" });
    }

    // mencari pegawai berdasarkan ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "pegawai tidak ditemukan" });
    }

    //menambahkan data availibility baru ke array abailibility yang sudah ada
    employee.availability.push({ day, startTime, endTime });

    //menyimpan perubahan pada pegawai
    const updatedEmployee = await employee.save();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error fetching employee" });
  }
};

//deleteEmployee
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Staff tidak ditemukan" });
    }

    res.status(200).json({ message: "Staff berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal fetching Employee" });
  }
};

import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Header from "../../components/dashboard/Header";
import {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../redux/api/api.js";

const EmployeePage = () => {
  const { data: employees = [] } = useGetAllEmployeesQuery();
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();
  const [deleteEmployeeMutation] = useDeleteEmployeeMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    addresses: "",
    imageProfile: "",
    startWorking: "",
    availability: [
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 1) {
      setForm({ ...form, [name]: value });
    } else {
      const index = parseInt(nameParts[1]);
      const key = nameParts[2];
      const newAvailability = [...form.availability];
      newAvailability[index][key] = value;
      setForm({ ...form, availability: newAvailability });
    }
  };

  const handleAddAvailability = () => {
    setForm({
      ...form,
      availability: [
        ...form.availability,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const handleRemoveAvailability = (index) => {
    const newAvailability = form.availability.filter((_, i) => i !== index);
    setForm({ ...form, availability: newAvailability });
  };

  const handleAddEmployee = async () => {
    try {
      await createEmployeeMutation(form);
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        addresses: "",
        imageProfile: "",

        availability: [
          {
            day: "",
            startTime: "",
            endTime: "",
          },
        ],
      });
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setForm(employee);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployeeMutation(employeeId);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await updateEmployeeMutation({ employeeId: form._id, ...form });
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        addresses: "",
        imageProfile: "",
        availability: [
          {
            day: "",
            startTime: "",
            endTime: "",
          },
        ],
      });
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const daysOfWeek = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  const timeOptions = [];
  for (let hour = 9; hour <= 18; hour++) {
    const timeString = `${hour < 10 ? `0${hour}` : hour}:00`;
    timeOptions.push(timeString);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="HALAMAN STAFF" />
      <Grid container spacing={3} mt={0.5}>
        {/* bagian daftar karyawan */}
        <Grid item xs={12} backgroundColor="primary.main" ml={3} pr={3} pb={2}>
          <Typography variant="h4" mb={3} mt={1}>
            Daftar Staff
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "background.alt",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Nama
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Nomor Hp
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Alamat
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Mulai Bekerja
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Jadwal Mingguan
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "primary.main" }}>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phoneNumber}</TableCell>
                    <TableCell>{employee.addresses}</TableCell>
                    <TableCell>{employee.startWorking}</TableCell>
                    <TableCell>
                      {employee.availability.map((avail, index) => (
                        <div key={index}>
                          {avail.day} ({avail.startTime} - {avail.endTime})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteEmployee(employee._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* bagian input field add atau tambah karyawan */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 2,
              paddingLeft: 3,
              paddingRight: 3,
              backgroundColor: "primary.main",
            }}
          >
            <Typography variant="h4" mb={3} mt={1}>
              Manajemen Staff
            </Typography>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nama"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: "background.alt" }}
                />
              </Grid>
              {/* alamat */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Alamat"
                  name="addresses"
                  value={form.addresses}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: "background.alt" }}
                />
              </Grid>
              {/* phone number */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nomor HP"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: "background.alt" }}
                />
              </Grid>
              {/* email */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: "background.alt" }}
                />
              </Grid>
              {/* Button tambah jadwal karyawan */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "background.alt",
                  }}
                  onClick={handleAddAvailability}
                >
                  Tambah Jadwal Staff
                </Button>
              </Grid>
              {/* availability */}
              {form.availability.map((avail, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  pl={2}
                  mt={1}
                  alignItems="center"
                >
                  <Grid item xs={12} md={3.6}>
                    <FormControl
                      fullWidth
                      sx={{ backgroundColor: "background.alt" }}
                    >
                      <InputLabel>Pilih Hari</InputLabel>
                      <Select
                        name={`availability.${index}.day`}
                        value={avail.day}
                        onChange={handleInputChange}
                      >
                        {daysOfWeek.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3.6}>
                    <FormControl
                      fullWidth
                      sx={{ backgroundColor: "background.alt" }}
                    >
                      <InputLabel>Jam Mulai Kerja</InputLabel>
                      <Select
                        name={`availability.${index}.startTime`}
                        value={avail.startTime}
                        onChange={handleInputChange}
                      >
                        {timeOptions.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3.6}>
                    <FormControl
                      fullWidth
                      sx={{ backgroundColor: "background.alt" }}
                    >
                      <InputLabel>Jam Pulang Kerja</InputLabel>
                      <Select
                        name={`availability.${index}.endTime`}
                        value={avail.endTime}
                        onChange={handleInputChange}
                      >
                        {timeOptions.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1.2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      height="100%"
                      onClick={() => handleRemoveAvailability(index)}
                    >
                      Hapus
                    </Button>
                  </Grid>
                </Grid>
              ))}

              {/* submit button */}
              <Grid item xs={12} mb={1}>
                <Button
                  variant="contained"
                  onClick={form._id ? handleUpdateEmployee : handleAddEmployee}
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "background.alt",
                  }}
                >
                  {form._id ? "Update Staff" : "Tambah Staff"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeePage;

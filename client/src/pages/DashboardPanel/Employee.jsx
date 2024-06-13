import { useState } from "react";
import {
  Container,
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    {
      id: "1324w32143251235",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "123456789",
      addresses: "123 Main St",
      imageProfile: "",
      startWorking: "2021-01-01",
      availability: [
        {
          day: "Monday",
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
  ]);

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
    setForm({ ...form, [name]: value });
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, { ...form, id: uuidv4() }]);
    setForm({
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
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setForm(employee);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleUpdateEmployee = () => {
    setEmployees(employees.map((emp) => (emp.id === form.id ? form : emp)));
    setForm({
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
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <h2>Employee Management</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Addresses"
                  name="addresses"
                  value={form.addresses}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Working"
                  name="startWorking"
                  type="date"
                  value={form.startWorking}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Day of Availability"
                  name="availability[0].day"
                  value={form.availability[0].day}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Start Time"
                  name="availability[0].startTime"
                  value={form.availability[0].startTime}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="End Time"
                  name="availability[0].endTime"
                  value={form.availability[0].endTime}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={form.id ? handleUpdateEmployee : handleAddEmployee}
                >
                  {form.id ? "Update Employee" : "Add Employee"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Addresses</TableCell>
                  <TableCell>Start Working</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
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
                        onClick={() => handleEditEmployee(employee.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteEmployee(employee.id)}
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
      </Grid>
    </Container>
  );
};

export default EmployeePage;

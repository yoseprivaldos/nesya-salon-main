import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/dashboard/Header";

const Employee = () => {
  // Contoh data karyawan salon (ganti dengan data Anda yang sebenarnya)
  const employeeData = [
    {
      id: 1,
      name: "Ayudia",
      email: "ayudia@gmail.com",
      specialty: "Potongan Rambut Wanita",
    },
    {
      id: 2,
      name: "Rendy",
      email: "rendyy@gmail.com",
      specialty: "Nail Art",
    },
    {
      id: 3,
      name: "Cindy",
      email: "cindy@gmail.com",
      specialty: "Perawatan Wajah",
    },
    // ... tambahkan data karyawan salon lainnya
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Karyawan" subtitle="Daftar Karyawan Salon" />

      {/* Tabel Daftar Karyawan Salon */}
      <Box mt="40px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Spesialisasi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.specialty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Employee;

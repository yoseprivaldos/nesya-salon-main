import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/dashboard/Header";
import {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from "../../redux/api/api.js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { data: adminData, error, isLoading, refetch } = useGetAllAdminQuery();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  // Refetch data secara manual (misalnya, setelah melakukan perubahan data)
  useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  const handleDeleteAdmin = async (_id) => {
    const { data, error } = await deleteAdmin(_id);
    if (data) {
      console.log(data);
    } else if (error) {
      console.error(error);
    }
    refetch();
  };

  const handleAddAdmin = async () => {
    const newAdmin = {
      username: name,
      email,
      password,
      role: "admin",
    };

    try {
      await createAdmin(newAdmin).unwrap();
      setName("");
      setEmail("");
      setPassword("");

      //memperbarui data dengan mengambil ulang dari API
      refetch();
    } catch (error) {
      console.error("Failed to create admin:", error);
    }
  };

  const handleEditAdmin = (_id) => {
    const adminToEdit = adminData.find((admin) => admin._id === _id);
    if (adminToEdit) {
      setCurrentId(_id);
      setEditMode(true);
      setEditName(adminToEdit.username);
      setEditEmail(adminToEdit.email);
      // ... set nilai lainnya jika diperlukan
    }
  };

  const handleUpdateAdmin = async () => {
    const editedAdmin = {
      username: editName,
      email: editEmail,
      password: editPassword,
    };

    try {
      const { data, error } = await updateAdmin({
        currentId,
        ...editedAdmin,
      });

      if (data) {
        setEditMode(false);
        setCurrentId(null);
        setEditName("");
        setEditEmail("");
        setEditPassword("");
        refetch(); // Refresh data setelah update
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Halaman Admin" />
      <Box mt={3}>
        <Typography variant="h6">Daftar Admin</Typography>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Failed to load admin data</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminData.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                    <TableCell align="center">
                      <Button
                        disabled={
                          row.role === "superadmin" ||
                          currentUser.role === "admin"
                        }
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteAdmin(row._id)}
                      >
                        Hapus
                      </Button>
                      <Button
                        disabled={currentUser.role !== "superadmin"}
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditAdmin(row._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Tambah Admin</Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddAdmin}>
            Tambah
          </Button>
        </Box>
      </Box>

      {editMode && (
        <Box mt={3}>
          <Typography variant="h6">Edit Admin</Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Nama"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateAdmin}
            >
              Update
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminPage;

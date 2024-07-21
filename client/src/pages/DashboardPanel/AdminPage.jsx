/* eslint-disable no-unused-vars */
import React from "react";
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
      <Header title="HALAMAN ADMIN" />
      <Box mt={3}>
        <Typography
          variant="h6"
          backgroundColor="primary.main"
          padding={3}
          paddingLeft={1.5}
          color="secondary.main"
          fontWeight="bold"
        >
          DAFTAR ADMIN
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Failed to load admin data</Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "primary.main" }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{ bgcolor: "background.alt", color: "secondary.main" }}
              >
                <TableRow>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "bold" }}
                  >
                    NAMA
                  </TableCell>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "bold" }}
                  >
                    EMAIL
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "secondary.main", fontWeight: "bold" }}
                  >
                    STATUS
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "secondary.main", fontWeight: "bold" }}
                  >
                    AKSI
                  </TableCell>
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

      <Box mt={3} backgroundColor="primary.main" padding={3} paddingLeft={1.5}>
        <Typography
          variant="h6"
          sx={{ color: "secondary.main", fontWeight: "bold" }}
        >
          TAMBAH ADMIN
        </Typography>
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
            sx={{ backgroundColor: "background.alt" }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ backgroundColor: "background.alt" }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ backgroundColor: "background.alt" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAdmin}
            sx={{ backgroundColor: "background.alt" }}
          >
            Tambah
          </Button>
        </Box>
      </Box>

      {editMode && (
        <Box
          mt={3}
          backgroundColor="primary.main"
          padding={3}
          paddingLeft={1.5}
        >
          <Typography
            variant="h6"
            sx={{ color: "secondary.main", fontWeight: "bold" }}
          >
            EDIT ADMIN
          </Typography>
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
              sx={{ backgroundColor: "background.alt" }}
            />
            <TextField
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "background.alt" }}
            />
            <TextField
              label="Password"
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "background.alt" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateAdmin}
              sx={{ backgroundColor: "background.alt" }}
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

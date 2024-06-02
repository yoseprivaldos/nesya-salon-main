import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

import User1 from "../../assets/user-01.png";

const productData = [
  {
    image: User1,
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: User1,
    name: "Macbook Pro M1",
    category: "Electronics",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: User1,
    name: "Dell Inspiron 15",
    category: "Electronics",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: User1,
    name: "HP Probook 450",
    category: "Electronics",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div style={{ padding: "16px 24px" }}>
        <Typography variant="h6" component="h2">
          Daftar Karyawan
        </Typography>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
              Product Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sold</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row" colSpan={3}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      alt={product.name}
                      src={product.image}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{product.name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                {product.category}
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.sold}</TableCell>
              <TableCell>${product.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTwo;

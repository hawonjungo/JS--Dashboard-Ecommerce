import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { BACKEND_API_URL } from "../../helpers/variables";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { FiShoppingCart } from "react-icons/fi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductTable({
  products,
  updateProduct,
  deleteProduct,
  addToCart,
}) {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Quantity</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell align="left" style={{ width: "10%" }}>
                <img
                  src={`${BACKEND_API_URL}/${item.img}`}
                  alt=""
                  className="productsTable__description__details__image"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.title}
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>{item.desc}</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__quantity">
                  {item.quantity}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__price">
                  <span>$</span>
                  {item.price}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div className="productsTable__description__size">
                  <p>{item.category}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                {admin && (
                  <>
                    <Button
                      className="productsTable__description__removeButton"
                      variant="contained"
                      color="error"
                      onClick={() => deleteProduct(item)}
                      style={{ backgroundColor: "red", marginRight: "10px" }}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                    <Button
                      className="productsTable__description__removeButton"
                      variant="contained"
                      color="error"
                      onClick={() => updateProduct(item)}
                      style={{ backgroundColor: "blue" }}
                    >
                      <EditIcon />
                    </Button>
                  </>
                )}
                {user && (
                  <Button
                    className="productsTable__description__removeButton"
                    variant="contained"
                    color="error"
                    onClick={() => addToCart(item)}
                    style={{ backgroundColor: "blue" }}
                  >
                    <FiShoppingCart />
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

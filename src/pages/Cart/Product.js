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

export default function Product({ product, setProduct }) {
  const removeItem = (item) => {
    let filteredCart = product.filter((it) => it._id !== item._id);
    setProduct([...filteredCart]);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Product</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Quantity</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell align="left" style={{ width: "10%" }}>
                <img
                  src={`${BACKEND_API_URL}/${item.img}`}
                  alt=""
                  className="productsTable__description__details__image"
                />
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>{item.desc}</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__quantity">1</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__category">
                  {item.category}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__price">
                  {item.price}
                  <span>$</span>
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  className="productsTable__description__removeButton"
                  variant="contained"
                  color="error"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

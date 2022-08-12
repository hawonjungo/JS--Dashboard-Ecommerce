import React, { useState, useEffect, useCallback } from "react";
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
import PageWrapper from "../../components/PageWrapper";
import { Grid } from "@mui/material";
import useProduct from "../../hooks/useProduct";
import { useLocation } from "react-router-dom";
import useOrder from "../../hooks/useOrder";

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

export default function OrderProduct() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [basketProduct, setbasketProduct] = useState();
  const { getAllProducts } = useProduct();
  const { getOrderById } = useOrder();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let splittedData = location.pathname.split("/");
    let _order = splittedData[splittedData.length - 1];
    let { basket } = await getOrderById(_order);
    setOrderProduct([...basket]);
  };

  const filterProduct = (id) => {
    return basketProduct.find((product) => product._id === id);
  };

  const orderItem = useCallback(() => {
    if (orderProduct.length === 0) {
      const items = [];
      product.map((item) => items.push(filterProduct(item._id)));
      setOrderProduct([...items]);
    }
    debugger;
  }, [product, setProduct]);

  return (
    <PageWrapper>
      <Grid className="productsTable">
        <h2> Order Products </h2>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {orderProduct.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="left" style={{ width: "10%" }}>
                    <img
                      src={`${BACKEND_API_URL}/${item?._id?.img}`}
                      alt=""
                      className="productsTable__description__details__image"
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item?._id?.title}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <p>{item?._id?.desc}</p>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <p className="productsTable__description__quantity">1</p>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <p className="productsTable__description__price">
                      <span>$</span>
                      {item?._id?.price}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="productsTable__description__size">
                      <p>{item?._id?.category}</p>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </PageWrapper>
  );
}

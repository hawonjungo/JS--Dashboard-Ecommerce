import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import useOrder from "../../hooks/useOrder";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BACKEND_API_URL } from "../../helpers/variables";
import { useNavigate } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import useProduct from "../../hooks/useProduct";

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

export default function OrdersTables({ orders, setOrders }) {
  const { getOrders, updateOrder } = useOrder();
  const navigate = useNavigate();
  const { updateProductQuantity } = useProduct();
  const admin = JSON.parse(localStorage.getItem("admin"));
  React.useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const { orders } = await getOrders();
    setOrders([...orders]);
  };

  const productDetails = (basket) => {
    navigate(`/orderProduct/${basket._id}`);
  };
  const updateQuantity = async (id) => {
    await updateProductQuantity(id);
  };
  const handleStatusUpdate = async (event, order) => {
    if (event.target.value === "Delivered") {
      debugger;
      order.basket.map((item) => updateQuantity(item._id));
    }
    const { response } = await updateOrder({
      ...order,
      status: event.target.value,
    });

    if (response) {
      console.log(response);
      const index = orders.findIndex((item) => item._id === order._id);
      console.log(index);
      orders[index].status = response.status;
      setOrders([...orders]);
    }
  };
  const deleteOrder = async (order) => {
    try {
      await axios.delete(`${BACKEND_API_URL}/customer/order/${order._id}`);
      const ordersList = orders.filter((item) => item._id !== order._id);
      setOrders(ordersList);
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Contact Information</StyledTableCell>
            <StyledTableCell align="left">Adress</StyledTableCell>
            <StyledTableCell align="left">Total Price</StyledTableCell>
            {admin && <StyledTableCell align="left">Status</StyledTableCell>}
            <StyledTableCell align="left">Product Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell align="left">
                <p>{item.name}</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__quantity">
                  {item.contact}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__price">
                  {item.address}
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="productsTable__description__price">
                  {item.totalPrice}
                </p>
              </StyledTableCell>
              {admin && (
                <StyledTableCell>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.status}
                      label="Status"
                      onChange={(e) => handleStatusUpdate(e, item)}
                    >
                      <MenuItem value={"Processed"}>Processed</MenuItem>
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                      <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
              )}
              <StyledTableCell align="left">
                <Button
                  className="productsTable__description__removeButton"
                  variant="contained"
                  color="error"
                  onClick={() => productDetails(item)}
                  style={{ backgroundColor: "red", marginRight: "10px" }}
                >
                  <ProductionQuantityLimitsIcon />
                </Button>
                {admin && (
                  <Button
                    className="productsTable__description__removeButton"
                    variant="contained"
                    color="error"
                    onClick={() => deleteOrder(item)}
                    style={{ backgroundColor: "red", marginRight: "10px" }}
                  >
                    <DeleteOutlineIcon />
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

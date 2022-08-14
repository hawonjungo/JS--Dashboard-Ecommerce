import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import useOrder from "../../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";

const ConfirmModal = ({ open, setOpen, product, setProduct, totalPrice }) => {
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const [user, setUser] = useState({
    name: "",
    contact: "",
    address: "",
    status: "Processed",
    totalPrice: totalPrice,
  });

  const { updateProduct } = useProduct();
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((pS) => {
      return {
        ...pS,
        [name]: value,
      };
    });
  };

  const updateQuantity = async (item) => {
    const quantity = item.quantity - 1;
    const { updatedProduct } = await updateProduct({
      ...item,
      quantity: quantity,
    });
  };

  const placeOrder = async () => {
    let basket = product.map((item) => {
      //updateQuantity(item);
      return { _id: item._id, qty: 1 };
    });
    const { order } = await createOrder(user, basket);
    if (order) {
      setProduct([]);
      alert("Order placed successfully!");
      navigate("/");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h3>Order Confirmation</h3>
        <TextField
          id="outlined-basic1"
          label="Name"
          variant="outlined"
          name="name"
          type="text"
          sx={{ width: "100%" }}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic1"
          label="Contact"
          variant="outlined"
          name="contact"
          type="text"
          sx={{ width: "100%", mt: 2 }}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic1"
          label="Address"
          variant="outlined"
          name="address"
          type="text"
          sx={{ width: "100%", mt: 2 }}
          multiline
          rows={4}
          maxRows={4}
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={placeOrder}>
          Place order
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  //   pt: 2,
  px: 4,
  pb: 3,
};

export default ConfirmModal;

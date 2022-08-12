import React, { useContext, useState } from "react";
import { Grid, Button } from "@mui/material";
import ConfirmModal from "./ConfirmModal";

function Subtotal({ product, setProduct }) {
  const [open, setOpen] = useState(false);
  const totalPrice = product.reduce((acc, cur) => acc + cur.price, 0);
  const openConfirmModal = () => {
    if (product.length < 1) return alert("Please add some item in the cart!");
    setOpen(true);
  };

  return (
    <Grid className="subtotal">
      <p>
        Subtotal
        <span> ({product.length} items)</span>
        <strong>
          <span> $</span>
          <span>{totalPrice}</span>
        </strong>
      </p>
      <Button variant="contained" onClick={openConfirmModal}>
        Confirm Order
      </Button>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        product={product}
        setProduct={setProduct}
        totalPrice={totalPrice}
      />
    </Grid>
  );
}

export default Subtotal;

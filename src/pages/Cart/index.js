import React, { useState } from "react";
import { Grid } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import Subtotal from "./Subtotal";
import Product from "./Product";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState(state.items);

  return (
    <PageWrapper>
      <Grid
        sx={{
          marginTop: "4rem",
          marginRight: "2rem",
          marginLeft: "2rem",
          marginBottom: "5rem",
        }}
      >
        <div className="cart">
          <div className="cart__image">
            <img src={require("../../assets/cart.jpg")} alt="" />
            <Subtotal
              className="cart__subtotal"
              product={product}
              setProduct={setProduct}
            />
          </div>
        </div>
        <div className="cart__shoppingDetails">
          <p>
            Hello, <span>User</span>
          </p>
          <h1>Your Shopping Basket</h1>
        </div>
        <Product product={product} setProduct={setProduct} />
      </Grid>
    </PageWrapper>
  );
};

export default Cart;

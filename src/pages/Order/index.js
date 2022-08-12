import React, { useState } from "react";

import OrdersTables from "./Table";
import PageWrapper from "../../components/PageWrapper";
import { Grid } from "@mui/material";
const Order = () => {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = useState([]);

  return (
    <PageWrapper>
      <Grid className='productsTable'>
        <h2> Orders </h2>
        <OrdersTables orders={orders} setOrders={setOrders} />
      </Grid>
    </PageWrapper>
  );
};

export default Order;

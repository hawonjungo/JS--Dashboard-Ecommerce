import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import useAuthenticate from "../../../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { adminLogin } = useAuthenticate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email && user.password) {
      const { userObject } = await adminLogin(user);
      localStorage.setItem("admin", JSON.stringify(userObject));
      redirectToHome();
    }
  }

  const redirectToHome = () => {
    let admin = JSON.parse(localStorage.getItem("admin"));

    if (admin && admin.token) {
      navigate("/");
    }
  };

  return (
    <Grid container spacing={1}>
      {redirectToHome()}

      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ mt: 25 }}
      >
        <Grid item>
          <CardMedia
            component="img"
            image={require("../../../assets/ecommerce.png")}
            alt="green iguana"
            sx={{ width: "25ch" }}
          />
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <Typography gutterBottom variant="h4" component="div">
            Admin Login
          </Typography>
        </Grid>

        <Grid item>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mb: 2 },
            }}
            onSubmit={(e) => handleSubmit(e)}
            validate
            autoComplete="off"
          >
            <Grid item>
              <TextField
                type="email"
                name="email"
                label="Email"
                id=""
                sx={{ width: "40ch" }}
                onChange={(e) => handleChange(e)}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                label="Password"
                type="password"
                id=""
                sx={{ width: "40ch" }}
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", fontWeight: "bold" }}
              color="error"
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;

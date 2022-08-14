import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../../hooks/useAuthenticate";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminSignUp = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { adminRegister } = useAuthenticate();
  const { authenticate, setAuthenticate } = useStateContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setAdmin((admin) => ({ ...admin, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (admin.password.length < 5)
      return alert("Password must be atleast 5 characters long!");

    if (admin.email && admin.password) {
      const { adminObject } = await adminRegister(admin);
      if (!adminObject) return;
      localStorage.setItem("admin", JSON.stringify(adminObject));
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
        sx={{ mt: 5 }}
      >
        <Grid item sx={{ mt: 3 }}>
          <Typography gutterBottom variant="h4" component="div">
            Admin Sign Up
          </Typography>
        </Grid>
        <Grid item sx={{ m: 3 }}>
          <span>Already have an account? </span>
          <Link
            href="/adminLogin"
            underline="hover"
            sx={{ color: "red", fontWeight: "bold" }}
          >
            AdminLogIn
          </Link>
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
                type="password"
                name="password"
                label="Password"
                id=""
                sx={{ width: "40ch" }}
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "100%", fontWeight: "bold" }}
                color="error"
              >
                Sign Up
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminSignUp;

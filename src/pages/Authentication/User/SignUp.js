import React, { useState, useEffect } from "react";
import "./index.css";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../../hooks/useAuthenticate";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const { register } = useAuthenticate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.password_confirmation.length < 5 || user.password.length < 5)
      return alert("Password must be atleast 5 characters long!");

    if (
      user.email &&
      user.username &&
      user.password &&
      user.password_confirmation
    ) {
      const { userObject } = await register(user);
      if (!userObject) return;
      localStorage.set({
        token: userObject.token,
        username: userObject.username,
        email: userObject.email,
      });
      redirectToHome();
    }
  }

  const redirectToHome = () => {
    let token = localStorage.getItem("token");
    if (token) {
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
            Sign Up
          </Typography>
        </Grid>
        <Grid item sx={{ m: 3 }}>
          <span>Already have an account? </span>
          <Link
            href="/signIn"
            underline="hover"
            sx={{ color: "red", fontWeight: "bold" }}
          >
            SignIn
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
                required
                name="username"
                label="User Name"
                id=""
                sx={{ width: "40ch" }}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
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
              <TextField
                type="password"
                name="password_confirmation"
                label="Password Confirmation"
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

export default SignUp;

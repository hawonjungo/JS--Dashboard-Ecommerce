import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../../hooks/useAuthenticate";
import { useStateContext } from "../../../contexts/ContextProvider";
const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuthenticate();
  const { authenticate, setAuthenticate } = useStateContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email && user.password) {
      const { userObject } = await login(user);
      localStorage.setItem("user", JSON.stringify(userObject));
      setAuthenticate(true);
      redirectToHome();
    }
  }

  const redirectToHome = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (authenticate && user && user.token) {
      navigate("/");
    }
  };

  const evaluateCords = () => {
    alert("executed!");
    console.log(window.screen.width);
  };

  return (
    <Grid container spacing={1} onResize={evaluateCords}>
      {redirectToHome()}

      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ mt: 20 }}
      >
        <Grid item sx={{ mt: 3 }}>
          <Typography gutterBottom variant="h4" component="div">
            Login
          </Typography>
        </Grid>

        <Grid item sx={{ m: 3 }}>
          <span>New to Shopping? </span>
          <Link
            href="/signUp"
            underline="hover"
            sx={{ color: "red", fontWeight: "bold" }}
          >
            SignUp
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

export default SignIn;

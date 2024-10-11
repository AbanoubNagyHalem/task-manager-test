/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dummyCredentials = [{ email: "a@a.com", password: "123" }];

  const handleLogin = () => {
    const validUser = dummyCredentials.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2, width: 500 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2, width: 500 }}
      />
      <Button
        variant="contained"
        sx={{ width: 500, mt: 4, py: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;

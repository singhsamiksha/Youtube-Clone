import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Container, FormControlLabel, Checkbox, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Signin() {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange2(e){
    setPassword(e.target.value);
    setError(""); 
  }

  function handleNext2(){
    if (password.trim() === '') {
      setError("Please enter the Password.");
      return;
    }
  }

  function handleChange(e) {
    setUsername(e.target.value);
    setError(""); 
  }

  function handleNext() {
    if (username.trim() === '') {
      setError("Please enter the Email or Username.");
      return;
    }
    setPage(2);
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "solid 1px #D3D3D3",
        padding: "70px",
        marginTop: "60px",
        borderRadius: "10px"
      }}
    >
      <GoogleIcon sx={{ fontSize: 50, color: "#4285F4" }} />
      {page === 1 ? (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            to continue to YouTube
          </Typography>
          <Box sx={{ width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              fullWidth
              type="email"
              label="Email or Username"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={username}
              required
            />
            <Link href="#" variant="body2" sx={{ display: "block", textAlign: "right", mb: 2 }}>
              Forgot email?
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Not your computer? Use a private browsing window to sign in.
              <Link href="#" variant="body2"> Learn more</Link>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="#" variant="body2">Create account</Link>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            Welcome
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {username}
          </Typography>
          <Box sx={{ width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange2}
              required
            />
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
              label="Show Password"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="#" variant="body2">Try another way</Link>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handleNext2}>
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Signin;

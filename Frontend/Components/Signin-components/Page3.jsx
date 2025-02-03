import React from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

function Page3({ error, username, email, setUsername, setEmail, handlepage4 }) {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Create a Google Account</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Enter your Full Name and Email Address</Typography>
      <Box sx={{ width: "100%" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text" onClick={() => setPage(2)}>Back</Button>
          <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handlepage4}>Next</Button>
        </Box>
      </Box>
    </>
  );
}

export default Page3;

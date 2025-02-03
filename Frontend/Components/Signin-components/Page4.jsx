import React from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

function Page4({ error, password, confirmpassword, setPassword, setConfirmPassword, handlepage5 }) {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Create Password</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Create a strong new password for authentication.</Typography>
      <Box sx={{ width: "100%" }}>
        {password !== confirmpassword && <Alert severity="error">Password doesn't Match!</Alert>}
        <TextField
          fullWidth
          label="New Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text" onClick={() => setPage(3)}>Back</Button>
          <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handlepage5}>Next</Button>
        </Box>
      </Box>
    </>
  );
}

export default Page4;

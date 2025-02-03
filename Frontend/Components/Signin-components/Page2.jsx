import React from "react";
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Alert } from "@mui/material";

function Page2({ error, password, showPassword, setShowPassword, handlePassword, handlepage3 }) {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Welcome</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Your Email or Username</Typography>
      <Box sx={{ width: "100%" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePassword}
          required
        />
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
          label="Show Password"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text">Try another way</Button>
          <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handlepage3}>Next</Button>
        </Box>
      </Box>
    </>
  );
}

export default Page2;

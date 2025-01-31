import React from "react";
import { Box, TextField, Button, Typography, Link, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Signin() {
  return (
    <Container maxWidth="xs" 
       sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",  
        border: "solid 1px #D3D3D3", 
        padding: "70px", 
        marginTop: "60px", 
        borderRadius: "10px"
      }}>
      <GoogleIcon sx={{ fontSize: 50, color: "#4285F4" }} />
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
        Sign in
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        to continue to YouTube
      </Typography>
      <Box sx={{ width: "100%" }}>
        <TextField fullWidth label="Email or Username" variant="outlined" margin="normal" />
        <Link href="#" variant="body2" sx={{ display: "block", textAlign: "right", mb: 2 }}>
          Forgot email?
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Not your computer? Use a private browsing window to sign in.
          <Link href="#" variant="body2"> Learn more</Link>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="#" variant="body2">Create account</Link>
          <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }}>Next</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signin;

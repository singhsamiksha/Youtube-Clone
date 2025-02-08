import React from "react";
import { Box, TextField, Button, Typography, Link, Alert } from "@mui/material";

function Page1({error,username,handleChange,setPage,handlepage2}){
    return (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Sign in</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>to continue to YouTube</Typography>
          <Box sx={{ width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={username}
              required
            />
            <Link href="#" variant="body2" sx={{ display: "block", textAlign: "right", mb: 2 }}>Forgot email?</Link>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Not your computer? Use a private browsing window to sign in.
              <Link href="#" variant="body2"> Learn more</Link>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="text" onClick={()=> setPage(3)}>Create account</Button>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handlepage2}>Next</Button>
            </Box>
          </Box>
        </>
    );
}

export default Page1;
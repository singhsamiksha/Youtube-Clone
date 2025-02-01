import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Container, FormControlLabel, Checkbox, Alert, Snackbar, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from "@mui/icons-material/Close";

function Signin() {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); 
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }; 

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function handleChange(e) {
    setUsername(e.target.value);
    setError("");
  }

  function handlepage2() {
    if (username.trim() === '') {
      setError("Please enter the Email or Username.");
      return;
    }
    setPage(2);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setError("");
  }

  function handlepage3() {
    if (password.trim() === '') {
      setError("Please enter the Password.");
      return;
    }
    // Proceed to authentication logic here
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

      {page === 1 && (
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
      )}

      {page === 2 && (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Welcome</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{username}</Typography>
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
              <Link href="#" variant="body2">Try another way</Link>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handlepage3}>Next</Button>
            </Box>
          </Box>
        </>
      )}

      {page === 3 && (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Create a Google Account</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Enter your Full Name and Email Address</Typography>
          <Box sx={{ width: "100%" }}>
            {error && username === '' && <Alert severity="error">Enter the Username</Alert>}
            {error && email === '' && <Alert severity="error">Enter the Email</Alert>}

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
              <Button variant="text" onClick={() => setPage(1)}>Back</Button>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={()=>setPage(4)}>Next</Button>
            </Box>
          </Box>
        </>
      )}

      {page === 4 && (
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Create Password</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Create a strong new password for authentication.</Typography>
          <Box sx={{ width: "100%" }}>
            {password!==confirmpassword && <Alert severity="error">Password doesn't Match!</Alert>}
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={handlePassword}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="text" onClick={() => setPage(3)}>Back</Button>
              <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={()=>setPage(5)}>Next</Button>
            </Box>
          </Box>
        </>
      )}

{page === 5 && (
      <>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Your Avatar</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Please upload your profile picture.</Typography>
        <Box sx={{ width: "100%", marginBottom: "50px"}}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<AccountCircleIcon sx={{width: "100px", height: "100px"}}/>}
            sx={{
              width: "100%", 
              display:"flex", 
              justifyContent: "center", 
              alignItems: "center", 
              border:"none" }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => console.log(event.target.files)}
            />
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop:"20px"}}>
            <Button variant="text" onClick={() => setPage(4)}>Back</Button>
            <Button variant="contained" sx={{ backgroundColor: "#1A73E8" }} onClick={handleClick}>Finish</Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Your Accout is Successfully Created!"
              action={action}
            />
          </Box>
        </Box>
      </>
    )}
    </Container>
  );
}

export default Signin;

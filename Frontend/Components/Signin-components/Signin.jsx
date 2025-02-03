import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Container, FormControlLabel, Checkbox, Alert, Snackbar, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../Stylesheets/Signin.css';

function Signin({handleUserState, handleMainbar}) {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); 
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));  
    }
    console.log(image);
  };

  const handleClick = async () => {
    try {
        const response = await fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                image: image,
            }),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();
        console.log("User Created:", data);
    } catch (error) {
        console.error("Error:", error);
        setError("Failed to create user.");
    }

    setOpen(true);
    handleUserState();

    setTimeout(() => {
        handleMainbar();
    }, 2000);
};


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }; 

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="white"
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
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                Your Avatar
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please upload your profile picture.
              </Typography>
              <Box sx={{ width: '100%', marginBottom: '50px' }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={
                    image ? (
                      <img
                        src={image}
                        alt="Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                      />
                    ) : (
                      <AccountCircleIcon sx={{ width: '100px', height: '100px' }} />
                    )
                  }
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button variant="text" onClick={() => setPage(4)}>
                    Back
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#1A73E8' }} onClick={handleClick}>
                    Finish
                  </Button>
                </Box>
              </Box>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={
                  <span style={{ display: 'flex', alignItems: 'center', color: 'white' }} className="avatar">
                    <CheckCircleIcon style={{ marginRight: 8, color: 'green' }} />
                    Your Account is Successfully Created!
                  </span>
                }
                sx={{ backgroundColor: 'white' }}
              />
            </>
          )}
          </Container>
        );
      }

export default Signin;

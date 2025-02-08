import React from 'react';
import { Box, TextField, Button, Typography, Link, FormControlLabel, Checkbox, Alert, Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Page2 = ({ error, username, showPassword, password, handlepage3, setShowPassword, handleClose, open, handlePassword }) => (
  <>
    <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold' }}>Welcome</Typography>
    <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>{username}</Typography>
    <Box sx={{ width: '100%' }}>
      {!!error && <Alert severity='error'>{error}</Alert>}
      <TextField
        fullWidth
        required
        label='Password'
        variant='outlined'
        margin='normal'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePassword} // Ensure this is working correctly
      />

      <FormControlLabel
        control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />}
        label='Show Password'
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href='#' variant='body2'>Try another way</Link>
        <Button variant='contained' sx={{ backgroundColor: '#1A73E8' }} onClick={handlepage3}>Next</Button>
      </Box>
    </Box>
    <Snackbar
      open={open}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        severity='success'
        sx={{ width: '100%' }}
        icon={<CheckCircleIcon fontSize='inherit' style={{ color: 'green' }} />}
        onClose={handleClose}
      >
        Your Account is Successfully Signed In!
      </Alert>
    </Snackbar>

  </>
);

export default Page2;

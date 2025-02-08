import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const Page4 = ({ password, confirmpassword, handlePassword, setConfirmPassword, setPage }) => (
  <>
    <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold' }}>Create Password</Typography>
    <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>Create a strong new password for authentication.</Typography>
    <Box sx={{ width: '100%' }}>
      {password !== confirmpassword && <Alert severity='error'>Password doesn't Match!</Alert>}
      <TextField
        fullWidth
        required
        label='New Password'
        variant='outlined'
        margin='normal'
        type='password'
        value={password}
        onChange={handlePassword}
      />
      <TextField
        fullWidth
        required
        label='Confirm Password'
        variant='outlined'
        margin='normal'
        type='password'
        value={confirmpassword} // You might need to bind `confirmpassword` to the input value
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='text' onClick={() => setPage(3)}>Back</Button>
        <Button variant='contained' sx={{ backgroundColor: '#1A73E8' }} onClick={() => setPage(5)}>Next</Button>
      </Box>
    </Box>
  </>
);

export default Page4;

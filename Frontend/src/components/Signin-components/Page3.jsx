import React from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const Page3 = ({ error, username, email, setUsername, setEmail, setPage }) => (
  <>
    <Typography variant='h5' sx={{ mt: 2, fontWeight: 'bold' }}>Create a Google Account</Typography>
    <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>Enter your Full Name and Email Address</Typography>
    <Box sx={{ width: '100%' }}>
      {!!error && username === '' && <Alert severity='error'>Enter the Username</Alert>}
      {!!error && email === '' && <Alert severity='error'>Enter the Email</Alert>}

      <TextField
        fullWidth
        label='Username'
        variant='outlined'
        margin='normal'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label='Email Address'
        variant='outlined'
        margin='normal'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='text' onClick={() => setPage(1)}>Back</Button>
        <Button variant='contained' sx={{ backgroundColor: '#1A73E8' }} onClick={()=>setPage(4)}>Next</Button>
      </Box>
    </Box>
  </>
);
export default Page3;

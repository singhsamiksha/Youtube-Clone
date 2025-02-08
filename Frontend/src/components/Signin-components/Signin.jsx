import React, { useState } from 'react';
import { Container, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import { postUser, getUsers } from '../../utils/apis';
import '../../Stylesheets/Signin.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';

const Signin = ({ handleUserState, handleMainbar }) => {
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  // Handle Image Selection
  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    console.log(image);
  };

  // Handle User Registration
  const handleClick = async() => {
    try {
      const user = await postUser(username, email, password, image);

      dispatch(login(user));

      setOpen(true);
      handleUserState();

      setTimeout(() => {
        handleMainbar();
      }, 2000);
    } catch (error) {
      setError('Failed to create user.');
    }
  };

  // Close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='white'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  // Handle Input Change
  function handleChange(e) {
    setUsername(e.target.value);
    setError('');
  }

  // Handle Page 2
  function handlepage2() {
    if (username.trim() === '') {
      setError('Please enter the Email or Username.');
      return;
    }
    setEmail(username);
    setPage(2);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setError('');
  }

  const handlepage3 = async() => {
    try {
      if (password.trim() === '') {
        setError('Please enter the Password.');
        return;
      }
      const users = await getUsers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        console.log(`Welcome ${user.username}! You are successfully signed in.`);

        dispatch(login(user)); // Store user in Redux

        setOpen(true);
        handleUserState();
        setTimeout(() => {
          handleMainbar();
        }, 3000);
      } else {
        setError("User doesn't exist, Please Try again!");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Please check your credentials!');
    }
  };

  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid 1px #D3D3D3',
        padding: '70px',
        marginTop: '60px',
        borderRadius: '10px',
      }}
    >
      <GoogleIcon sx={{ fontSize: 50, color: '#4285F4' }} />

      {page === 1 && <Page1
        error={error}
        username={username}
        handleChange={handleChange}
        setPage={setPage}
        handlepage2={handlepage2}
      />}

      {page === 2 && <Page2
        error={error}
        username={username}
        showPassword={showPassword}
        password={password}
        handlepage3={handlepage3}
        setShowPassword={setShowPassword}
        open={open}
        handleClose={handleClose}
        handlePassword={handlePassword}
      />}

      {page === 3 && <Page3
        error={error}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        setPage={setPage}
      />}

      {page === 4 && <Page4
        password={password}
        confirmpassword={confirmpassword}
        handlePassword={handlePassword}
        setConfirmPassword={setConfirmPassword}
        setPage={setPage}
      />}

      {page === 5 && <Page5
        image={image}
        handleImageChange={handleImageChange}
        handleClick={handleClick}
        setPage={setPage}
        open={open}
        handleClose={handleClose}
      />}
    </Container>
  );
};

export default Signin;

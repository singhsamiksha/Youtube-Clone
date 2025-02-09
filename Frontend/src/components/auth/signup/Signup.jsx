import React, { useEffect, useState } from 'react';
import {
  Alert, Box, Container, Grid2, IconButton, Paper, Snackbar, useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import { postUser, getUsers } from '../../../utils/apis';
import { updateUser } from '../../../redux/userSlice';
import GoogleIcon from '../../../assets/icons/GoogleIcon';
import { SIGNIN_PAGE_STATE } from '../../../constants';
import SigninEmailTab from './SigninEmailTab';
import SigninPasswordTab from './SigninPasswordTab';

function Signup({ handleMainbar }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPageView, setCurrentPageView] = useState(SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    const tempPage = searchParams.get('page');
    const username = searchParams.get('username');
    if (tempPage && SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW === window.atob(tempPage)) {
      setCurrentPageView(window.atob(tempPage));
      setUserData({
        username: window.atob(username),
        password: '',
      });
    }
  }, []);

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    console.log(image);
  };

  // Handle User Registration
  const handleClick = async () => {
    try {
      const user = await postUser(username, email, password, image);

      dispatch(updateUser(user));

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
    <IconButton
      size="small"
      aria-label="close"
      color="white"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
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
    setCurrentPageView(2);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setError('');
  }

  const submitLoginForm = async () => {
    try {
      if (password.trim() === '') {
        setError('Please enter the Password.');
        return;
      }
      const users = await getUsers();
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        console.log(`Welcome ${user.username}! You are successfully signed in.`);

        dispatch(updateUser(user)); // Store user in Redux

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

  const handleUserDataChange = (field) => (value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const resetLoginForm = () => {
    setUserData({
      username: '',
      password: '',
    });

    setSearchParams({});
    setCurrentPageView(SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW);
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Grid2
        container
        item
        size={{ xs: 12, md: 8, lg: 4 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 5,
          border: 1,
          borderRadius: 2,
          borderColor: theme.palette.divider,
        }}
      >

        <Snackbar
          open={open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleClose}
        >
          <Alert
            severity="success"
            sx={{ width: '100%' }}
            icon={<CheckCircleIcon fontSize="inherit" />}
            onClose={handleClose}
          >
            Your Account is Successfully Signed In!
          </Alert>
        </Snackbar>

        <GoogleIcon />
        {currentPageView === SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW && (
          <SigninEmailTab
            username={userData.username}
            setUsername={handleUserDataChange('username')}
            nextPage={setCurrentPageView}
          />
        )}

        {currentPageView === SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW && (
          <SigninPasswordTab
            username={userData.username}
            password={userData.password}
            setPassword={handleUserDataChange('password')}
            resetLoginForm={resetLoginForm}
            submitLoginForm={submitLoginForm}
          />
        )}

        {currentPageView === 3 && (
          <Page3
            error={error}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            setPage={setCurrentPageView}
          />
        )}

        {currentPageView === 4 && (
          <Page4
            password={password}
            confirmpassword={confirmpassword}
            handlePassword={handlePassword}
            setConfirmPassword={setConfirmPassword}
            setPage={setCurrentPageView}
          />
        )}

        {currentPageView === 5 && (
          <Page5
            image={image}
            handleImageChange={handleImageChange}
            handleClick={handleClick}
            setPage={setCurrentPageView}
            open={open}
            handleClose={handleClose}
          />
        )}
      </Grid2>

    </Grid2>
  );
}

export default Signup;

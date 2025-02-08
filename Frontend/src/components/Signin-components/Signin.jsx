import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Grid2, IconButton, Paper, Snackbar, Stack, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import { postUser, loginUser } from '../../utils/apis';
import { connect, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import { PASSWORD_MIN_LENGTH, SIGNIN_PAGE_STATE } from '../../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SigninEmailTab from './SigninEmailTab';
import SigninPasswordTab from './SigninPasswordTab';
import { validateEmail } from '../../utils/common';

const Signin = (props) => {
  const {
    // Redux Dispatchers
    updateUser,
  } = props;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPageView, setCurrentPageView] = useState(SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const theme = useTheme();

  useEffect(() => {
    const tempPage = searchParams.get('page');
    const username = searchParams.get('username');
    if (tempPage && SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW === window.atob(tempPage)) {
      setCurrentPageView(window.atob(tempPage));
      setUserData({
        email: window.atob(username),
        password: '',
      });
    }
  }, []);

  const submitLoginForm = async() => {
    try {
      if (!validateEmail(userData.email)) {
        setError('Invalid email format');
        return;
      }

      if (userData.password.trim().length < PASSWORD_MIN_LENGTH) {
        setError(`Password must be ${PASSWORD_MIN_LENGTH} character long`);
        return;
      }

      await loginUser({
        payload: userData,
        setters: {
          setError,
          onSuccessHandler: ({ user }) => {
            updateUser({ user });
            navigate('/');
          },
        },
      });
    } catch {
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
      email: '',
      password: '',
    });

    setSearchParams({});
    setCurrentPageView(SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW);
  };

  return (
    <Grid2
      container
      justifyContent='center'
      alignItems='center'
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
        <GoogleIcon />
        {currentPageView === SIGNIN_PAGE_STATE.EMAIL_ASK_VIEW && (
          <SigninEmailTab
            email={userData.email}
            setEmail={handleUserDataChange('email')}
            setPage={setCurrentPageView}
          />
        )}

        {currentPageView === SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW && (
          <SigninPasswordTab
            email={userData.email}
            password={userData.password}
            setPassword={handleUserDataChange('password')}
            resetLoginForm={resetLoginForm}
            submitLoginForm={submitLoginForm}
            errorComponent={
              error
                ? (
                  <Stack sx={{ width: '100%', paddingBottom: 1 }} spacing={2}>
                    <Alert severity='error'>{error}</Alert>
                  </Stack>
                )
                : ''
            }
          />
        )}
      </Grid2>

    </Grid2>
  );
};

const mapDispatchToProp = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUser(payload)),
});

export default connect(null, mapDispatchToProp)(Signin);

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import { GOOGLE_INCOGNITO_TUTORIAL_GUIDE, SIGNIN_PAGE_STATE } from '../../../constants';
import { validateEmail } from '../../../utils/common';

function SigninEmailTab(props) {
  const { email, setEmail, setPage } = props;

  const theme = useTheme();
  const [, setSearchParams] = useSearchParams();

  const [error, setError] = useState('');

  const validateUsername = (value) => {
    let newError;
    if (!value) {
      newError = 'Please enter the email';
    } else if (!validateEmail(value)) {
      newError = 'Email is not valid';
    } else {
      newError = '';
    }

    setError(newError);
    return !newError;
  };

  const handleUserNameChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const submitForm = () => {
    if (validateUsername(email)) {
      setSearchParams({
        username: window.btoa(email),
        page: window.btoa(SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW),
      });

      setPage(SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
        Sign in
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        to continue to YouTube
      </Typography>

      <Box sx={{ width: '100%' }}>
        <TextField
          fullWidth
          required
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          error={error}
          helperText={error}
          onChange={handleUserNameChange}
        />
        <Link
          href="#"
          variant="body1"
          underline="hover"
          sx={{
            display: 'block',
            color: theme.palette.primary.main,
            textAlign: 'right',
            fontWeight: 500,
            mb: 2,
          }}
        >
          Forgot email?
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Not your computer? Use a private browsing window to sign in.
          {' '}
          <Link
            href={GOOGLE_INCOGNITO_TUTORIAL_GUIDE}
            variant="inherit"
            underline="hover"
            sx={{ fontWeight: 500 }}
            target="_blank"
          >
            Learn more about using Guest mode
          </Link>

        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="text" onClick={() => setPage(3)}>Create account</Button>
          <Button
            variant="contained"
            onClick={submitForm}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

SigninEmailTab.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default SigninEmailTab;

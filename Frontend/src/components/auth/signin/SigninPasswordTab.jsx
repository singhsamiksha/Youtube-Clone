import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { PASSWORD_MIN_LENGTH } from '../../../constants';

function SigninPasswordTab(props) {
  const {
    email,
    password,
    setPassword,
    submitLoginForm,
    resetLoginForm,
    errorComponent,
  } = props;

  const theme = useTheme();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (value) => {
    let newError = '';
    if (value.includes(' ')) {
      newError = 'Password should not contains space';
    }
    if (value.trim().length < PASSWORD_MIN_LENGTH) {
      newError = `Password must be minimum ${PASSWORD_MIN_LENGTH} charactes long.`;
    }
    setError(newError);
    return !newError;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const submitForm = () => {
    if (validatePassword(password)) {
      submitLoginForm();
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>Welcome</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{email}</Typography>
      <Box sx={{ width: '100%' }}>
        {errorComponent}
        <TextField
          fullWidth
          required
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          error={error}
          helperText={error}
          onChange={handlePasswordChange}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            }
            label="Show Password"
            sx={{ mb: 2 }}
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
            Forgot Password?
          </Link>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            variant="body1"
            component="button"
            sx={{
              display: 'block',
              color: theme.palette.primary.main,
              textAlign: 'right',
              fontWeight: 500,
            }}
            onClick={resetLoginForm}
          >
            Not You? Login again
          </Link>
          <Button variant="contained" onClick={submitForm}>Next</Button>
        </Box>
      </Box>

    </>
  );
}

SigninPasswordTab.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  submitLoginForm: PropTypes.func.isRequired,
  resetLoginForm: PropTypes.func.isRequired,
  errorComponent: PropTypes.elementType.isRequired,
};

export default SigninPasswordTab;

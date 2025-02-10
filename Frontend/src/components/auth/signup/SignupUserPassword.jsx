import { useState } from 'react';
import {
  TextField, Button, Typography,
  Grid2,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { SIGNUP_PAGE_STATE } from '../../../constants';

function SignupUserPassword(props) {
  const {
    formData,
    errors,
    setFormData,
    setErrors,
    submitForm,
    previousPage,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.search(' ') >= 0) {
      setErrors({
        ...errors,
        password: 'Password should not have spaces',
      });
    } else if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Password do not match',
      });
    }

    submitForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handlePreviousPage = () => {
    setSearchParams({
      page: window.btoa(SIGNUP_PAGE_STATE.BASIC_DETAILS_VIEW),
      userData: searchParams.get('userData'),
    });

    previousPage();
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>Create a Google Account</Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2} justifyContent="center" sx={{ p: { xs: 1, md: 5 } }}>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password}
              helperText={errors.password}
            />
          </Grid2>

          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid2>

          <Grid2 item size={12} container justifyContent="space-between">
            <Button variant="standard" onClick={() => handlePreviousPage()}>
              {'< Back'}
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
}

SignupUserPassword.propTypes = {
  formData: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  setFormData: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default SignupUserPassword;

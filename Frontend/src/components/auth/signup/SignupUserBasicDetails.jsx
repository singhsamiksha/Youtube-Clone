import { useState } from 'react';
import {
  TextField, Button, Typography, Grid2,
} from '@mui/material';

import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { validateSignForm1 } from '../../../utils/apis/userApi';
import { SIGNUP_PAGE_STATE } from '../../../constants';

function SignupUserBasicDetails(props) {
  const {
    formData,
    errors,
    setFormData,
    setErrors,
    nextPage,
  } = props;

  const [loader, setLoader] = useState(false);
  const [, setSearchParams] = useSearchParams();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.avatar) newErrors.avatar = 'Please provide a avatar link';

    if (Object.values(newErrors).filter(Boolean).length) {
      setErrors({
        ...errors,
        ...newErrors,
      });

      return;
    }

    validateSignForm1({
      payload: formData,
      setters: {
        setLoader,
        onSuccesHandler: ({ email: emailError, username: usernameError }) => {
          if (emailError || emailError) {
            setErrors({ ...errors, email: emailError, username: usernameError });
          } else {
            const {
              fullName, username, email, avatar,
            } = formData;
            const userData = window.btoa(JSON.stringify({
              fullName, username, email, avatar,
            }));

            setSearchParams({
              userData, page: window.btoa(SIGNUP_PAGE_STATE.PASSWORD_ASK_VIEW),
            });
            nextPage();
          }
        },
      },
    });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>Create a Google Account</Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2} sx={{ mt: 5 }}>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              helperText={errors.fullName}

            />
          </Grid2>

          <Grid2 item size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              helperText={errors.username}
            />
          </Grid2>

          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}

            />
          </Grid2>

          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Avatar (Image URL)"
              variant="outlined"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              error={errors.avatar}
              helperText={errors.avatar}
            />
          </Grid2>
          <Grid2 item textAlign="right" size={12}>
            <Button type="submit" variant="contained" color="primary" loading={loader}>
              Register
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
}

SignupUserBasicDetails.propTypes = {
  formData: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  setFormData: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default SignupUserBasicDetails;

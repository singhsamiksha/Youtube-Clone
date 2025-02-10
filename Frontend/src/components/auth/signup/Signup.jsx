import { useEffect, useState } from 'react';
import {
  Alert, Grid2, Stack, useTheme,
} from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupUserBasicDetails from './SignupUserBasicDetails';
import SignupUserPassword from './SignupUserPassword';
import { updateUser } from '../../../redux/userSlice';
import GoogleIcon from '../../../assets/icons/GoogleIcon';
import { SIGNIN_PAGE_STATE, SIGNUP_PAGE_STATE } from '../../../constants';
import { getAuthUser, registerUser } from '../../../utils/apis/userApi';

const formData = {
  fullName: '',
  username: '',
  email: '',
  avatar: '',
  password: '',
  confirmPassword: '',
};

function Signup(props) {
  const {
    // Redux Dispatchers
    updateUserData,
  } = props;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentPageView, setCurrentPageView] = useState(SIGNUP_PAGE_STATE.BASIC_DETAILS_VIEW);
  const [userFormData, setUserFormData] = useState({ ...formData });

  const [formErrors, setFormErrors] = useState({ ...formData });
  const [error, setError] = useState();

  const theme = useTheme();

  useEffect(() => {
    const tempPage = searchParams.get('page') ? window.atob(searchParams.get('page')) : '';
    const parsedFormData = searchParams.get('userData') ? JSON.parse(window.atob(searchParams.get('userData')) || '') : '';

    if (tempPage) {
      setCurrentPageView(tempPage);
    }
    if (parsedFormData) {
      setUserFormData({
        ...userFormData,
        ...(parsedFormData || {}),
      });
    }
  }, [searchParams]);

  const submitSignupForm = async () => {
    try {
      await registerUser({
        payload: userFormData,
        setters: {
          setError,
          onSuccessHandler: () => {
            getAuthUser().then((user) => {
              updateUserData({ user });
              navigate('/');
            }).catch((e) => {
              setError(e?.message || '');
            });
          },
        },
      });
    } catch {
      setError('Please check your credentials!');
    }
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
        <GoogleIcon />

        {
          error
            ? (
              <Stack sx={{ mt: 3, minWidth: '50%', paddingBottom: 1 }} spacing={2}>
                <Alert severity="error">{error}</Alert>
              </Stack>
            )
            : ''
        }

        {currentPageView === SIGNUP_PAGE_STATE.BASIC_DETAILS_VIEW && (
          <SignupUserBasicDetails
            formData={userFormData}
            errors={formErrors}
            setFormData={setUserFormData}
            setErrors={setFormErrors}
            nextPage={() => setCurrentPageView(SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW)}
          />
        )}

        {currentPageView === SIGNIN_PAGE_STATE.PASSWORD_ASK_VIEW && (
          <SignupUserPassword
            formData={userFormData}
            errors={formErrors}
            setFormData={setUserFormData}
            setErrors={setFormErrors}
            submitForm={submitSignupForm}
            previousPage={() => setCurrentPageView(SIGNIN_PAGE_STATE.BASIC_DETAILS_VIDE)}
          />
        )}
      </Grid2>

    </Grid2>
  );
}

Signup.propTypes = {
  updateUserData: PropTypes.func.isRequired,
};

const mapDispatchToProp = (dispatch) => ({
  updateUserData: (payload) => dispatch(updateUser(payload)),
});

export default connect(null, mapDispatchToProp)(Signup);

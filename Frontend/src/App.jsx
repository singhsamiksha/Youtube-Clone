import appRouter from './utils/routes.jsx';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Grid2, LinearProgress, Typography } from '@mui/material';
import AppLogo from './assets/icons/appLogo.jsx';
import { getAuthUser } from './utils/apis.js';
import { updateUser } from './redux/userSlice.js';
import PropTypes from 'prop-types';

const App = (props) => {
  const {
    // Redux Dispatchers
    updateUserData,
  } = props;

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAuthUser().then((user) => {
      updateUserData({ user });
      setLoader(false);
    }).catch(() => {
      setLoader(false);
    });
  }, []);

  if(loader) {
    return (
      <Grid2
        container
        sx={{ width: '100vw', height: '100vh' }}
        justifyContent='center'
        alignItems='center'
      >
        <Grid2 item sx={{ textAlign: 'center' }} size={{ xs: 12, md: 2 }}>
          <Typography sx={{ mb: 4 }}>
            <AppLogo width={190} height={40}/>
          </Typography>
          <LinearProgress />
        </Grid2>
      </Grid2>
    );
  }

  return (
    <RouterProvider router={appRouter} />
  );
};

App.propTypes = {
  updateUserData: PropTypes.func.isRequired,
};

const mapDispatchToProp = (dispatch) => ({
  updateUserData: (payload) => dispatch(updateUser(payload)),
});

export default connect(null, mapDispatchToProp)(App);

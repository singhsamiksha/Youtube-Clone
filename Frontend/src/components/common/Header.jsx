import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI Components
import {
  TextField,
  Button,
  InputAdornment,
  useTheme,
  Avatar,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilter';

// Utils
import AppLogo from '../../assets/icons/appLogo';
import { stringAvatar } from '../../utils/common';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { updateUser } from '../../redux/userSlice';
import CreateChannelDialog from './CreateChannelDialog';

const Header = (props) => {
  const {
    toggleSidebar,

    // Redux state
    isAuthenticated,
    userData,

    // Redux actions
    updateUserData,
  } = props;

  const theme = useTheme();
  const navigate = useNavigate();

  const [createChannelDialogOpen, setCreateChannelDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    updateUserData(null);
    navigate('/');
  };

  const menuId = 'account-menu';
  const renderMenu = isAuthenticated ? (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 2,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
      }}
      >
        <Avatar {...stringAvatar(userData?.name)}/>
        <Box>
          <Typography variant='body1' sx={{ ml: 1 }}>{userData?.name}</Typography>
          <Typography variant='subtitle2' sx={{ ml: 1 }}>{userData?.email}</Typography>
        </Box>
      </Box>
      <Divider/>
      <Typography variant='caption' sx={{ ml: 1.5, color: theme.palette.text.secondary }}>Channels</Typography>
      {(userData?.channels || []).map((channel) => (
        <MenuItem key={channel._id} onClick={() => navigate(`/channels/${channel._id}`)} >
          <ListItemIcon>
            <MovieFilterOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>{channel.channelName}</ListItemText>
        </MenuItem>
      ))}
      <MenuItem
        sx={{ color: theme.palette.primary.main }} onClick={() => {
          handleMenuClose();
          setCreateChannelDialogOpen(true);
        }}
      >
        <AddCircleOutlineIcon sx={{ color: 'inherit', mr: 1 }} />
        <Typography color='primary'>
          Create your channel
        </Typography>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={handleLogout} >
        <ListItemIcon>
          <LogoutIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>

    </Menu>
  ) : '';

  // <Menu
  //       id="basic-menu"
  //       anchorEl={anchorEl}
  //       open={open}
  //       onClose={handleClose}
  //       MenuListProps={{
  //         'aria-labelledby': 'basic-button',
  //       }}
  //     >
  //       <MenuItem onClick={handleClose}>Profile</MenuItem>
  //       <MenuItem onClick={handleClose}>My account</MenuItem>
  //       <MenuItem onClick={handleClose}>Logout</MenuItem>
  //     </Menu>

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CreateChannelDialog
        isDialogOpen={createChannelDialogOpen}
        handleClose={() => setCreateChannelDialogOpen(false)}
      />
      <AppBar
        position='fixed' sx={{ zIndex: theme.zIndex.drawer + 1, background: theme.palette.background.default }}
        elevation={0}
      >
        <Toolbar sx={{ }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              size='large'
              edge='start'
              aria-label='open drawer'
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <AppLogo width={100} height={30} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: '40%',
              borderRadius: 5,
            }}
          >
            <TextField
              fullWidth
              id='outlined-start-adornment'
              placeholder='Search'
              size='small'
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>,
                },
              }}
            />
            <Button
              disableElevation
              aria-label='search'
              variant='contained'
              sx={{
                border: 1,
                borderColor: theme.palette.divider,
                borderLeft: 0,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.divider,
                borderRadius: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <SearchIcon />
            </Button>
          </Box>

          {renderMenu}
          <Box sx={{ flexGrow: 1 }} />
          {
            isAuthenticated
              ? (
                <IconButton
                  aria-controls={menuId}
                  size='small'
                  edge='end'
                  variant='outlined'
                  aria-label='account of current user'
                  // aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar {...stringAvatar(userData?.name)} />
                </IconButton>
              )
              : (
                <Button
                  size='medium'
                  edge='end'
                  variant='outlined'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.divider,
                    borderRadius: 5,
                    pl: 1, pr: 1,
                    textTransform: 'none',
                  }}
                  onClick={() => navigate('/signin')}
                >
                  <AccountCircleOutlinedIcon fontSize='medium' sx={{ mr: 1 }} />
                  Sign in
                </Button>
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  handleUserState: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

const mapDispatchToProp = (dispatch) => ({
  updateUserData: (data) => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProp)(Header);

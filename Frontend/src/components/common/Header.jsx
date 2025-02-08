import '../../Stylesheets/Header.css';
import React, { useState, useMemo, useEffect } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { TextField, Button, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { postChannel } from '../../utils/apis';
import PropTypes from 'prop-types';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppLogo from '../../assets/icons/appLogo';
import { stringAvatar } from '../../utils/common';

const ChannelDialog = ({ open, handleClose, handleCreateChannel, channelName, setChannelName, description, setDescription, channelBanner, setChannelBanner, subscribers, setSubscribers, setVideos }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Create Your Channel</DialogTitle>
    <DialogContent>
      <DialogContentText>Enter your channel details below:</DialogContentText>
      <TextField
        autoFocus required fullWidth margin='dense' label='Channel Name' variant='standard'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <TextField
        required fullWidth multiline margin='dense' label='Description' variant='standard' rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        required fullWidth margin='dense' label='Channel Banner URL' variant='standard'
        value={channelBanner}
        onChange={(e) => setChannelBanner(e.target.value)}
      />
      <TextField
        required fullWidth margin='dense' label='Subscribers' variant='standard' type='number'
        value={subscribers}
        onChange={(e) => setSubscribers(Number(e.target.value))}
      />
      <input multiple type='file' onChange={(e) => setVideos(Array.from(e.target.files))} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleCreateChannel}>Create Channel</Button>
    </DialogActions>
  </Dialog>
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ handleSidebar, handleUserState, handleSearch, isAuthenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [channelExists, setChannelExists] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [channelBanner, setChannelBanner] = useState('');
  const [subscribers, setSubscribers] = useState(0);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const handleCreateChannel = async () => {
      try {
        const owner = user?._id || user?.data?._id;
        await postChannel(channelName, owner, description, channelBanner, subscribers, videos);
        setChannelExists(true);
        handleClose();
      } catch (error) {
        console.error('Failed to create channel:', error);
      }
    };
    setChannelExists(user?.channel && user?.channel.length > 0);
  }, [user?.channel]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const demoSession = {
    user: {
      name: user?.username || user?.data?.username || 'Guest',
      email: user?.email || user?.data?.email || 'guest@example.com',
      image: user?.image || user?.data?.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    },
  };

  const handleCreateChannel = async () => {
    try {
      const owner = user?._id || user?.data?._id;
      await postChannel(channelName, owner, description, channelBanner, subscribers, videos);
      setChannelExists(true);
      handleClose();
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  const authentication = useMemo(() => ({
    signIn: () => setSession(demoSession),
    signOut: () => {
      handleLogout();
      setSession(null);
    },
  }), []);

  const handleClickOpen = () => {
    if (channelExists) {
      console.log('hello');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      keepMounted
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar
        position='static'
        color='transparent'
        elevation={0}
      >
        <Toolbar sx={{ minHeight: '56px !important' }}>
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
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <AppLogo width={100} height={30} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              // flexGrow: 2,
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

          <Box sx={{ flexGrow: 1 }} />
          {
            isAuthenticated
              ? <Button
                size='medium'
                edge='end'
                variant='outlined'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleUserState}
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.divider,
                  borderRadius: 5,
                  pl: 1, pr: 1,
                  textTransform: 'none',
                }}
              >
                <AccountCircleOutlinedIcon fontSize='medium' sx={{ mr: 1 }} />
                Sign in

              </Button>
              : <Avatar {...stringAvatar('Kent Dodds')} />
          }

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              color='inherit'
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>

  );

  return (
    <div className='Header'>
      <div className='left-header'>
        <IconButton aria-label='menu' size='medium' onClick={handleSidebar}>
          <DensityMediumIcon fontSize='inherit' />
        </IconButton>
        <button className='logo-button'>
          <img src='https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png' className='logo-image' alt='YouTube Logo' />
        </button>
      </div>
      <div className='center-header'>
        <TextField
          variant='outlined'
          placeholder='Search'
          size='small'
          className='search-bar'
          sx={{
            width: 400,
            backgroundColor: 'white',
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'hsl(0, 4.00%, 95.10%)' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </div>
      <div className='right-header'>
        {isAuthenticated ? (
          <AuthenticationContext.Provider value={authentication}>
            <SessionContext.Provider value={demoSession}>
              <Account />
              <Button variant='outlined' onClick={handleClickOpen}>
                {channelExists ? 'View My Channel' : 'Create Channel'}
              </Button>
            </SessionContext.Provider>
          </AuthenticationContext.Provider>
        ) : (
          <Button variant='outlined' startIcon={<AccountCircleIcon />} onClick={handleUserState}>
            Sign in
          </Button>
        )}
      </div>
      <ChannelDialog
        open={open}
        handleClose={handleClose}
        handleCreateChannel={handleCreateChannel}
        channelName={channelName}
        setChannelName={setChannelName}
        description={description}
        setDescription={setDescription}
        channelBanner={channelBanner}
        setChannelBanner={setChannelBanner}
        subscribers={subscribers}
        setSubscribers={setSubscribers}
        setVideos={setVideos}
      />
    </div>
  );
};

Header.propTypes = {
  handleSidebar: PropTypes.func.isRequired,
  handleUserState: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;

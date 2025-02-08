import React from 'react';
import { TextField, Button, InputAdornment, useTheme, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppLogo from '../../assets/icons/appLogo';
import { stringAvatar } from '../../utils/common';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const {
    // Redux state
    isAuthenticated,
    userData,

  } = props;

  const theme = useTheme();
  const navigate = useNavigate();

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
              ? <Avatar {...stringAvatar(userData?.name)} />
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
};

Header.propTypes = {
  handleSidebar: PropTypes.func.isRequired,
  handleUserState: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

export default connect(mapStateToProps)(Header);

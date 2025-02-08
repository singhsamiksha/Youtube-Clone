import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';

const Sidebar = () => (
  <Box sx={{ width: '100%', maxWidth: 200 }}>
    <nav >
      <List>
        <ListItem disablePadding >
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SlideshowIcon />
            </ListItemIcon>
            <ListItemText primary='Shorts' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary='Subscriptions' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='You' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary='History' />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  </Box>
);

export default Sidebar;

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

const list = [
  { icon: <HomeIcon />, label: 'Home' },
  { icon: <SlideshowIcon />, label: 'Shorts' },
  { icon: <VideoLibraryIcon />, label: 'Subscriptions' },
  { icon: <AccountCircleIcon />, label: 'You' },
  { icon: <HistoryIcon />, label: 'History' },
];

const Sidebar = () => (
  <Box sx={{ width: '100%', maxWidth: 200 }}>
    <List>
      {
        list.map((listItem) => (
          <ListItem key={listItem.label} disablePadding sx={{ mb: 2 }}>
            <ListItemButton sx={{ display: 'flex', flexDirection: 'column', padding: 0.5 }}>
              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {listItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={listItem.label}
                slotProps={{
                  primary: {
                    fontSize: 9.5,
                    fontWeight: 400,
                    variant: 'caption',
                    sx: {
                    },
                    varient: 'subtitle2',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  </Box>
);

export default Sidebar;

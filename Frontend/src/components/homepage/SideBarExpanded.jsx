import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';

const list = [
  { icon: <HomeIcon />, label: 'Home' },
  { icon: <SlideshowIcon />, label: 'Shorts' },
  { icon: <VideoLibraryIcon />, label: 'Subscription' },
  { type: 'divider' },

  { icon: <AccountCircleIcon />, label: 'You' },
  { icon: <HistoryIcon />, label: 'History' },
  { type: 'divider' },

  { icon: <WhatshotIcon />, label: 'Trending' },
  { icon: <ShoppingBagIcon />, label: 'Shopping' },
  { icon: <MusicNoteIcon />, label: 'Music' },
  { icon: <MovieIcon />, label: 'Movie' },
  { icon: <LiveTvIcon />, label: 'Live' },
  { icon: <SportsEsportsIcon />, label: 'Gaming' },
  { type: 'divider' },

  { icon: <SettingsIcon />, label: 'Setting' },
  { icon: <OutlinedFlagIcon />, label: 'Report history' },
  { icon: <HelpIcon />, label: 'Help' },
  { icon: <FeedbackIcon />, label: 'Send feedback' },
];

function SideBarExpanded() {
  return (
    <Box sx={{ width: '100%', maxWidth: 324, bgcolor: 'background.paper' }}>
      <List>
        {
          list.map((item) => (item.type === 'divider' ? <Divider key={`sidebar-item-${item.type}`} /> : (
            <ListItem key={`sidebar-item-${item.label}`} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )))
        }
      </List>
    </Box>
  );
}

export default SideBarExpanded;

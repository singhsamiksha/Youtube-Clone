import {
  Avatar, Typography, Box, Tabs, Tab,
  useTheme,
  Grid2,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChannels } from '../../utils/apis/channelApi';

function Channel(props) {
  const {
    isAuthenticated,
    userData,
  } = props;

  const { userId } = userData || {};

  const { channelId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [videoLoader, setVideoLoader] = useState(true);
  const [videoListLoader, setVideoListLoader] = useState(true);
  const [error, setError] = useState('');
  const [selectedChannel, setSelectedChannel] = useState();

  useEffect(() => {
    if (!channelId) {
      setError('Selected video does not exists on platform.');
    } else {
      getChannels({
        payload: { channelId },
        setters: {
          setLoader: setVideoLoader,
          setError,
          onSuccessHandler: ((v) => setSelectedChannel(v)),
        },
      })
        .catch((e) => setError(e?.message || 'Internal server error'));

      getDashboardVideos({
        setters: {
          setLoader: setVideoListLoader,
          setError,
          onSuccessHandler: ((v) => setVideos(v)),
        },
      })
        .catch((e) => setError(e?.message || 'Internal server error'));
    }
    setLoader(false);
  }, [channelId]);

  const user = { name: 'John Doe' }; // Active user

  // Active user channels
  const channel = {
    name: 'StudyCircle',
    subscribers: '1M',
    videos: [
      {
        id: 1, url: 'https://miro.medium.com/v2/resize:fit:1400/1*-KcEjo_kTcNSC6LHyt9edg.jpeg', title: 'Introduction to React', views: '9.1K', uploadDate: '1 hour ago',
      },
      {
        id: 2, url: 'https://i.ytimg.com/vi/hpB2NjVf2Eo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAhTqzFBIWapDoo-1w83ADn0cprFQ', title: 'JavaScript Basics', views: '15K', uploadDate: '2 days ago',
      },
    ],
  };

  if (error) {
    return (
      <Grid2 container sx={{ width: '100%', mt: 5 }} justifyContent="center" alignItems="center">
        <Grid2 item>
          <Alert severity="error">{error}</Alert>
        </Grid2>
      </Grid2>
    );
  }

  if (loader) {
    return (
      <Grid2 container sx={{ width: '100%', mt: 20 }} justifyContent="center" alignItems="center">
        <Grid2 item textAlign="center">
          <CircularProgress />
          <Typography variant="body2">
            Fetching you videos...
          </Typography>
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Box className="channel-div" sx={{ width: '100%', padding: 2 }}>
      {/* Banner Image */}
      <Box className="banner" sx={{ width: '100%', height: '250px', overflow: 'hidden' }}>
        <img
          src="https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg"
          alt="channel-banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Channel Info Row */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 3, padding: 2,
      }}
      >
        <Avatar
          alt="channel-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuwMErAIvuYtPwltO8QTFItFSZhmOX94snQ&s"
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{channel.name}</Typography>
          <Box sx={{ display: 'flex', gap: 2, color: 'gray' }}>
            <Typography>{user.name}</Typography>
            <Typography>
              {channel.subscribers}
              {' '}
              Subscribers
            </Typography>
            <Typography>
              {channel.videos.length}
              {' '}
              Videos
            </Typography>
          </Box>
          <Typography sx={{ marginTop: 1 }}>Hello guys, welcome to StudyCircle!</Typography>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs aria-label="basic tabs example">
          <Tab label="Videos" />
        </Tabs>
      </Box>

      {/* Videos Section */}
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3,
      }}
      >
        {channel.videos.map((video) => (
          <Box key={video.id} sx={{ width: 300 }}>
            <img src={video.url} alt={video.title} style={{ width: '100%', borderRadius: 5 }} />
            <Typography sx={{ fontWeight: 'bold', mt: 1 }}>{video.title}</Typography>
            <Box sx={{ display: 'flex', gap: 2, color: 'gray' }}>
              <Typography>
                {video.views}
                {' '}
                Views
              </Typography>
              <Typography>{video.uploadDate}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Channel;

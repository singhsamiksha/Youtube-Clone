import {
  Avatar, Typography, Box, Tab,
  Grid2,
  Alert,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { getChannels } from '../../utils/apis/channelApi';
import { stringAvatar } from '../../utils/common';
import AddVideoDialog from '../common/AddVideoDialog';
import VideoCard from '../common/VideoCard';

function Channel() {
  const { channelId } = useParams();

  const [loader, setLoader] = useState(true);
  const [addVideoDialogOpen, setAddVideoDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedChannel, setSelectedChannel] = useState();

  const fetchChannel = () => {
    getChannels({
      payload: { channelId },
      setters: {
        setLoader: () => {},
        setError,
        onSuccessHandler: ((v) => setSelectedChannel(v)),
      },
    })
      .catch((e) => setError(e?.message || 'Internal server error'));
  };

  useEffect(() => {
    if (!channelId) {
      setError('Selected video does not exists on platform.');
    } else {
      fetchChannel();
    }
    setLoader(false);
  }, [channelId]);

  const user = { name: 'John Doe' }; // Active user

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
    <Box className="channel-div" sx={{ padding: 2 }}>
      <Box className="banner" sx={{ width: '100%', height: '250px', overflow: 'hidden' }}>
        <img
          src={selectedChannel?.channelBanner}
          alt="channel-banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 3, padding: 2,
      }}
      >
        <Avatar
          {...stringAvatar(selectedChannel?.channelName)}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{selectedChannel?.channelName}</Typography>
          <Box sx={{ display: 'flex', gap: 2, color: 'gray' }}>
            <Typography>{user.name}</Typography>
            <Typography>
              {selectedChannel?.subscribers?.length || 0}
              {' '}
              Subscribers
            </Typography>
            <Typography>
              {selectedChannel?.videos?.length || 0}
              {' '}
              Videos
            </Typography>
          </Box>
          <Typography sx={{ marginTop: 1 }}>{selectedChannel?.description}</Typography>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tab label="Videos" />
          <Button onClick={() => setAddVideoDialogOpen(true)}>
            <AddCircleOutlineOutlinedIcon sx={{ }} />
            <Typography variant="body2" fontWeight={600} ml={1}>Add More Videos </Typography>
          </Button>
        </Box>

      </Box>

      <AddVideoDialog
        channelId={channelId}
        onVideoCreate={fetchChannel}
        isDialogOpen={addVideoDialogOpen}
        handleClose={() => setAddVideoDialogOpen(false)}
      />

      <Box sx={{
        display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3,
      }}
      >
        {
          selectedChannel?.videos?.length
            ? (
              <Grid2 container sx={{ width: '100%' }} spacing={2}>
                {(selectedChannel?.videos || []).map((video) => (
                  <Grid2 key={video._id} item size={{ lg: 2.4 }}>
                    <VideoCard
                      video={video}
                    />
                  </Grid2>
                ))}
              </Grid2>
            )
            : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                minHeight: '200px',
              }}
              >
                <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                  You can start your own channel
                </Typography>
                <Box textAlign="center">

                  <IconButton onClick={() => setAddVideoDialogOpen(true)}>
                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: '5rem' }} />
                  </IconButton>
                </Box>
                <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                  Let&apos;s surprise everone with your content.
                </Typography>
              </Box>
            )
        }
      </Box>
    </Box>
  );
}

export default Channel;

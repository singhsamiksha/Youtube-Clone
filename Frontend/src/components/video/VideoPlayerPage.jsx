import { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid2,
  Avatar,
  Box,
  Button,
  useTheme,
  Divider,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stringAvatar } from '../../utils/common';
import { fetchVideo, getDashboardVideos, toggleVideoLikeAPI } from '../../utils/apis/videoApi';
import VideoComments from './VideoComments';

function VideoPlayerPage(props) {
  const {
    isAuthenticated,
    userData,
  } = props;

  const { userId } = userData || {};

  const { videoId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loader, setLoader] = useState(true);
  const [videoLoader, setVideoLoader] = useState(true);
  const [videoListLoader, setVideoListLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!videoId) {
      setError('Selected video does not exists on platform.');
    } else {
      fetchVideo({
        payload: { videoId },
        setters: {
          setLoader: setVideoLoader,
          setError,
          onSuccessHandler: ((v) => setSelectedVideo(v)),
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
  }, [videoId]);

  const toggleVideoLike = (value) => {
    if (!isAuthenticated) {
      navigate('/signin');
    } else {
      toggleVideoLikeAPI({
        payload: {
          videoId,
          like: value,
        },
        setters: {
          setLoader: setVideoListLoader,
          setError,
          onSuccessHandler: ({ likedBy, dislikedBy }) => {
            setSelectedVideo({
              ...selectedVideo,
              likedBy,
              dislikedBy,
            });
          },
        },
      })
        .catch((e) => setError(e?.message || 'Internal server error'));
    }
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

  const isUserLikedVideo = userId
    && isAuthenticated && selectedVideo
    && selectedVideo?.likedBy?.includes(userId);

  const isUserDislikedVideo = userId
    && isAuthenticated && selectedVideo
    && selectedVideo?.dislikedBy?.includes(userId);

  return (
    <Grid2 container justifyContent="center" spacing={2}>
      <Grid2
        item
        size={8}
      >
        {videoLoader
          ? <CircularProgress />
          : (
            <>
              <Box sx={{
                borderRadius: 5,
                width: '100%',
              }}
              >
                <ReactPlayer
                  controls
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                    facebook: {
                      appId: '12345',
                    },
                  }}
                  url={selectedVideo?.videoUrl}
                  width="100%"
                  // height="100%"
                  style={{
                    borderRadius: 5,
                  }}
                />
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
                  {' '}
                  {selectedVideo.title}
                  {' '}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar {
                      ...stringAvatar(selectedVideo.channel?.channelName, { width: 45, height: 45 })
                    }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                      <Typography variant="body1" fontWeight={450}>{selectedVideo.channel?.channelName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedVideo?.channel?.subscribers.length || '0'}
                        {' '}
                        Subscribers
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 5,
                        textTransform: 'none',
                        backgroundColor: theme.palette.text.primary,
                      }}
                      disableElevation
                    >
                      Subscribe
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      background: theme.palette.divider,
                      borderRadius: 10,
                    }}
                    >
                      <Button
                        size="small"
                        sx={{
                          borderRadius: 5,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          color: userId && isUserLikedVideo
                            ? theme.palette.background.default
                            : theme.palette.text.primary,
                          backgroundColor: userId && isUserLikedVideo ? theme.palette.text.primary : 'transparent',
                        }}
                        onClick={() => toggleVideoLike(true)}
                      >
                        <ThumbUpOutlinedIcon fontSize="small" />
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {selectedVideo.likedBy?.length || 0}
                        </Typography>
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        sx={{
                          borderRadius: 5,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          color: userId && isUserDislikedVideo
                            ? theme.palette.background.default
                            : theme.palette.text.primary,
                          backgroundColor: userId && isUserDislikedVideo ? theme.palette.text.primary : 'transparent',

                        }}
                        onClick={() => toggleVideoLike(false)}
                      >
                        <ThumbDownOutlinedIcon fontSize="small" />
                      </Button>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      sx={{
                        borderRadius: 5,
                        background: theme.palette.divider,
                        color: theme.palette.text.primary,
                      }}
                    >
                      <ReplyOutlinedIcon />
                      Share
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 5 }}>
                <VideoComments
                  video={selectedVideo}
                  setVideo={setSelectedVideo}
                />
              </Box>
            </>
          )}

      </Grid2>
      <Grid2 item size={4}>
        {videoListLoader
          ? <CircularProgress />
          : (
            <Box>
              {videos.map((video) => (
                <Card
                  key={video._id}
                  elevation={0}
                  sx={{
                    border: 'none',
                    width: '100%',
                    mb: 1,
                    // maxHeight: 110,
                    // background: 'blue',
                  }}
                >
                  <CardActionArea sx={{ display: 'flex' }} onClick={() => navigate(`/video/${video._id}`)}>
                    <Grid2 container>
                      <Grid2 item size={5}>
                        <img
                          style={{
                            width: '100%',
                            borderRadius: 10,
                          }}
                          src={video.thumbnailUrl}
                          alt={video.title}
                        />
                      </Grid2>

                      <Grid2 item size={7}>
                        <CardContent sx={{ border: 'none', p: 0, pl: 1 }}>
                          <Typography
                            width="100%"
                            variant="subtitle2"
                            fontWeight={500}
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {video.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {video.channel?.channelName}
                          </Typography>
                          <Box className="subheadings">
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.secondary',
                              }}
                            >
                              {video.views}
                              {' '}
                              Views
                              <FiberManualRecordIcon sx={{ fontSize: '5px', ml: 0.5, mr: 0.5 }} />
                              {' '}
                              {video.uploadDate}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Grid2>
                    </Grid2>

                  </CardActionArea>
                </Card>
              ))}
            </Box>
          )}
      </Grid2>

    </Grid2>
  );
}

VideoPlayerPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

export default connect(mapStateToProps)(VideoPlayerPage);

import {
  Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { connect } from 'react-redux';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { humanizeTime } from '../../utils/common';
import ChannelAvatar from './ChannelAvatar';
import { deleteVideo } from '../../utils/apis/videoApi';

function VideoCard(props) {
  const {
    allowEdit,
    channel,
    video,
    onVideoEdit,
    // Redux state
    isAuthenticated,
  } = props;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  // Handle menu open
  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onEdit = () => {
    console.log('edit viewo ', video);
  };
  const onDelete = () => {
    deleteVideo({
      payload: {
        videoId: video._id,
      },
      setters: {
        onSuccessHandler: onVideoEdit,
        setError: () => {},
      },
    });
  };

  const handleCardClick = (event) => {
    if (anchorEl) {
      event.stopPropagation();
    } else {
      navigate(`/video/${video._id}`);
    }
  };

  return (
    <Card elevation={0} onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="180"
        image={video.thumbnailUrl}
        sx={{
          borderRadius: 2,
        }}
        alt={video._id}
      />
      <CardContent sx={{ padding: 0, paddingTop: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', position: 'relative' }}>
          <ChannelAvatar
            channel={channel}
            sx={{
              width: 35,
              height: 35,
              mr: 1,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight={500}>
              {video.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {video.uploadedBy?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {video.views}
              {' '}
              Views
              <FiberManualRecordIcon sx={{ fontSize: 5, color: 'text.secondary' }} />
              {humanizeTime(video.createdAt)}
            </Typography>

          </Box>
          {allowEdit && isAuthenticated ? (
            <Box>

              <IconButton
                sx={{
                  flex: 1,
                }}
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          ) : ''}

        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ marginTop: 1 }}
      >
        <MenuItem onClick={() => { onEdit(video); handleMenuClose(); }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => { onDelete(video); handleMenuClose(); }}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}

VideoCard.propTypes = {
  allowEdit: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  video: PropTypes.instanceOf(Object).isRequired,
  channel: PropTypes.instanceOf(Object).isRequired,
  onVideoEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(VideoCard);

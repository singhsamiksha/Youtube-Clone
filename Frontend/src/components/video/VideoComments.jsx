import {
  Typography,
  Avatar,
  Box,
  Button,
  useTheme,
} from '@mui/material';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stringAvatar } from '../../utils/common';
import CommentPush from './CommentPush';

function VideoComments(props) {
  const {
    video,
    setVideo,
    // isAuthenticated,
    // userData,
  } = props;

  const theme = useTheme();

  const updateVideoComments = (comments) => {
    setVideo({ ...video, comments });
  };

  return (
    <>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        {video.comments?.length || 0}
        {' '}
        Comments
      </Typography>

      <CommentPush
        video={video}
        updateVideoComments={updateVideoComments}
      />

      {
        (video.comments || []).map((comment) => (
          <Box
            key={comment._id}
            sx={{
              display: 'flex',
              mb: 2,
            }}
          >
            <Avatar {
              ...stringAvatar(comment.userId?.username)
            }
            />

            <Box sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  @
                  {comment?.userId?.username}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {comment?.timestamp}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ width: '100%' }}>
                {comment.text}
              </Typography>

              <Box sx={{ display: 'flex', mt: 1 }}>

                <Button
                  size="small"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  <ThumbUpOutlinedIcon fontSize="small" />
                  <Typography sx={{ ml: 1 }} variant="subtitle2">
                    {comment.likedBy?.length || 0}
                  </Typography>
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  <ThumbDownOutlinedIcon fontSize="small" />
                </Button>

              </Box>

            </Box>

          </Box>
        ))
      }
    </>
  );
}

VideoComments.propTypes = {
  video: PropTypes.instanceOf(Object).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  setVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

export default connect(mapStateToProps)(VideoComments);

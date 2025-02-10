import { useState } from 'react';
import {
  Alert,
  Grid2,
  Box,
  Button,
  useTheme,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postCommentForVideoAPI } from '../../utils/apis/videoApi';
import UserAvatar from '../common/UserAvatar';

function CommentPush(props) {
  const {
    video,
    updateVideoComments,

    isAuthenticated,
    userData,
  } = props;

  const { videoId } = useParams();
  const theme = useTheme();

  const [commentText, setCommentText] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const submitCommentForVideo = () => {
    if (videoId && commentText) {
      postCommentForVideoAPI({
        payload: { videoId: video._id, commentText },
        setters: {
          setLoader,
          setError,
          onSuccessHandler: ((comments) => {
            updateVideoComments(comments);
            setCommentText('');
          }),
        },
      })
        .catch((e) => setError(e?.message || 'Internal server error'));
    }
  };

  return (
    <>
      {error
        ? (
          <Grid2 container sx={{ width: '100%', mt: 5 }} justifyContent="center" alignItems="center">
            <Grid2 item width="100%">
              <Alert severity="error">{error}</Alert>
            </Grid2>
          </Grid2>
        )
        : ''}
      {isAuthenticated
        ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
          >
            <UserAvatar user={userData} />
            <Box
              sx={{
                width: '100%',
                textAlign: 'right',
              }}
            >
              <TextField
                fullWidth
                label="Add a comment"
                variant="standard"
                value={commentText}
                color={theme.palette.text.primary}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <Button
                size="small"
                disableElevation
                sx={{
                  borderRadius: 5,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              >
                Cancel
              </Button>

              <Button
                size="small"
                variant="contained"
                sx={{
                  mt: 1,
                  ml: 1,
                  borderRadius: 5,
                  textTransform: 'none',
                }}
                loading={loader}
                disableElevation
                disabled={!commentText}
                onClick={submitCommentForVideo}
              >
                Comment
              </Button>
            </Box>
          </Box>
        )

        : ''}

    </>
  );
}

CommentPush.propTypes = {
  video: PropTypes.instanceOf(Object).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  updateVideoComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

export default connect(mapStateToProps)(CommentPush);

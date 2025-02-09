import {
  Typography,
  Avatar,
  Box,
  Button,
  useTheme,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { stringAvatar } from '../../utils/common';
import CommentPush from './CommentPush';
import { deleteCommentAPI, editCommentAPI, toggleCommentLikeAPI } from '../../utils/apis/videoApi';

function VideoComments(props) {
  const {
    video,
    setVideo,
    isAuthenticated,
    userData,
  } = props;

  const { userId } = userData || {};
  const theme = useTheme();

  const [editMode, setEditMode] = useState(false);

  const updateVideoComments = (comments) => {
    setVideo({ ...video, comments });
  };

  const toggleCommentLike = (value, comment) => {
    if (isAuthenticated) {
      // navigate('/signin');
    // } else {
      toggleCommentLikeAPI({
        payload: {
          videoId: video?._id,
          commentId: comment?._id,
          like: value,
        },
        setters: {
          setLoader: () => {},
          setError: () => {},
          onSuccessHandler: (comments) => {
            updateVideoComments(comments);
          },
        },
      })
        .catch(() => {});
    }
  };

  const deleteComment = (comment) => {
    deleteCommentAPI({
      payload: {
        videoId: video?._id,
        commentId: comment?._id,
      },
      setters: {
        setLoader: () => {},
        setError: () => {},
        onSuccessHandler: (comments) => {
          updateVideoComments(comments);
        },
      },
    })
      .catch(() => {});
  };
  const submitCommentEditForVideo = () => {
    editCommentAPI({
      payload: {
        videoId: video?._id,
        commentId: editMode?._id,
        commentText: editMode.text,
      },
      setters: {
        setLoader: () => {},
        setError: () => {},
        onSuccessHandler: (comments) => {
          updateVideoComments(comments);
          setEditMode(false);
        },
      },
    })
      .catch(() => {});
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
        (video.comments || []).map((comment) => {
          const isUserLikedVideo = userId
          && isAuthenticated && comment
          && comment?.likedBy?.includes(userId);

          const isUserDislikedVideo = userId
          && isAuthenticated && comment
          && comment?.dislikedBy?.includes(userId);

          return (
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

                {
                  editMode && editMode?._id === comment?._id
                    ? (
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
                          value={editMode.text}
                          color={theme.palette.text.primary}
                          onChange={(e) => setEditMode({
                            ...editMode,
                            text: e.target.value,
                          })}
                        />

                        <Button
                          size="small"
                          disableElevation
                          sx={{
                            borderRadius: 5,
                            mt: 1,
                            color: theme.palette.text.primary,
                          }}
                          onClick={() => setEditMode(false)}
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
                          disableElevation
                          disabled={!editMode.text}
                          onClick={submitCommentEditForVideo}
                        >
                          Comment
                        </Button>
                      </Box>
                    )
                    : (
                      <Typography variant="body2" sx={{ width: '100%' }}>
                        {comment.text}
                      </Typography>
                    )
                }

                <Box sx={{ display: 'flex', mt: 1 }}>
                  <Button
                    size="small"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                    onClick={() => toggleCommentLike(true, comment)}
                  >
                    {
                      isUserLikedVideo
                        ? <ThumbUpIcon fontSize="small" />
                        : <ThumbUpOutlinedIcon fontSize="small" />
                    }
                    <Typography sx={{ ml: 1 }} variant="subtitle2">
                      {comment.likedBy?.length || 0}
                    </Typography>
                  </Button>
                  <Button
                    // size="small"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                    onClick={() => toggleCommentLike(false, comment)}
                  >
                    {
                      isUserDislikedVideo
                        ? <ThumbDownIcon fontSize="small" />
                        : <ThumbDownOutlinedIcon fontSize="small" />
                    }
                  </Button>
                  {
                    isAuthenticated && userId && comment?.userId?._id === userId
                      ? (
                        <>
                          <Divider orientation="vertical" flexItem />
                          <IconButton
                            size="small"
                            sx={{
                              ml: 2,
                              color: theme.palette.text.primary,
                            }}
                            onClick={() => setEditMode(comment)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: theme.palette.text.primary,
                            }}
                            onClick={() => deleteComment(comment)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )
                      : ''
                  }
                </Box>
              </Box>
            </Box>
          );
        })
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

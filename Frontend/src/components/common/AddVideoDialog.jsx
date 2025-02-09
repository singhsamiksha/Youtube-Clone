import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { embedYouTube } from '../../utils/apis';
import { updateUserChannels } from '../../redux/userSlice';
import { isValidYouTubeUrl } from '../../utils/common';
import { uploadVideo } from '../../utils/apis/videoApi';
import { VIDEO_CATEGORIES } from '../../constants';

function AddVideoDialog(props) {
  const {
    channelId,
    onVideoCreate,

    isDialogOpen,
    handleClose,
  } = props;

  const [videoLink, setVideoLink] = useState('');
  const [isValidVideoLink, setIsValidVideoLink] = useState(false);

  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [videoCategory, setVideoCategory] = useState('');

  const [videoTitleError, setVideoTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [videoLinkError, setVideoLinkError] = useState('');

  const [error, setError] = useState('');

  const [loader, setLoader] = useState(false);

  const resetForm = () => {
    setVideoLink('');
    setIsValidVideoLink('');
    setThumbnailURL('');
    setVideoTitle('');
    setDescription('');
    setVideoCategory('');

    setVideoTitleError('');
    setDescriptionError('');
    setVideoLinkError('');
  };

  useEffect(() => {
    if (isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  const handleURLUpdate = (e) => {
    const { value } = e.target;
    setVideoLink(value);

    if (!isValidYouTubeUrl(value)) {
      setVideoLinkError('Please provide correct youtube video URL');
    } else {
      setVideoLinkError('');
    }
  };

  const handleCreateChannel = async () => {
    if (!isValidVideoLink && isValidYouTubeUrl(videoLink)) {
      embedYouTube(videoLink).then((result) => {
        if (result?.title) {
          setIsValidVideoLink(true);
          setVideoTitle(result.title);
          setThumbnailURL(result.thumnailURL);
        } else {
          setVideoLinkError('Provided URL is not accesible');
        }
      });
      return;
    }

    let isValid = true;
    setLoader(true);
    if (!videoTitle) {
      isValid = false;
      setVideoTitleError('Video Title required');
    }
    if (!description) {
      isValid = false;
      setDescriptionError('Video Description required');
    }

    if (isValid) {
      setVideoTitleError('');
      setVideoLinkError('');
      setDescriptionError('');

      uploadVideo({
        payload: {
          youtubeURL: videoLink,
          videoTitle,
          videoDescription: description,
          videoThumbnailURL: thumbnailURL,
          videoCategory,
          channelId,
        },
        setters: {
          setLoader,
          onSuccessHandler: () => {
            onVideoCreate();
            handleClose();
          },
          setError,
        },
      });
    }

    setLoader(false);
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload your video</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your video details below:</DialogContentText>
        {
          !isValidVideoLink
            ? (
              <TextField
                required
                fullWidth
                margin="dense"
                label="YouTube video URL"
                variant="standard"
                value={videoLink}
                error={videoLinkError}
                helperText={videoLinkError}
                onChange={handleURLUpdate}
              />
            )
            : (
              <Box>
                <Box sx={{
                  textAlign: 'center',
                  width: '100%',
                }}
                >
                  <img
                    src={thumbnailURL}
                    alt={videoTitle}
                  />
                </Box>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  margin="dense"
                  label="Channel Name"
                  variant="standard"
                  value={videoTitle}
                  error={videoTitleError}
                  helperText={videoTitleError}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
                <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={videoCategory}
                    label="Age"
                    onChange={(e) => setVideoCategory(e.target.value)}
                  >
                    {Object.values(VIDEO_CATEGORIES)
                      .map((category) => (
                        <MenuItem
                          key={category}
                          value={category}
                        >
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  fullWidth
                  multiline
                  margin="dense"
                  label="Description"
                  variant="standard"
                  rows={3}
                  value={description}
                  error={descriptionError}
                  helperText={descriptionError}
                  onChange={(e) => setDescription(e.target.value)}
                />

              </Box>
            )
        }
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: '100%', p: 2, pt: 0 }}>
          {error
            ? (
              <Stack sx={{ width: '100%', paddingBottom: 1 }} spacing={2}>
                <Alert severity="error">{error}</Alert>
              </Stack>
            )
            : ''}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            {
              isValidVideoLink
                ? (
                  <Button
                    onClick={() => resetForm()}
                  >
                    Back to video link
                  </Button>
                )
                : <Typography />
            }
            <Box>

              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                loading={loader}
                variant="contained"
                disabled={loader}
                onClick={handleCreateChannel}
              >
                {!isValidVideoLink ? 'Next' : 'Upload Video'}
              </Button>
            </Box>

          </Box>
        </Box>

      </DialogActions>
    </Dialog>
  );
}

AddVideoDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

  channelId: PropTypes.string.isRequired,
  onVideoCreate: PropTypes.func.isRequired,
};

const mapDispatchToProp = (dispatch) => ({
  updateUserChannelsData: (data) => dispatch(updateUserChannels(data)),
});

export default connect(null, mapDispatchToProp)(AddVideoDialog);

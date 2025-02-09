import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { validateImageUrl } from '../../utils/apis';
import { updateUserChannels } from '../../redux/userSlice';
import { createChannelAPI } from '../../utils/apis/channelApi';

function CreateChannelDialog(props) {
  const {
    isDialogOpen,
    handleClose,
  } = props;

  const [channelName, setChannelName] = useState('My Channel 1');
  const [description, setDescription] = useState('This is first channel descriptions');
  const [channelBanner, setChannelBanner] = useState('https://png.pngtree.com/thumb_back/fh260/back_pic/02/50/63/71577e1cf59d802.jpg');

  const [channelNameError, setChannelNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [channelBannerError, setChannelBannerError] = useState('');

  const [error, setError] = useState('');

  const [loader, setLoader] = useState(false);

  const handleCreateChannel = async () => {
    let isValid = true;
    setLoader(true);
    if (!channelName) {
      isValid = false;
      setChannelNameError('Channel Name required');
    }
    if (!description) {
      isValid = false;
      setDescriptionError('Channel Name required');
    } if (!channelBanner) {
      isValid = false;
      setChannelBannerError('Channel Name required');
    } else {
      const imageValid = await validateImageUrl(channelBanner);
      if (!imageValid.isValid) {
        isValid = false;
        setChannelBannerError(imageValid.message);
      }
    }

    if (isValid) {
      setChannelNameError('');
      setChannelBannerError('');
      setDescriptionError('');

      createChannelAPI({
        payload: {
          channelName,
          description,
          channelBanner,
        },
        setters: {
          setLoader,
          onSuccess: (channels) => {
            updateUserChannels(channels || []);
            handleClose();
          },
          setError,
        },
      });
    }

    setLoader(false);
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Create Your Channel</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your channel details below:</DialogContentText>
        <TextField
          autoFocus
          required
          fullWidth
          margin="dense"
          label="Channel Name"
          variant="standard"
          value={channelName}
          error={channelNameError}
          helperText={channelNameError}
          onChange={(e) => setChannelName(e.target.value)}
        />
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
        <TextField
          required
          fullWidth
          margin="dense"
          label="Channel Banner URL"
          variant="standard"
          value={channelBanner}
          error={channelBannerError}
          helperText={channelBannerError}
          onChange={(e) => setChannelBanner(e.target.value)}
        />
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
          <Box sx={{ textAlign: 'right', mt: 2 }}>
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
              Create Channel
            </Button>
          </Box>
        </Box>

      </DialogActions>
    </Dialog>
  );
}

CreateChannelDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProp = (dispatch) => ({
  updateUserChannelsData: (data) => dispatch(updateUserChannels(data)),
});

export default connect(null, mapDispatchToProp)(CreateChannelDialog);

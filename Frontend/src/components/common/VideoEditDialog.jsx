import { useState } from 'react';
import {

  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { updateVideo } from '../../utils/apis/videoApi';

function VideoEditDialog(props) {
  const {
    isOpen,
    handleClose,
    video,
  } = props;

  const [editedTitle, setEditedTitle] = useState(video.title);
  const [editedDescription, setEditedDescription] = useState(video.description);

  const handleDialogClose = () => {
    handleClose(false);
  };

  const handleSaveChanges = () => {
    updateVideo({
      payload: {
        videoId: video._id,
        title: editedTitle,
        description: editedDescription,
      },
      setters: {
        onSuccessHandler: () => handleClose(true),
        setError: () => {},
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>Edit Video</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          sx={{ marginBottom: 2 }}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} disabled={!editedDescription || !editedTitle} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

VideoEditDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  video: PropTypes.instanceOf(Object).isRequired,
};

export default VideoEditDialog;

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CreateChannelDialog = (props) => {
  const {
    isDialogOpen,
    handleClose,
    handleCreateChannel,
    channelName,
    setChannelName,
    description,
    setDescription,
    channelBanner,
    setChannelBanner,
  } = props;

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Create Your Channel</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your channel details below:</DialogContentText>
        <TextField
          autoFocus required fullWidth margin='dense' label='Channel Name' variant='standard'
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <TextField
          required fullWidth multiline margin='dense' label='Description' variant='standard' rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required fullWidth margin='dense' label='Channel Banner URL' variant='standard'
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateChannel}>Create Channel</Button>
      </DialogActions>
    </Dialog>
  );
};

CreateChannelDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreateChannel: PropTypes.func.isRequired,
  channelName: PropTypes.string.isRequired,
  setChannelName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  channelBanner: PropTypes.string.isRequired,
  setChannelBanner: PropTypes.func.isRequired,
};

export default CreateChannelDialog;

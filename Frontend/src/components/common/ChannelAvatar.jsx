import PropTypes from 'prop-types';

// MUI Components
import { Avatar } from '@mui/material';

function ChannelAvatar(props) {
  const {
    channel, sx = {},
  } = props;

  return (
    <Avatar
      sx={sx}
      src={channel?.channelIcon}
      alt={channel?.channelName}
    />
  );
}

ChannelAvatar.propTypes = {
  channel: PropTypes.instanceOf(Object).isRequired,
  sx: PropTypes.instanceOf(Object).isRequired,
};

export default ChannelAvatar;

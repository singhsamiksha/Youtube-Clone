import PropTypes from 'prop-types';

// MUI Components
import { Avatar } from '@mui/material';

// Utils
import { stringAvatar } from '../../utils/common';

function UserAvatar(props) {
  const {
    user, sx = {},
  } = props;

  if (user.avatar) {
    return <Avatar alt={user.displayName} src={user.avatar} sx={sx} />;
  }

  return (
    <Avatar {...stringAvatar(user?.displayName)} sx={sx} />
  );
}

UserAvatar.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  sx: PropTypes.instanceOf(Object).isRequired,
};

export default UserAvatar;

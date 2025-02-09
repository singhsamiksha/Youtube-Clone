import {
  Avatar, Box, Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { stringAvatar } from '../../utils/common';

function VideoCard(props) {
  const { video } = props;

  const navigate = useNavigate();

  return (
    <Card elevation={0} onClick={() => navigate(`/video/${video._id}`)} sx={{ cursor: 'pointer' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Avatar {
                  ...stringAvatar(video.uploadedBy.name, {
                    width: 35,
                    height: 35,
                    mr: 1,
                  })}
          />
          <Box>
            <Typography variant="body1" fontWeight={500}>
              {video.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {video.uploadedBy.name}
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
              {' '}
              <FiberManualRecordIcon sx={{ fontSize: 5, color: 'text.secondary' }} />
              {' '}
              {video.uploadDate}
            </Typography>
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}

VideoCard.propTypes = {
  video: PropTypes.instanceOf(Object).isRequired,
};

export default VideoCard;

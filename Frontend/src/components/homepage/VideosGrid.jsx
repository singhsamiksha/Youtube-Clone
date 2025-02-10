import { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Alert,
  Grid2,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { getDashboardVideos } from '../../utils/apis/videoApi';
import VideoCard from '../common/VideoCard';

function VideosGrid({
  selectedCategory,
}) {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardVideos({
      payload: {
        search: searchParams.get('search'),
      },
      setters: {
        setLoader,
        setError,
        onSuccessHandler: ((v) => setVideos(v)),
      },
    })
      .catch((e) => setError(e?.message || 'Internal server error'));
  }, [searchParams]);

  // Filter videos based on search and selected category
  const filteredVideos = videos.filter((video) => (selectedCategory === 'All' ? true : video.category === selectedCategory));

  if (error) {
    return (
      <Grid2 container sx={{ width: '100%', mt: 5 }} justifyContent="center" alignItems="center">
        <Grid2 item>
          <Alert severity="error">{error}</Alert>
        </Grid2>
      </Grid2>
    );
  }

  if (loader) {
    return (
      <Grid2 container sx={{ width: '100%', mt: 20 }} justifyContent="center" alignItems="center">
        <Grid2 item textAlign="center">
          <CircularProgress />
          <Typography variant="body2">
            Fetching you videos...
          </Typography>
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Grid2 container spacing={1}>
      {filteredVideos.map((video) => (
        <Grid2
          key={video._id}
          size={{
            xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4,
          }}
        >
          <VideoCard video={video} />
        </Grid2>
      ))}

    </Grid2>
  );
}

VideosGrid.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default VideosGrid;

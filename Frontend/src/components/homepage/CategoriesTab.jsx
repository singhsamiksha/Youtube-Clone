import { Box, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { VIDEO_CATEGORIES } from '../../constants';

function CategoriesTab(props) {
  const { selectedCategory, setSelectedCategory } = props;

  const categories = Object.values(VIDEO_CATEGORIES);

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        gap: 1,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          clickable
          label={category}
          sx={{
            bgcolor: selectedCategory === category ? 'black' : '#f1f1f1',
            color: selectedCategory === category ? 'white' : 'black',
            fontWeight: 500,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: selectedCategory === category ? 'black' : '#e0e0e0',
            },
          }}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </Box>
  );
}

CategoriesTab.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoriesTab;

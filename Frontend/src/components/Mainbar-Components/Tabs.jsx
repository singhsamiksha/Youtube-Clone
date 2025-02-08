import React from 'react';
import { Box, Chip } from '@mui/material';

function Tabs({ categories, selectedCategory, setSelectedCategory }) {
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
      {categories.map(category => (
        <Chip
          key={category}
          label={category}
          clickable
          onClick={() => setSelectedCategory(category)}
          sx={{
            bgcolor: selectedCategory === category ? 'black' : '#f1f1f1',
            color: selectedCategory === category ? 'white' : 'black',
            fontWeight: 500,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: selectedCategory === category ? 'black' : '#e0e0e0',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default Tabs;

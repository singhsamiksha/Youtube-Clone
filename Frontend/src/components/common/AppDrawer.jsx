import PropTypes from 'prop-types';
import { useState } from 'react';
import Header from './Header';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../HomePage-Components/Sidebar';
import SideDetailbar from '../HomePage-Components/SideDetailbar';

const AppDrawer = (props) => {
  const { children } = props;

  const [activeSidebar, setActiveSidebar] = useState(false);

  const handleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  return (
    <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <Header toggleSidebar={handleSidebar} />
      <Box sx={{ width: '100%', height: '100vh', display: 'flex' }}>
        <Box sx={{ overflowY: 'auto', scrollbarWidth: 'none', minWidth: 'fit-content' }}>
          <Toolbar/>
          {activeSidebar === false ? <Sidebar /> : <SideDetailbar />}
        </Box>
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

AppDrawer.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default AppDrawer;

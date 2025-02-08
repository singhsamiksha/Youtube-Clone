import Header from '../common/Header.jsx';
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';
import Welcomebar from './Welcomebar';
import Signin from '../Signin-components/Signin.jsx';
import SideDetailbar from './SideDetailbar';
import '../../Stylesheets/HomePage.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [userState, setUserState] = useState(false);
  const [activeMainbar, setActiveMainbar] = useState(false);
  const [search, setSearch] = useState('');

  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const handleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  const handleUserState = () => {
    setUserState(!userState);
  };

  const handleMainbar = () => {
    setActiveMainbar(!activeMainbar);
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    userState === true
      ? <Signin handleUserState={handleUserState} handleMainbar={handleMainbar} />
      : (
        <div className='main-page'>
          <div className='header-div'>
            <Header handleSidebar={handleSidebar} handleUserState={handleUserState} handleSearch={handleSearch} isAuthenticated={isAuthenticated} />
          </div>
          <div className='center-div'>
            <div>
              {activeSidebar === false ? <Sidebar /> : <SideDetailbar />}
            </div>
            <div style={{ position: 'relative' }}>
              {activeMainbar === false && isAuthenticated === false ? <Welcomebar /> : <Mainbar search={search} />}
            </div>
          </div>
        </div>
      )
  );
};

export default HomePage;

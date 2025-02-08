import Header from '../common/Header.jsx';
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';
import Welcomebar from './Welcomebar';
import Signin from '../Signin-components/Signin.jsx';
import SideDetailbar from './SideDetailbar';
import '../../Stylesheets/HomePage.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomePage = (props) => {
  const {
    isAuthenticated,
    userData,
  } = props;

  const [activeSidebar, setActiveSidebar] = useState(false);
  const [userState, setUserState] = useState(false);
  const [activeMainbar, setActiveMainbar] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('users data', { isAuthenticated,
      userData });
  }, [isAuthenticated, userData]);

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

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userData: state.user.user,
});

export default connect(mapStateToProps)(HomePage);


import '../Stylesheets/Header.css';


function Header(){

    return(<div className='Header'>
        <div className='left-header'>
            <button className="toggle-button">
                <img src="https://www.svgrepo.com/show/94793/menu-button-of-three-horizontal-lines.svg" className="toggle-image"></img>
            </button>
            <button className='logo-button'>
                <img src='https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png' className="logo-image"></img>
            </button>
        </div>
        <div className='center-header'>
            <input className="search-bar" type="text" placeholder="Search" />
            <button className="search-button">
                <img
                src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
                className="search-icon"
                alt="Search"
                />
            </button>
        </div>
        <div className='right-header'>
          <button className='profile-button'>
            <img src='https://cdn-icons-png.flaticon.com/512/9706/9706640.png' className='profile-icon'></img>
            <span className='sign-text'>Sign in</span>
          </button>
        </div>
    
    </div>);
}
export default Header;
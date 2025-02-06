import '../../Stylesheets/Header.css';
import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { IconButton, TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/userSlice";

function Header({ handleSidebar, handleUserState, handleSearch, isAuthenticated }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    const demoSession = {
        user: {
            name: user?.username || "Guest",
            email: user?.email || "guest@example.com",
            image: 'https://fotoscluster.com/wp-content/uploads/2024/11/salwar-suit-girl-dp-image%E2%80%8B.jpg',
        },
    };

    const [session, setSession] = React.useState(demoSession);

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession(demoSession);
            },
            signOut: () => {
                handleLogout();
                setSession(null);
            },
        };
    }, []);

    function handleClick() {
        handleSearch();
    }

    return (
        <div className='Header'>
            <div className='left-header'>
                <IconButton aria-label="menu" size="medium" onClick={handleSidebar}>
                    <DensityMediumIcon fontSize="inherit" />
                </IconButton>
                <button className='logo-button'>
                    <img src='https://download.logo.wine/logo/YouTube/YouTube-Logo.wine.png' className="logo-image" alt="YouTube Logo" />
                </button>
            </div>
            <div className='center-header'>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    className="search-bar"
                    sx={{
                        width: 400,
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'hsl(0, 4.00%, 95.10%)',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClick}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleSearch}
                />
            </div>
            <div className='right-header'>
                {isAuthenticated ? (
                    <AuthenticationContext.Provider value={authentication}>
                        <SessionContext.Provider value={session}>
                            {/* preview-start */}
                            <Account />
                            {/* preview-end */}
                        </SessionContext.Provider>
                    </AuthenticationContext.Provider>
                ) : (
                    <Button variant="outlined" startIcon={<AccountCircleIcon />} onClick={handleUserState}>
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;

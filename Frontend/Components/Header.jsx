import '../Stylesheets/Header.css';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { IconButton, TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

function Header({ toggleSidebar }){
    return(
        <div className='Header'>
            <div className='left-header'>
                <IconButton aria-label="menu" size="medium" onClick={toggleSidebar}>
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
                                borderColor: 'rgb(243, 242, 242)',
                            },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className='right-header'>
                <Button variant="outlined" startIcon={<AccountCircleIcon />}>Sign in</Button>
            </div>
        </div>
    );
}

export default Header;

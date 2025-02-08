import '../../Stylesheets/Header.css';
import React, { useState, useMemo } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { IconButton, TextField, Button, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/userSlice";
import { postChannel } from '../../Utilites/Apis';

function Header({ handleSidebar, handleUserState, handleSearch, isAuthenticated }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [error, setError] = useState("");

    // State for channel form
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelBanner, setChannelBanner] = useState("");
    const [subscribers, setSubscribers] = useState(0);
    const [videos, setVideos] = useState([]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const demoSession = {
        user: {
            name: user?.username || user?.data?.username || "Guest",
            email: user?.email || user?.data?.email || "guest@example.com",
            image: user?.image || user?.data?.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        },
    };
    

    const handleCreateChannel = async () => {
        console.log("Sending data:", {
            channelName,
            owner: user?.username,
            description,
            channelBanner,
            subscribers,
            videos
        });
        try {
            const owner = user?.username || user?.data?.username;
            const channel = await postChannel(channelName, owner, description, channelBanner, subscribers, videos);
            console.log("Channel Created Successfully:", channel);
        } catch (error) {
            setError("Failed to create channel.");
        }
    };

    const handleVideoUpload = (event) => {
        setVideos(event.target.files);
    };

    const [session, setSession] = useState(demoSession);
    const authentication = useMemo(() => ({
        signIn: () => setSession(demoSession),
        signOut: () => {
            handleLogout();
            setSession(null);
        },
    }), []);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                            '& fieldset': { borderColor: 'hsl(0, 4.00%, 95.10%)' },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
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
                            <Account />
                            <Button variant="outlined" onClick={handleClickOpen}>View my channel</Button>
                        </SessionContext.Provider>
                    </AuthenticationContext.Provider>
                ) : (
                    <Button variant="outlined" startIcon={<AccountCircleIcon />} onClick={handleUserState}>
                        Sign in
                    </Button>
                )}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Channel Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your channel details below:</DialogContentText>
                    <TextField autoFocus required margin="dense" label="Channel Name" fullWidth variant="standard" 
                        onChange={(e) => setChannelName(e.target.value)} 
                    />

                    <TextField required margin="dense" label="Description" fullWidth variant="standard" multiline rows={3} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />

                    <TextField required margin="dense" label="Channel Banner URL" fullWidth variant="standard" 
                        onChange={(e) => setChannelBanner(e.target.value)} 
                    />

                    <TextField required margin="dense" label="Subscribers" fullWidth variant="standard" type="number" 
                        onChange={(e) => setSubscribers(Number(e.target.value))} 
                    />

                    <TextField required margin="dense" label="Upload Videos" fullWidth variant="standard" type="file" inputProps={{ multiple: true }}
                        onChange={(e) => setVideos([...e.target.files])} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateChannel}>Create Channel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Header;

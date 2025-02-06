import React, { useState } from "react";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Page5({image,handleImageChange,handleClick,setPage,open,handleClose}){
    return(
        <>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
            Your Avatar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please upload your profile picture.
          </Typography>
          <Box sx={{ width: '100%', marginBottom: '50px' }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={
                image ? (
                  <img
                    src={image}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ width: '100px', height: '100px' }} />
                )
              }
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="text" onClick={() => setPage(4)}>
                Back
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#1A73E8' }} onClick={handleClick}>
                Finish
              </Button>
            </Box>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={
              <span style={{ display: 'flex', alignItems: 'center', color: 'white' }} className="avatar">
                <CheckCircleIcon style={{ marginRight: 8, color: 'green' }} />
                Your Account is Successfully Created!
              </span>
            }
            sx={{ backgroundColor: 'white' }}
          />
        </>
      )
}
export default Page5;
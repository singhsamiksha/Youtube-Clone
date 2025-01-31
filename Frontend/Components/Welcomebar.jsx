import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Welcomebar() {
    return (
        <Box 
            component="section" 
            sx={{ 
                backgroundColor: "#F0F0F0", 
                padding: '20px 60px',
                margin: '30px 300px', 
                border: "solid 1px #D8D8D8",
                borderRadius: "10px"
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px', textAlign:"center" }}>
                Try searching to get started
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', textAlign:"center", color: "#808080" }}>
                Start watching videos to help us build a feed of videos you'll love.
            </Typography>
        </Box>
    );
}

export default Welcomebar;

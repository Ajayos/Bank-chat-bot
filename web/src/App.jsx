import * as React from 'react';
import { Box, Fab, Grid, Popover, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './ChatBox';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const an = window.navigator.userAgent.includes("Android") ? true : false;
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6} lg={4}>
        <Box position="fixed" left="10%" transform="translateX(-50%)" zIndex={1000}>
          <Typography
            variant="h1"
            style={{
              color: 'green',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 10px 8px rgba(255, 0, 0, 0.2)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
             BOT DEMO
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Fab
          color="primary"
          aria-label="bot"
          onClick={handleClick}
          style={{
            position: 'fixed',
            bottom: an ? 20 : 80,
            right: an ? 20: 50,
          }}
        >
          <ChatIcon />
        </Fab>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              width: '430px', // Set your desired width
              height: '510px', // Set your desired height
            },
          }}
        >
          <ChatBox />
        </Popover>
      </Grid>
    </Grid>
  );
}

export default App;

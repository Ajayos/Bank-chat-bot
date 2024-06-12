import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Avatar, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttons, setButtons] = useState([
    { name: 'Debit', res: 'debit' },
    { name: 'Credit', res: 'credit' },
    { name: 'Info', res: 'info' },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    setMessages([...messages, { type: 'user', content }]);
    setLoading(true);
    setInputValue('');
    setButtons([]);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      const result = await response.json();

      setLoading(false);

      if (result.messages) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', content: result.messages },
        ]);
      }

      if (result.buttons) {
        setButtons(result.buttons);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending message:', error);
    }
  };

  const handleInputSend = () => {
    if (inputValue.trim() !== '') {
      handleSendMessage(inputValue.trim());
    }
  };

  const handleButtonClick = (content) => {
    handleSendMessage(content);
  };

  return (
    <Box p={2} width={400}>
      <Typography variant="h6" gutterBottom>
        Bank Assistance for You
      </Typography>
      <Box height={300} mb={2} overflow="auto" border={1} p={1}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={msg.type === 'user' ? 'row-reverse' : 'row'}
            alignItems="center"
            mb={1}
          >
            <Avatar>
              {msg.type === 'user' ? <PersonIcon /> : <SmartToyIcon />}
            </Avatar>
            <Box
              ml={msg.type === 'user' ? 1 : 2}
              mr={msg.type === 'user' ? 2 : 1}
              p={1}
              bgcolor={msg.type === 'user' ? 'primary.main' : 'grey.300'}
              color={msg.type === 'user' ? 'white' : 'black'}
              borderRadius={2}
            >
              <Typography>{msg.content}</Typography>
            </Box>
          </Box>
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      {buttons.length > 0 ? (
        <Grid container spacing={1}>
          {buttons.map((button, index) => (
            <Grid item key={index} xs={buttons.length > 2 ? 4 : 6}> {/* Adjust column width based on the number of buttons */}
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleButtonClick(button.res)}
              >
                {button.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex">
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Enter text"
            variant="outlined"
            fullWidth
            disabled={loading}
          />
          <Button
            onClick={handleInputSend}
            variant="contained"
            color="primary"
            style={{ marginLeft: '8px' }}
            disabled={loading}
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;

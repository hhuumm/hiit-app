import logo from './logo.svg';
import './App.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useState , useRef } from 'react';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const timeRef = useRef(0);

  function toggleWorkout() {
    if (isRunning) {
      stopWorkout();
    } else {
      startWorkout();
    }

    function startWorkout() {
      setTime(60);
      timeRef.current = 60; // Set the latest time value
      const interval = setInterval(() => {
        timeRef.current = timeRef.current - 1; // Use the latest time value
        setTime(timeRef.current);
        if (timeRef.current === 0) {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 1000);
      setIntervalId(interval); // Save the interval ID in state
      setIsRunning(true);
    }

    function stopWorkout() {
      setTime(0);
      setIsRunning(false);
      clearInterval(intervalId); // Clear the interval using the saved ID
      setIntervalId(null); // Reset the interval ID to null
    }
    
  }

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (

 
    <div className="App">
    <Stack>
        <Item>
        <h1>{time}</h1>
        </Item>
        <Item>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
              <ToggleButton value="left" aria-label="left aligned">
              <span role="img" aria-label="fire">🔥</span>
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
              <span role="img" aria-label="fire">🔥</span>
              <span role="img" aria-label="fire">🔥</span>
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
              <span role="img" aria-label="fire">🔥</span>
              <span role="img" aria-label="fire">🔥</span>
              <span role="img" aria-label="fire">🔥</span>
              </ToggleButton>
          </ToggleButtonGroup>
        </Item>
        <Item>

        <Button
          variant={isRunning ? 'outlined' : 'contained'}
          color={isRunning ? 'error' : 'primary'}
          style={{ marginTop: '1rem' }}
          onClick={toggleWorkout}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        </Item>
        
        
    </Stack>
   


    </div>
  );
}
export default App;

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
import AudioPlayer from 'react-audio-player';

function App() {
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const rap = useRef();

  function toggleWorkout() {
    console.log(rap.current.audioEl)
    if (isRunning) {
      stopWorkout();
    } else {

      startWorkout();
    }

  }

  
  function startWorkout() {
    setIsRunning(true);

    //play the audio when the timer starts
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          stopWorkout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
  
  }

  function stopWorkout() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setTime(60);
  }


  return (

 
    <div className="App">
    <h1>{time}</h1>
    <AudioPlayer
      ref={rap}
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      controls
      autoPlay={isRunning}
    />
    <Button
      variant={isRunning ? 'outlined' : 'contained'}
      color={isRunning ? 'error' : 'primary'}
      style={{ marginTop: '1rem' }}
      onClick={toggleWorkout}
    >
      {isRunning ? 'Stop' : 'Start'}
    </Button>
  </div>
  );
}
export default App;

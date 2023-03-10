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
  const [workoutState, setWorkoutState] = useState('rest');
  const [workoutColor, setWorkoutColor] = useState('green');
  const intervalRef = useRef(null);
  const rap = useRef();
  const title = useRef();
  let round = 1;
  let chill = 240;
  let intense = 60;

  function toggleWorkout() {
    if (isRunning) {
      stopWorkout();
    } else {
      title.current.hidden = false;
      startWorkout();
    }

  }

  function rest() {
    setWorkoutState("Rest");
    setWorkoutColor("grey");
    setTime(chill);
    round++;
    clearInterval(intervalRef.current);
    console.log(round);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1 && round <= 3) {
          startWorkout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

  }
  
  function startWorkout() {
    clearInterval(intervalRef.current);
    setIsRunning(true);
    setWorkoutState("Intense!");
    setWorkoutColor("Green");
    setTime(intense);
    //play the audio when the timer starts
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (round === 3) {
          stopWorkout();
          return 0;
        } else if(prevTime <= 1 && round < 3)  {
          rest();
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
      <h2 ref = {title} style={{color:workoutColor}} hidden ={isRunning?false:true}>{workoutState}</h2>
    <h1 hidden ={isRunning?false:true}>{time}</h1>
    {/* <AudioPlayer
      ref={rap}
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      controls
      autoPlay={isRunning}
    /> */}
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

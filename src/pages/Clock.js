import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Clock.css";
import "./Setup";
import TimeLeft from "./components/TimeLeft";
import { TimeContext } from "../TimeContext";

function Clock() {
  const audioElementNight = useRef(null);
  const audioElementMorning = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const { sessionLength, setSessionLength } = useContext(TimeContext);
  const { breakLength, setBreakLength } = useContext(TimeContext);
  const { timeLeft, setTimeLeft } = useContext(TimeContext);
  const [sessionCounter, setSessionCounter] = useState(0);

  // change timeleft whenever sessionlength changes
  // listen to timeleft changes
  // change session to break or break to session when either == 0

  useEffect(() => {
    if (timeLeft == 0) {
      if (currentSessionType == "Session") {
        setCurrentSessionType("Break");
        sessionCountAdder();
      } else if (currentSessionType == "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
      if (timeLeft == 0 && currentSessionType == "Session") {
        // audioElementNight.current.play();
      } else if (timeLeft == 0 && currentSessionType == "Break") {
        // audioElementMorning.current.play();
      }
    }
  }, [
    breakLength,
    currentSessionType,
    setBreakLength,
    setSessionLength,
    timeLeft,
  ]);

  // BREAK

  // button for starting/stopping countdown timer

  const isStarted = intervalId != null;
  const handleStartStopClick = () => {
    if (isStarted) {
      // use clearinterval to pause timer if we are in started mode
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // decrement timeleft by one every second

      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  // Session counter for tracking number of sessions completed

  const sessionCountAdder = () => {
    setSessionCounter(sessionCounter + 1);
  };

  return (
    <div className="App">
      {/* <h1 className="Header">Clock</h1> */}

      <TimeLeft
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        timeLeft={timeLeft}
        startStopButtonLabel={isStarted ? "Stop" : "Start"}
      />
      <div className="link-wrapper">
        {/* <audio ref={audioElementNight}>
          <source
            src="https://gamepedia.cursecdn.com/dota2_gamepedia/b/b6/Ambient_night.mp3"
            type="audio/mpeg"
          />
        </audio>
        <audio ref={audioElementMorning}>
          <source
            src="https://gamepedia.cursecdn.com/dota2_gamepedia/b/bc/Ambient_morning.mp3"
            type="audio/mpeg"
          />
        </audio> */}
        <p className="session-counter">Sessions completed</p>
        <p className="session-counter">{sessionCounter}</p>
      </div>
    </div>
  );
}

export default Clock;

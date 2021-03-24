import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import "./Setup.css";
import { TimeContext } from "../TimeContext";

const Setup = forwardRef((props, ref) => {
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const { sessionLength, setSessionLength } = useContext(TimeContext);
  const { breakLength, setBreakLength } = useContext(TimeContext);
  const { timeLeft, setTimeLeft } = useContext(TimeContext);

  // MODAL VIEW

  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  // END MODAL VIEW

  // change timeleft whenever sessionlength or breaklength changes
  // listen to timeleft changes
  // change session to break or break to session when either == 0

  useEffect(() => {
    if (timeLeft == 0) {
      if (currentSessionType == "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
      } else if (currentSessionType == "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, setSessionLength, timeLeft]);

  // BREAK

  // button for decrementing break length by 1 minute when clicked, but not lower than 0

  const decrementBreakLengthByOneMinute = () => {
    const decrementedBreakLength = breakLength - 60;
    setBreakLength(breakLength - 60);
    if (currentSessionType == "Break") {
      setTimeLeft(breakLength - 60);
    }

    if (decrementedBreakLength < 0) {
      setBreakLength(0);
    } else {
      setBreakLength(decrementedBreakLength);
    }
  };

  // button for incrementing break length by 1 minute when clicked

  const incrementBreakLengthByOneMinute = () => {
    setBreakLength(breakLength + 60);
    if (currentSessionType == "Break") {
      setTimeLeft(breakLength + 60);
    }
  };

  // SESSION

  // button for decrementing session length by 1 minute when clicked, but not lower than 0

  const decrementSessionLengthByOneMinute = () => {
    const decrementedSessionLength = sessionLength - 60;
    if (currentSessionType == "Session") {
      setTimeLeft(sessionLength - 60);
    }

    if (decrementedSessionLength < 0) {
      setSessionLength(0);
    } else {
      setSessionLength(decrementedSessionLength);
    }
  };

  // button for incrementing session length by 1 minute when clicked

  const incrementSessionLengthByOneMinute = () => {
    setSessionLength(sessionLength + 60);
    if (currentSessionType == "Session") {
      setTimeLeft(sessionLength + 60);
    }
  };

  //

  // const isStarted = intervalId != null;
  // const handleStartStopClick = () => {
  //   if (isStarted) {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  //   } else {
  //     // use clearinterval to stop timer if we are in started mode
  //     // decrement timeleft by one every second (1000 ms)

  //     const newIntervalId = setInterval(() => {
  //       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  //     }, 100);
  //     setIntervalId(newIntervalId);
  //   }
  // };

  // reset button for applying default settings

  const handleResetButtonClick = () => {
    // clear timout interval
    clearInterval(intervalId);
    // set intervalid null
    setIntervalId(null);
    // set sessiontype to session
    setCurrentSessionType("Session");
    // reset session length
    setSessionLength(60 * 25);
    // reset break length
    setBreakLength(60 * 5);
    // reset timer
    setTimeLeft(60 * 25);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div onClick={close} className="modal-backdrop"></div>
        <div className="modal-box">
          <div className="App">
            {/* <Link className="Back App-link" to="/">
              Back
            </Link> */}
            <h2 className="setup-header">Setup</h2>
            <Break
              breakLength={breakLength}
              decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
              incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
            />

            {/* <TimeLeft
              handleStartStopClick={handleStartStopClick}
              timerLabel={currentSessionType}
              startStopButtonLabel={isStarted ? "Stop" : "Start"}
              timeLeft={timeLeft}
            /> */}

            <Session
              sessionLength={sessionLength}
              decrementSessionLengthByOneMinute={
                decrementSessionLengthByOneMinute
              }
              incrementSessionLengthByOneMinute={
                incrementSessionLengthByOneMinute
              }
            />
            <div className="reset-button-container">
              <button className="reset-button" onClick={handleResetButtonClick}>
                Reset to default
              </button>
            </div>

            <div className="link-wrapper"></div>
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default Setup;

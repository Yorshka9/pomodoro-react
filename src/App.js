import React, { useState } from "react";
import "./App.css";

import Clock from "./pages/Clock";
import Setup from "./pages/Setup";
import { TimeContext } from "./TimeContext";

function App() {
  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const [sessionLength, setSessionLength] = useState(60 * 1);
  const [breakLength, setBreakLength] = useState(60 * 3);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Phase</h1>

        <div className="container">
          <div className="sun"></div>
        </div>

        {/* <Link className="App-link" to="/setup">
            Next
          </Link> */}
      </header>
      <TimeContext.Provider
        value={{
          sessionLength,
          setSessionLength,
          timeLeft,
          setTimeLeft,
          breakLength,
          setBreakLength,
        }}
      >
        <Setup ref={modalRef} />

        <Clock />
        <button className="settings-button" onClick={openModal}>
          Setup
        </button>
      </TimeContext.Provider>
    </div>
  );
}

export default App;

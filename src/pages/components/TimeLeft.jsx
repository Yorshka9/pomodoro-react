import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "../../TimeContext";

momentDurationFormatSetup(moment);

const TimeLeft = ({
  handleStartStopClick,
  startStopButtonLabel,
  timeLeft,
  timerLabel,
}) => {
  // const { sessionLength } = useContext(TimeContext);

  const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss");
  // const formattedSessionLength = moment
  //   .duration(sessionLength, "s")
  //   .format("mm:ss");

  return (
    <div>
      <p className="timer-text" id="timer-label">
        {timerLabel}
      </p>
      <p className="timer-text" id="time-left">
        {formattedTimeLeft}
      </p>
      {/* <p>{sessionLength}</p> */}
      <button className="start-stop-button" onClick={handleStartStopClick}>
        {startStopButtonLabel}
      </button>
    </div>
  );
};

export default TimeLeft;

import moment from "moment";
import React, { useContext } from "react";
import { TimeContext } from "../../TimeContext";

const Session = ({
  sessionLength,
  decrementSessionLengthByOneMinute,
  incrementSessionLengthByOneMinute,
}) => {
  const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();

  return (
    <div>
      <p className="session-label">Session</p>
      <p className="session-length">{sessionLengthInMinutes}</p>
      <button
        className="session-decrement"
        onClick={decrementSessionLengthByOneMinute}
      >
        -
      </button>
      <button
        className="session-increment"
        onClick={incrementSessionLengthByOneMinute}
      >
        +
      </button>
    </div>
  );
};

export default Session;

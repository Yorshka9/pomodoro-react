import moment from "moment";
import React from "react";

const Break = ({
  breakLength,
  decrementBreakLengthByOneMinute,
  incrementBreakLengthByOneMinute,
}) => {
  const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();

  return (
    <div>
      <p className="break-label">Break</p>
      <p className="break-length">{breakLengthInMinutes}</p>
      <button
        className="break-decrement"
        onClick={decrementBreakLengthByOneMinute}
      >
        -
      </button>
      <button
        className="break-increment"
        onClick={incrementBreakLengthByOneMinute}
      >
        +
      </button>
    </div>
  );
};

export default Break;

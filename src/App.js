import React, { useEffect, useState } from "react";
// import * as clock from "./clock"

const TimeButtons = ({ updateSessionLength, updateBreakLength }) => (
  <div className="session-buttons">
    <button
      className="button"
      id="break-decrement"
      onClick={() => updateBreakLength((length) => length + 1)}
    >
      B+
    </button>

    <button
      className="button"
      id="break-increment"
      onClick={() => updateBreakLength((length) => length - 1)}
    >
      B-
    </button>

    <button
      className="button"
      id="session-increment"
      onClick={() => updateSessionLength((length) => length + 1)}
    >
      S+
    </button>

    <button
      className="button"
      id="session-decrement"
      onClick={() => updateSessionLength((length) => length - 1)}
    >
      S-
    </button>
  </div>
);

const ControlButtons = ({ toggle, isActive, resetClock }) => (
  <div className="control-buttons">
    <button className="button" id="start_stop" onClick={() => toggle()}>
      {isActive ? "stop" : "start"}
    </button>
    <button className="button" id="reset" onClick={() => resetClock()}>
      reset
    </button>
  </div>
);

const BreakLength = ({ breakLength }) => {
  return (
    <div id="break-label">
      Break Length
      <div id="break-length">{breakLength}</div>
    </div>
  );
};

const SessionLength = ({ sessionLength }) => {
  return (
    <div id="session-label">
      Session Length
      <div id="session-length">{sessionLength}</div>
    </div>
  );
};

const TimeLeft = ({ timeLeft }) => {
  return (
    <div id="timer-label">
      In Session
      <div id="time-left">{timeLeft}</div>
    </div>
  );
};

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const timeLeft = sessionLength + breakLength;

  const updateSessionLength = (cb) => {
    setSessionLength(cb(sessionLength));
  };

  const updateBreakLength = (cb) => {
    setBreakLength(cb(breakLength));
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const resetClock = () => {
    setSessionLength(25);
    setBreakLength(5);
  };

  return (
    <div className="clock">
      <div className="break-session">
        <div className="labels">
          <BreakLength breakLength={breakLength} />
          <SessionLength sessionLength={sessionLength} />
        </div>
        <TimeButtons
          updateSessionLength={updateSessionLength}
          updateBreakLength={updateBreakLength}
        />
      </div>
      <div className="time">
        <div>
          <TimeLeft timeLeft={timeLeft} />
        </div>
        <ControlButtons toggle={toggle} resetClock={resetClock} />
      </div>
    </div>
  );
};

export default App;

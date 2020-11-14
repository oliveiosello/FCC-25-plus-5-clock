import React, { useEffect, useState, useRef } from 'react';

const TimeControl = ({ id, name, onClick }) => (
  <button className="button" id={id} onClick={onClick}>
    {name}
  </button>
);



const TimeButtons = ({ updateSessionLength, updateBreakLength }) => (
  <div className="session-buttons">
    <TimeControl
      name={'B+'}
      id="break-increment"
      onClick={() => updateBreakLength((length) => length + 1)}
    />
    <TimeControl
      name={'B-'}
      id="break-decrement"
      onClick={() => updateBreakLength((length) => length - 1)}
    />
    <TimeControl
      name={'S+'}
      id="session-increment"
      onClick={() => updateSessionLength((length) => length + 1)}
    />
    <TimeControl
      name={'S-'}
      id="session-decrement"
      onClick={() => updateSessionLength((length) => length - 1)}
    />
  </div>
);

const ControlButtons = ({ toggle, isActive, resetClock }) => (
  <div className="control-buttons">
    <button className="button" id="start_stop" onClick={() => toggle()}>
      {isActive ? 'stop' : 'start'}
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
  const totalSeconds = timeLeft;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString();
  const paddedSeconds = seconds.length === 1 ? `0${seconds}` : seconds;

  return (
    <div id="timer-label">
      In Session
      <div id="time-left">
        {minutes}:{paddedSeconds}
      </div>
    </div>
  );
};

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const interval = useRef();

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setElapsed((elapsed) => elapsed + 1);
      }, 1000);
    } else {
      clearInterval(interval.current);
      setElapsed(0);  
    }
  }, [isActive]);

  const timeLeft = (sessionLength + breakLength) * 60 - elapsed;

  const minMax = (n, min, max) => Math.min(Math.max(n, min), max)

  const updateSessionLength = (cb) => setSessionLength(minMax(cb(sessionLength),1, 60));

  const updateBreakLength = (cb) => setBreakLength(minMax(cb(breakLength),1, 60));

  const toggle = () => setIsActive(!isActive);

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
          <TimeLeft timeLeft={timeLeft} id="time-left"/>
        </div>
        <ControlButtons
          isActive={isActive}
          toggle={toggle}
          resetClock={resetClock}
        />
      </div>
    </div>
  );
};

export default App;

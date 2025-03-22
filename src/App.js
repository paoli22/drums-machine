import React, { useState, useEffect } from "react";
import "./App.css";

const drumPads = [
  { key: "Q", sound: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

function DrumPad({ keyTrigger, sound, url, onPlay }) {
  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
    onPlay(sound);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger) {
        playSound();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <button className="drum-pad" id={sound} onClick={playSound}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState("Press a Key");

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <DrumPad
            key={pad.key}
            keyTrigger={pad.key}
            sound={pad.sound}
            url={pad.url}
            onPlay={setDisplay}
          />
        ))}
      </div>
    </div>
  );
}

export default App;


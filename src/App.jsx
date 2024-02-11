import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemoryGame from './components/Game';
import Registration from './components/Registration';
import Authorization from './components/Authorization';
import Menu from './components/Menu';
import RecordsTable from './components/RecordsTable';
import { registerTestUser } from './resources/localStorage';
import './App.css'


const App = () => {
  const [dimension, setDimension] = useState(4);
  const [isOn, setIsOn] = useState(false);
  
  useEffect(() => {
    registerTestUser()
  }, []);

  return (
    <>
      <div className={`main ${isOn ? 'dark' : ''}`}>
        <div className="slider-app">
          <p>Dark theme</p>
          <div className={`onoff-slider ${isOn ? 'on' : 'off'}`} onClick={() => { setIsOn(!isOn); }}>
            <div className="slider-thumb"></div>
          </div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Authorization isOn={isOn} />} />
            <Route path="/registration" element={<Registration isOn={isOn} />} />
            <Route path="/:username/game" element={<MemoryGame isOn={isOn} dimension={dimension} />} />
            <Route path="/:username/menu" element={<Menu dimension={dimension} setDimension={setDimension} isOn={isOn} setIsOn={setIsOn} />} />
            <Route path="/:username/recordsTable" element={<RecordsTable isOn={isOn} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;

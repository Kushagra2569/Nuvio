import { useState } from 'react';
import './App.css';
import Home from './components/Home';

function App() {

  function greet() {
  }

  return (
    <div id="App" className='w-full h-screen flex justify-center items-center'>
      <Home />
      {/* <div id="result" className="result">{resultText}</div>
      <div id="input" className="input-box">
        <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
        <button className="btn" onClick={greet}>Greet</button>
      </div> */}
    </div>
  )
}

export default App

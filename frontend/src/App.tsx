import { useState } from 'react';
import './App.css';
import { Tracker_start } from "../wailsjs/go/main/App";
import Home from './components/Home';

function App() {
  const [resultText, setResultText] = useState("Please enter your name below 👇");
  const [name, setName] = useState('');
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Tracker_start(name).then(updateResultText);
  }

  return (
    <div id="App" className='w-full h-screen flex justify-center items-center'>
      <Home/>
      {/* <div id="result" className="result">{resultText}</div>
      <div id="input" className="input-box">
        <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
        <button className="btn" onClick={greet}>Greet</button>
      </div> */}
    </div>
  )
}

export default App

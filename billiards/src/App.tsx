import React, { useState } from 'react';
import logo from './logo.svg';
import Canvas from "./canvas/Canvas";
import './App.css';


function App() {
  const [prob, setProb] = useState(1);

  const setProbWrap = (n: number) => {
    setProb(n);
    const node = document.getElementById('data-save');
    if(node){
      node.innerHTML = ''
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div
          className={prob === 1 ? "button-like" : "button-like-active"}
          onClick={() => { setProbWrap(1) }}
        >Problem 1 (Circle)</div>
        <div 
          className={prob === 2 ? "button-like" : "button-like-active"}
          onClick={() => { setProbWrap(2) }}
        >Problem 2 (Gravitational Circle)</div>
        <div 
          className={prob === 3 ? "button-like" : "button-like-active"}
          onClick={() => { setProbWrap(3) }}
        >Problem 2 (Field)</div>
      </div>
      <Canvas problem={prob}/>
      <div id='data-save'>
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export function App2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/user/getUsers')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      { data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p> }
    </div>
  );
}



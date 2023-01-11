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

export function  App2() {
  const [data, setListadoUsers] = useState(null);

 
  useEffect(() => {

    const obtenerUsers = async ()=>{

   const url = 'http://localhost:3002/user/getUsers'
   const result = await axios.get(url)
  
    
   setListadoUsers(result.data.listaUsuarios)
  }
obtenerUsers()
  }, []);
  
console.log(data)



let listUsers;
if(data && data.length > 0 ) {
    listUsers = data.map((user, index)=>{
        return(
          <>
            <p key={index}>{user.name}</p>
            <p key={index}>{user.email}</p>
          </>
        )
    });
}else{
    listUsers = <p>no hay datos</p>
}

function handleClick(user) {
  // actions to perform when a row is clicked
  console.log('has dado clic '+user.name); 
  // here you can access all the user's information
  // e.g. display user's information in a modal or redirect to a new page
}

return (
  <div>
    <h1>Lista Usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 && data.map((user, index) => {
          return (
            <tr key={index} onClick={() => handleClick(user)} style={{cursor: 'pointer'}}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rolUser}</td>
              <td>{user._id}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
);
}



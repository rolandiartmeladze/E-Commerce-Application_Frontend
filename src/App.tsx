import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import UserConteiner from './component/UserConteiner';
import Aside from './component/Aside';
import CreatNewUser from './component/CreatNewUser';
function App() {
  return (
    <>

<Header />
<Aside />

      <UserConteiner />


      </>

  );
}

export default App;

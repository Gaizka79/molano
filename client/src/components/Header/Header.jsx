import React from "react";
import Nav from './Nav';
import logo from '../../assets/logo.png';

function Header () {
  return (
    <>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Harategia</h1>
        <img src={logo} alt="logo" />
        
      </header>
      <Nav/>
    </>
  )
  
}

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav () {
  const [ color, setColor ] = useState('menu__btn');

  const handleClick = () => {
    color === 'menu__btn' ? setColor('menu__btn--white') : setColor('menu__btn');
  }

  return (
    <>
      <nav className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" onClick={handleClick}/>
        <label className={color} htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className="menu__box">         
          <li><Link className="menu__item" to="/">Home</Link></li>   
          <li><Link className="menu__item" to="/About">Sobre nosotros</Link></li>
          <li><Link className="menu__item" to="/Products">Productos</Link></li>
          <li><Link className="menu__item" to="/Add">Añadir producto</Link></li>
          <li><Link className="menu__item" to="/">Donde estamos</Link></li>
          <li><a className="menu__item" href="https://www.google.com">Google</a></li>
          <li><a className="menu__item" href="https://www.google.com">Actividad</a></li>
          <li><a className="menu__item" href="https://www.google.com">Contacto</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Nav;

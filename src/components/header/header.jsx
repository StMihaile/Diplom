import React from 'react';
import './index.css';
import logo from '../assets/logoH5.svg';
import Search from "../Search/search";
import { Link, useLocation } from 'react-router-dom';

export function Header(props, {children, setActiveModal}) {
  const location = useLocation()
   
  return(
    <header className="header">
            <a href="/" title="Логотип">
             <img src={logo} alt="Логотоп" className="logo"/>
            </a>
            {children}
        <Search onInput = {props.changeInput}/>
     <div>
          <Link
          to={'/login'}
          style = {{ cursor: 'pointer', position: 'relative'}}
          onClick = {()=> setActiveModal(true)}
          state = {{backgroundLocation: location, initialPath: location.pathname}}
          ><button>Войти</button></Link>
      </div>
       
    </header>
  )

};

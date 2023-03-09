import React from 'react';
import './index.css';
import logo from '../assets/logo5.svg';
import Search from "../Search/search";

export function Header({onChangeInput}) {

 
  return(
    <header className="header">
            <a href="/" title="Логотип">
             <img src={logo} alt="Логотоп" className="logo"/>
            </a>
        <Search onInput = {onChangeInput}/>
       
       <div> 
          <button className="log_btn"> Вход </button>
          <button className="reg_btn"> Регистрация </button>
        </div>
    </header>
  )

};

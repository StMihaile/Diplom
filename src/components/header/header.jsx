import React, { useContext } from 'react';
import './index.css';
import logo from '../assets/logo8.svg';
import Search from "../Search/search";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { Avatar } from '../profile/avatar';



export function Header(props, { children, setActiveModal }) {

  const { currentUser} = useContext(UserContext);
  return (
    <header className="header">


      <a href="/" title="Логотип">
        <img src={logo} alt="Логотоп" className="logo" />
      </a>
      {children}
      <Search onInput={props.changeInput} />

      <div className='btn_login_container'>
     
        <Link
          to={'/profile'}
          style={{ cursor: 'pointer', position: 'relative' }}
          onClick={() => setActiveModal(true)}
        ><Avatar/>
        </Link>



        <Link
          to={'/login'}
          style={{ cursor: 'pointer', position: 'relative' }}
          onClick={() => setActiveModal(true)}
        ><button className='btn'>Войти</button></Link>

      </div >

    </header>
  )

};

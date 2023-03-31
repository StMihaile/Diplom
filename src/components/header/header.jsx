import React from 'react';
import './index.css';
import logo from '../assets/logo8.svg';
import Search from "../Search/search";
import { Link, Route, Routes} from 'react-router-dom';
import { Profile } from '../profile/profile';
import { Modal } from '../Form/Modal/modal';
import { Login } from '../Login/login';


export function Header(props, {children, activeModal, setActiveModal}) {

 
   
  return(
    <header className="header">
   

            <a href="/" title="Логотип">
             <img src={logo} alt="Логотоп" className="logo"/>
            </a>
            {children}
        <Search  onInput = {props.changeInput}/>

     <div className='btn_login_container' >


        <div>
          <Routes>
           <Route path='/profile' element = {
           <Modal activeModal={activeModal}setActiveModal={setActiveModal}>
           
            <div className="modal">
           <Profile/>
          </div>
          </Modal>
            }>
          </Route>
        </Routes>
           <Link 
           to={'/profile'}
           style = {{ cursor: 'pointer', position: 'relative'}}
          onClick = {()=> setActiveModal(true)}
          ><button className='btn'>Личный кабинет</button>
          </Link>
               
          <Routes>
           <Route path='login' element = {
           <Modal activeModal={activeModal}setActiveModal={setActiveModal}>
           
            <div className="modal">
           <Login/>
          </div>
          </Modal>
            }>
          </Route>
        </Routes>

          <Link
          to={'/login'}
          style = {{ cursor: 'pointer', position: 'relative'}}
          onClick = {()=> setActiveModal(true)}
          ><button className='btn'>Войти</button></Link>
     
      </div >

    </header>
  )

};

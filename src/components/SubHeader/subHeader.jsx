import React from "react";
import './index.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Modal } from "../Form/Modal/modal";
import {FormPost} from '../FormPost/formPost.jsx'



export function SubHeader({activeModal, setActiveModal}) {

  return(
    <header className="header_sub">
        <Routes>
           <Route path='/faq' element = {
           <Modal activeModal={activeModal}setActiveModal={setActiveModal}>
           
            <div className="modal">
           <FormPost/>
          </div>
          </Modal>
            }>
          </Route>
        </Routes>
       <Link
          to={'/formPost'}
          style = {{ cursor: 'pointer', position: 'relative'}}
          onClick = {()=> setActiveModal(true)}
          ><button className='subheader_btn'>ПОДЕЛИСЬ СВОИМ ПОСТОМ</button>
      </Link>
     
        
        
        
    </header>
  )

};

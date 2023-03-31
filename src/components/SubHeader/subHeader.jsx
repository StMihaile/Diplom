import React from "react";
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Link,useLocation } from "react-router-dom";



export function SubHeader({setShow}) {
  // const navigate = useNavigate();
  // const location = useLocation()
  return(
    <header className="header_sub">
       
    <button className="subheader_btn" onClick={()=> setShow(true)}> ПОДЕЛИСЬ СВОИМ ПОСТОМ </button>

        
    </header>
  )

};
  //  <Link
  //         to={'/formPost'}
  //         style = {{ cursor: 'pointer', position: 'relative'}}
  //         onClick = {()=> setShow(true)}
  //         state = {{backgroundLocation: location, initialPath: location.pathname}}
  //         ><button className='btn_login'>ПОДЕЛИСЬ СВОИМ ПОСТОМ</button></Link>
         

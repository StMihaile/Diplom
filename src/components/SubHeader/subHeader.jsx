import React from "react";
import './index.css';
import { useNavigate } from 'react-router-dom';



export function SubHeader({children, setActiveModal}) {
  const navigate = useNavigate();
  
  return(
    <header className="header_sub">
       
      
        
         <button className="subheader_btn" onClick={()=> navigate('/formPost')}> ПОДЕЛИСЬ СВОИМ РЕЦЕПТОМ </button>
        
    </header>
  )

};

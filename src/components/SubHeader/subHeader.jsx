import React from "react";
import './index.css';
import { useNavigate } from 'react-router-dom';


export function SubHeader({}) {
  const navigate = useNavigate();

  return (
    <header className="header_sub">

      <button className="subheader_btn" onClick={() => navigate("/formPost")}> ПОДЕЛИСЬ СВОИМ ПОСТОМ </button>

    </header>
  )

};

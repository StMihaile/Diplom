import cn from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import './index.css'


export const ModalPost = ({ children, show, setShow }) => {
//  const [active, setActive] = useState(false);

// useEffect(()=>{
//    //setActive(true);
//   // setActiveModal(false);
// },[]);

  return (
    <div className={cn('modal', {['active']: show})} onClick={()=>setShow(false)}>
      <div className={cn('modal_content', {['active']: show})} onClick={e=> e.setShow()}>{children}</div>
    </div>
  );
};
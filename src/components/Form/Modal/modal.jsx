import cn from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import './index.css'


export const Modal = ({ children, activeModal, setActiveModal }) => {


  return (
    <div className={cn('modal', { ['active']: activeModal })} onClick={() => setActiveModal(false)}>
      <div className={cn('modal_content', { ['active']: activeModal })} onClick={e => e.stopPropagation()}>{children}</div>
    </div>


  );
};


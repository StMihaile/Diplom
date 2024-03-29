import cn from "classnames";
import './index.css'


export const ModalPost = ({ children, show, setShow }) => {


  return (
    <div className={cn('modal', { ['active']: show })} onClick={() => setShow(true)}>
      <div className={cn('modal_content', { ['active']: show })} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};
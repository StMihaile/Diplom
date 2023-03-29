
import cn from "classnames"
import s from './index.module.css';
export const BaseButton = ({children, color, ...props}) => {
    return (
    <button {...props} className={cn(s.button, s[color])}>
         {children}
    </button>);
};
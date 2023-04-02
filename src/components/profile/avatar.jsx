import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import './index.css';

export function Avatar () {

  const { currentUser} = useContext(UserContext);
  return (
<div className="avatar">
                <img
                  src={currentUser?.avatar}
                  className="image"
                  alt="avatar"
                /></div>
  )}

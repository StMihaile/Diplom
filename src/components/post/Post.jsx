import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import s from '../post/index.module.css'
import Search from '../Search/search';
import { Route, Routes } from 'react-router-dom';
import {ReactComponent as Heart} from '../assets/heart3.svg'

export const Post = ({image, title, text, author,created_at,likes,currentUser,onPostsLike })=>{
  const dataPost = created_at.slice(0,10);
  const isLiked = likes.some((id) => id === currentUser?._id);

const authorPost = author.name;// ввел переменную - взял значение объекта 'author',
// полученного в ответе сервера по ключу 'name'
let navigate = useNavigate(); //хук для того чтобы при нажатии на карточку вылетало окно с постом именно этой карточки с данным айди
const handleClick=()=>{
navigate('/');
};
const textHTML = {__html:text};
const location = useLocation();



useEffect(()=>{
   if (location.search.includes('name=dear')) {
     navigate('/');
   }
 }, [location.search]);

   return (
   <>
   <div className={s.container}>
      <div className={s.imgWrapper}>
         <img src={image} alt='#' />
      </div>
   
   <h1 className={s.postTitle}>{title}</h1>
   
   <button className= {cn(s.favorite, {[s.favoriteActiv]: isLiked})}
             onClick={onPostsLike}>
              <Heart  className={s.favoriteIkon}/>
            </button>
  
   <div>
      <span> РЕЦЕПТ</span>
   </div>
   <p className={s.subtitle} dangerouslySetInnerHTML={textHTML}></p>
   {/* <h2 className="recept">{text}</h2> */}
   
   <div>
      АВТОР РЕЦЕПТА
   </div>
   <h3 className={s.subtitle}>{authorPost}</h3> 
   <div>
      ДАТА СОЗДАНИЯ ПОСТА
   </div>
   <h3 className={s.subtitle}>{dataPost}</h3>
   </div>
   <div className={s.buttonclick}><button onClick={handleClick} className={s.btn}> ВЕРНУТЬСЯ НАЗАД</button>
        <button onClick={handleClick} className={s.btn}> НОВЫЙ ПОИСК</button>
   </div>
   
   
   </>

   )

}
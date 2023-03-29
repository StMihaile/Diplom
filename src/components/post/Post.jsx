import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import s from '../Post/index.module.css'
import Search from '../Search/search';
import { Route, Routes } from 'react-router-dom';
import {ReactComponent as Heart} from '../Assets/heart3.svg'
import {UserContext} from '../../context/userContext'
import api from '../Utilites/api';
import {useForm} from 'react-hook-form';
import { Form } from '../Form/form';
import { useState } from 'react';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { ReactComponent as Basket } from '../Assets/basket.svg';

export const Post = ({
   image,
    title,
     text,
      author,
      created_at,
      likes=[],
      onPostsLike,
      _id,
      currentUser,
      deletePost,
      comments,
      setPost,
      onSendComments,
      deleteComments,
      setActiveModal
    })=>{

      const{headlyPostLike}=useContext( UserContext )
  
  const instance = useContext( UserContext )
  
  const isLiked = likes.some((id) => id === instance?.currentUser._id);

  const[users, setUsers]=useState([])
  const [showForm, setShowForm] = useState(false);
  const [isClicked, setClicked] = useState(isLiked);
//   console.log(isLiked);
 
console.log({comments});

const authorPost = author.name;// ввел переменную - взял значение объекта 'author',
// полученного в ответе сервера по ключу 'name'
let navigate = useNavigate(); //хук для того чтобы при нажатии на карточку вылетало окно с постом именно этой карточки с данным айди
const handleClick=()=>{
navigate('/');
};
const textHTML = {__html:text};

const onLike = (e) => {
  onPostsLike(e);
  setClicked((state) => !state);
};

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({ mode: 'onBlur' });
const location = useLocation();


useEffect(()=>{
   if (location.search.includes('name=dear')) {
     navigate('/');
   }
 }, [location.search]);

 useEffect(()=>{

  api.getUsers().then((data)=>setUsers(data)) // апи запрос на получение юзеров
},[])

const getUser = (id) => {
if (!users.length) return 'User'

const user = users.find(el=>el._id===id)
return user?.name ?? 'User'
}
const options ={
day: 'numeric',
month: 'short',
year:'numeric',
}

const commentsRegister = register('text', {
  required: {
    value: true,
    message: VALIDATE_CONFIG.requiredMessage,
  },
  minLength: { value: 5, message: 'Минимум 5 символов' },
}); 
const sendComments = (data) => {
  onSendComments({ ...data });
  setShowForm(false);
};


   return (
   <>

   
   <div className={s.container}>

       <h1 className={s.postTitle}>{title}</h1>

      <div className={s.imgWrapper}>
         <img src={image} alt='#' />
      </div>
   
   <div className={s.author}>
      АВТОР ПОСТА <h3 className={s.subtitle}>{authorPost}</h3> 
<Link className={s.comments_btn}
to={`/edit-post/${_id}`}
onClick={()=>setActiveModal(true)}
state={{backgroundLocation : location,
initialPath: location.pathname
}}
>
Редактировать
</Link>



   </div>
   
   <div className={s.author}>
      ДАТА СОЗДАНИЯ ПОСТА <h3 className={s.subtitle}>{new Date(created_at).toLocaleString('ru', options)}</h3>
   <button className={s.comments_btn} onClick={deletePost}>

               Удалить

            </button>
   
   </div>

           <div className={s.ratingInfo}>
   <h1 className={s.heart_delete}>
   
         <button className= {cn(s.favorite, {[s.favoriteActiv]: isClicked})}
             onClick={onLike}>
              <Heart  className={s.favoriteIkon}/>
            </button>

  </h1>

  
    
     <span className={s.ratingInfoCount}>{comments.length} комментариев </span>
    
  
  </div>
  
   <div className={s.comments__name}>
      <span> ОПИСАНИЕ ПОСТА</span>
   </div>
   <p className={s.subtitle} dangerouslySetInnerHTML={textHTML}></p>
   {/* <h2 className="recept">{text}</h2> */}
   
  
   
   </div>
   <div className={s.buttonclick}><button onClick={handleClick} className={s.btn}> ВЕРНУТЬСЯ НАЗАД</button>
        <button onClick={handleClick} className={s.btn}> НОВЫЙ ПОИСК</button>
   </div>
    <div className={s.comments}>
      <div className={s.comments__control}>
      <span className={s.comments__name}>КОММЕНТАРИИ</span> 
      {!showForm ? (
      <button className={s.comments_btn} onClick={() => setShowForm(true)}> Добавить</button>) : (
       <Form className={s.form}
              handleFormSubmit={handleSubmit(sendComments)}
              title='Написать комментарий'
            >
              <textarea
                {...commentsRegister}
                className={s.textarea}
                type='text'
                name='text'
                placeholder='оставь комментарий'
              />
              {errors.textarea && (
                <p className='auth__error'>{errors?.textarea?.message}</p>
              )}
              <div className={s.form__btn}>
                <button className={s.comments_btn} type='submit' >
                  Отправить
                </button>
              </div>
       </Form>
       
       )}
       </div>
      {comments.map((e)=>( 
      <div className={s.comment}>
      
    <div className={s.comment__author}>
      <div className={s.comments_author_data_basket}>
       <span>{getUser(e.author)}</span>
       <img src="e.author.avatar" alt="" />
       <span className={s.comment__data}>{new Date(e.created_at).toLocaleString('ru', options)}</span>  
       <span className={s.basket} 
             onClick={() => deleteComments(e._id)}>
          <Basket/>
        </span>
       
      </div>
      
    
    <div className={s.text}>
     <span>{e.text}</span> 
   </div>
    </div>
   
   
   
   
   

      </div>))}
     </div>
   
   </>

   )

}
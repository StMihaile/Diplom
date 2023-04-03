import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import s from '../post/index.module.css'
import { ReactComponent as Heart } from '../assets/heart3.svg'
import { UserContext } from '../../context/userContext'
import api from '../utilites/api';
import { useForm } from 'react-hook-form';
import { Form } from '../Form/form';
import { useState } from 'react';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { ReactComponent as Basket } from '../assets/basket.svg';
import { ReactComponent as Pen } from '../assets/pen.svg';
import { Avatar } from '../profile/avatar';
export const Post = ({
  image,
  title,
  text,
  author,
  created_at,
  likes = [],
  onPostsLike,
  currentUser,
  _id,
  deletePost,
  comments,
  onSendComments,
  deleteComments,
  setActiveModal
}) => {


  const instance = useContext(UserContext)
  const isLiked = likes.some((id) => id === instance?.currentUser._id);
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false);
  const [isClicked, setClicked] = useState(isLiked);

  const authorPost = author.name;// ввел переменную - взял значение объекта 'author',
  // полученного в ответе сервера по ключу 'name'
  let navigate = useNavigate(); //хук для того чтобы при нажатии на карточку вылетало окно с постом именно этой карточки с данным айди
  const handleClick = () => {
    navigate('/');
  };
  const textHTML = { __html: text };
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


  useEffect(() => {
    if (location.search.includes('name=dear')) {  // проверка элемента в массиве
      navigate('/');
    }
  }, [location.search]);

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data)) // апи запрос на получение юзеров
  }, [])

  const getUser = (id) => {
    if (!users.length) return 'User'
    const user = users.find(el => el._id === id)
    return user?.name ?? 'User'

  }
  const options = { // компонент глобального объекта Data для преобразования даты, прилетающей из бэка в читабельный вид
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const commentsRegister = register('text', {
    required: {                                   // обязательное требование минимум 5 символов
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
        <div className={s.container_block}>
          <div className={s.container_page}>


            <h1 className={s.postTitle}>{title}</h1>

            <div >
              <img src={image} className={s.imgWrapper} alt='#' />
            </div>
            <div className={s.comments__name}>
              <span> ОПИСАНИЕ ПОСТА</span>
            </div>
            <div className={s.subtitle_text} dangerouslySetInnerHTML={textHTML}></div>

            <div className={s.container_description}>
              <div className={s.author}>
                <div className={s.subtitle_container}>
                  <h3 className={s.subtitle}>АВТОР :</h3>

                  <h3 className={s.subtitle_text_line}>{authorPost}</h3>
                </div >
                <Link
                  to={`/edit-post/${_id}`}
                  onClick={() => setActiveModal(true)}
                  state={{
                    backgroundLocation: location,
                    initialPath: location.pathname
                  }}
                >
                  <Pen />
                </Link>
              </div>

              <div className={s.author}>
                <div className={s.subtitle_container}>
                  <h3 className={s.subtitle}>СОЗДАН :</h3>
                  <h3 className={s.subtitle_text_line}>{new Date(created_at).toLocaleString('ru', options)}</h3>
                </div>
                <span className={s.basket} onClick={deletePost}>
                  <Basket />

                </span>

              </div>

              <div className={s.ratingInfo}>

                <span className={s.ratingInfoCount}>{comments.length} комментариев </span>
                <h1 className={s.heart_delete}>

                  <button className={cn(s.favorite, { [s.favoriteActiv]: isClicked })}
                    onClick={onLike}>
                    <Heart className={s.favoriteIkon} />

                  </button>
                </h1>

              </div>

            </div>
          </div>
          <div className={s.buttonclick}>
            <button onClick={handleClick} className={s.btn}>НАЗАД</button>
            <button onClick={handleClick} className={s.btn}>ПОИСК</button>
          </div>
          <div className={s.comments}>
            <div className={s.comments__control}>
              <span className={s.comments__name}>КОММЕНТАРИИ</span>

              {!showForm ? (
                <button className={s.comments_btn_opasyty} onClick={() => setShowForm(true)}>
                  <div className={s.comments_containers}>
                    <span className={s.comments_title}>Добавить комментарий</span>
                    <hr className={s.line} />
                  </div>
                </button>) : (
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

                    <button className={s.btn_form_comment} onClick={() => setShowForm(false)}>
                      Назад
                    </button>


                    <button className={s.btn_form_comment} type='submit' >
                      Отправить
                    </button>
                  </div>
                </Form>
              )}
            </div>
            {comments
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((e) => (
                <div key={e.created_at} className={s.comment}>
                  <div className={s.comment__author}>
                    <div className={s.comments_author_data_basket}>
                      <span>{getUser(e.author)}</span>
                      <img src="e.author.avatar" alt="" />
                      <span className={s.comment__data}>{new Date(e.created_at).toLocaleString('ru', options)}</span>
                      {e.author === currentUser._id && <span className={s.basket}
                        onClick={() => deleteComments(e._id)}>
                        <Basket />
                      </span>}

                    </div>
                    <div className={s.text}>
                      <span> - </span> <span>{e.text}</span>
                    </div>
                  </div>
                </div>

              ))}
          </div>
        </div>
      </div>
    </>
  )
}
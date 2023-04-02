import React, { useContext } from "react";
import './index.css';
import { ReactComponent as Heart } from '../assets/heart3.svg'; //импортируем реакт компонент, делаем его кастомным тегом
import { ReactComponent as Comment } from '../assets/comment3.svg';
import cn from 'classnames';
import { Link } from "react-router-dom";
import { UserContext } from '../../context/userContext';


import { UserContext } from '../../context/userContext';



const Card = ({ title,
    image,
    likes,
    onPostsLike,
    _id,
    comments

}) => { //в скобочках - указываем нужные пропсы, которые прокинули в кардлисте

    const instance = useContext(UserContext); // через контекст ловим юзера
    const liked = likes.some((id) => id === instance?.currentUser._id); //проверяем не является ли пользователь (id) элементом массива лайков данного поста
    const likesLength = `${likes.length}`;
    const commentsCount = `${comments.length}`;
    const commentActiv = (commentsCount == 0);


    return (
        <div className="header_card">
            <div className="card">

                <div className="card_name_container">
                    <h1 className="card_name">{title}</h1>
                </div>

                <Link to={`/post/${_id}`} className="card_link">

                    <div className="card_desc">

                        <img src={image} alt="" className="card_image" />



                    </div>
                </Link>
                <div className="card_bottom_menu">

                    <div className="card_styky_bottom">

                        <button className={cn("card_favorite", { 'card_like_activ': liked, })}
                            onClick={() => onPostsLike({ _id, likes })}>
                            <Heart className="card_favorite_ikon" />
                        </button>
                    </div>

                    <div className="card_counter_like">
                        <span>{likesLength}</span>
                    </div>

                <div className="card_comment">
                    <a href="/v2/:group-9/posts/comments/:postId">
                        <img src={comment} alt="Добавить комментарий" className=" card_comment_ikon" />
                    </a>
                </div>

                    <div className="card_counter_comment">
                        <span>{commentsCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Card;
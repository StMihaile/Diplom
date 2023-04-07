
import React, { useEffect, useState } from 'react';
import './index.css'
import Spinner from "../../spinner/Spinner";
import api from "../../utilites/api";
import { Post } from "../../post/Post";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
export const PostPage = () => {

  const [currentUser, setCurrentUser] = useState([null]);
  const [isloading, setIsloading] = useState([false]);
  const [posts, setPost] = useState([null]);
  const { postId } = useParams();
  const { headlyPostLike } = useContext(UserContext);

  const onPostsLike = () => {
    headlyPostLike(posts)
  };
  useEffect(() => {
    setIsloading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getPostsById(postId)
      .then((postData) => setPost(postData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsloading(false));

  }, [postId]);
  const onSendComments = async (data) => {
    try {
      const result = await api.addComments(posts._id, data);
      setPost({ ...result });
    } catch (error) {
    }
  };

  const deleteComments = async (id) => {
    try {
      const result = await api.deleteComments(posts._id, id);
      setPost({ ...result });
    } catch (error) {
    }
  };
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const deletePost = async (id) => {
    if (window.confirm('Вы действительно хотите удалить пост ?'))
      try {
        const result = await api.deletePostFormUser(posts._id, id);
        setPost({ ...result });
        handleClick()
        window.location.reload();
      } catch (error) {
      }
  }




  return (
    <>
      <div className="content_container">
        <div className="content_carts">
          {
            isloading ? (<Spinner />) : (<Post {...posts}
              currentUser={currentUser}
              onPostsLike={onPostsLike}
              setPost={setPost}
              deleteComments={deleteComments}
              onSendComments={onSendComments}
              deletePost={deletePost}
            />)
          }
        </div>
      </div>
    </>
  )
}
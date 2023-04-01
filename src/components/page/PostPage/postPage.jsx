
import React, { useEffect, useState } from 'react';
import Spinner from "../../spinner/Spinner";
import api from "../../utilites/api";
import { Post } from "../../post/Post";
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
export const PostPage = ()=>{
   // const postId ='63d5121b59b98b038f77ad98' ;
    const [cards, setCards]=useState([]);
    const [currentUser,setCurrentUser]=useState([null]);
    const [ isloading,setIsloading]=useState([false]);
    const [ posts,setPost]=useState([null]);

    const {postId} = useParams();
    const {headlyPostLike} = useContext(UserContext);
// console.log(postId);

const onPostsLike=()=>{ // ловим тут функцию онпостлайк, которая будет проверять залайкан ли пост пользователем
   headlyPostLike(posts)
};
    useEffect(()=>{
setIsloading(true);
api.getUserInfo().then((userData)=>setCurrentUser(userData)) ; 
api // делаем запрос
.getPostsById(postId)// возвращается промес
.then((postData)=>setPost(postData))//обрабатываем через зен и кетч
.catch((err)=>console.log('err',err))
.finally(()=>setIsloading(false));//это позволяет отключить спиннер, после любого ответа сервера на наш запрос (ошибка. не ошибка - не важно)
 
},[postId]);
const onSendComments = async (data) => {
   try {
     const result = await api.addComments(posts._id, data);
   //   openNotification('success', 'Success', 'Ваш отзыв успешно отправлен');
     setPost({ ...result });
   } catch (error) {
   //   openNotification('error', 'Error', 'Не получилось отправить отзыв');
   }
 };

 const deleteComments = async (id) => {
   try {
     const result = await api.deleteComments(posts._id, id);
     setPost({ ...result });
   //   openNotification('success', 'Success', 'Ваш отзыв успешно удален');
   } catch (error) {
   //   openNotification('error', 'Error', 'Не получилось удалить отзыв');
   }
 };

 const  deletePost = async (id)=>{
if(window.confirm('Вы действительно хотите удалить пост ?'))
  try{
    const result = await api.deletePostFormUser(posts._id, id);
     setPost({ ...result });
     localStorage.setItem('PostPage', JSON.stringify(result))
  }catch (error) {
   
    }
    
 }




   return (
   <>
      <div className="content_container">

      

         <div className="content_carts">
            
          
          {
            isloading? (<Spinner/>) : (<Post {...posts}
                currentUser ={currentUser} 
                onPostsLike={onPostsLike}
                setPosts = {setPost}
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
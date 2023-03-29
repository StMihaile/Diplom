import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Form } from "react-router-dom";
import api from "../Utilites/api";
import './index.css'


export const EditPost=()=>{
    const[post,setPost]=useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const sendData=async(data)=>{
          await api.editPostById(postId,{...post, title: data.name})
      }
      const {postId} = useParams();
     useEffect(()=>{ 
     },[postId])


      useEffect(()=>{
            api // делаем запрос
            .getPostsById(postId)// возвращается промес
            .then((postData)=>setPost(postData))//обрабатываем через зен и кетч
            .catch((err)=>console.log('err',err))
            
            },[postId]);

    return(
<>
<Form className="edit-post" handleFormSubmit={handleSubmit(sendData)}>
              <div className="profile__info">
                <div>
                  <input
                    {...register('name')}
                    className="auth__input"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    defaultValue={post?.title}
                  />
                  {errors.name && (
                    <p className="auth__error">{errors?.name?.message}</p>
                  )}
                </div>

                
              </div>
              <button type="submit" >
                Сохранить
              </button>
            </Form>

</>

    )
}
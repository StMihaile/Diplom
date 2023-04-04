import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../BaseButton/baseButton";
import { Form } from "../Form/form";
import api from "../utilites/api";
import './index.css'


export const EditPost = () => {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const sendData = async (data) => {
    await api.editPostById(postId, { ...post, title: data.name })
  }
  const { postId } = useParams();
  useEffect(() => {
  }, [postId])

  useEffect(() => {
    api
      .getPostsById(postId)
      .then((postData) => setPost(postData))
      .catch((err) => console.log('err', err))

  }, [postId]);
  return (
    <>
      <div className="profile">

        <Form className="edit-post" handleFormSubmit={handleSubmit(sendData)}>

          <BaseButton >
            <span className="profile__back" onClick={() => navigate(-1)}>
              {"< Назад"}
            </span>
          </BaseButton>
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
          <BaseButton type="submit" color={"yellow"}>
            Сохранить
          </BaseButton>
        </Form>
      </div>
    </>
  )
}
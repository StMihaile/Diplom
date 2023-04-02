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
  const navigate = useNavigate(); //для перехода с кнопки на нужную страницу
  const {  // хук юзформ - позволяет принять данные от пользователя и отправить на сервер 
    register, // параметр, который принимает данные от пользователя
    handleSubmit, // параметр, который отсылает данные
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const sendData = async (data) => {
    await api.editPostById(postId, { ...post, title: data.name })
  }
  const { postId } = useParams(); // для получения динамических параметров из текущего пути роута, тут достали постайди
  useEffect(() => {
  }, [postId])

  useEffect(() => { // для побочных эффектов, например сетевой запрос, количество запуска эффекта зависит от массива зависимостей
    api // делаем запрос
      .getPostsById(postId)// возвращается промес
      .then((postData) => setPost(postData))//обрабатываем через зен и кетч
      .catch((err) => console.log('err', err))

  }, [postId]); // массив зависимостей - если его нет, то эффект при каждом рендеринге, если есть(пустой) - то 1 раз, 
  // если заполнен , то при изменении любого элемента массива
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
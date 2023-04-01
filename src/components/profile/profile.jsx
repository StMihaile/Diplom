import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { VALIDATE_CONFIG } from "../../constants/constants";
import { UserContext } from "../../context/userContext";
import api from "../utilites/api";
import { BaseButton } from "../BaseButton/baseButton";
import { Form } from "../Form/form";
import { openNotification } from "../notification/notification";
import "./index.css";
import Spinner from "../spinner/Spinner";
export const Profile = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentUser } = useContext(UserContext);

  const sendData = async (data) => {
    try {
      await api.setUserInfo(data);
      openNotification("success", "Success", "Данные успешно обновлены");
    } catch (error) {
      openNotification("error", "Error", "Что-то пошло не так");
    }
  };
  const required = {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
  };

  return (
    <>
      <div className="profile">
        <span className="back" onClick={() => navigate(-1)}>
          {"< Назад"}
        </span>

        <h1 className="title">Мои данные</h1>
        {currentUser ? (
          <Form handleFormSubmit={handleSubmit(sendData)}>

            <div className="info">
              <div>
                <input
                  {...register("name", required)}
                  className="auth__input"
                  type="text"
                  name="name"
                  placeholder="Имя"
                  defaultValue={currentUser.name}
                />
                {errors.name && (
                  <p className="auth__error">{errors?.name?.message}</p>
                )}
              </div>

              <input
                {...register("about", required)}
                className="auth__input"
                type="text"
                name="about"
                placeholder="Звание"
                defaultValue={currentUser.about}
              />
              {errors.about && (
                <p className="auth__error">{errors?.about?.message}</p>
              )}
              <input
                className="auth__input"
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={currentUser.email}
                disabled
              />
              <input
                className="auth__input"
                type="text"
                name="id"
                placeholder="Id"
                defaultValue={currentUser._id}
                disabled
              />
            </div>

            <BaseButton type="submit" >
              Сохранить
            </BaseButton>
          </Form>
        ) : (
          <Spinner />

        )}

      </div>
    </>
  );
};
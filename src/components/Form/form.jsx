import { useState } from 'react';
import api from '../utilites/api';
import s from './index.module.css';

export const Form = (props) => {
  const [contactInfo, setContactInfo] = useState({
    lastName: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });// берёт динамические данные из инпутов и подставляет 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addContact(contactInfo)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Введите данные</h3>
      <input
        className={s.input}
        type='text'
        name='lastName'
        placeholder='Фамилия'
        value={contactInfo.lastName}
        onChange={handleChange}
        required
      />
      <input
        className={s.input}
        type='text'
        name='name'
        placeholder='Имя'
        value={contactInfo.title}
        onChange={handleChange}
        required
      />
      <input
        className={s.input}
        type='number'
        name='phoneNumber'
        placeholder='Номер телефона'
        value={contactInfo.phoneNumber}
        onChange={handleChange}
        required
      />
      <input type='checkbox' name='checkbox' onChange={handleChange} />
      <button className={s.button}> Отправить</button>
    </form>
  );
};
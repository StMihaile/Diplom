import s from './index.module.css';
import { useForm } from 'react-hook-form';

const handleSubmit = (onSubmit) => {
  
};

export const RegistrationForm = () => {
  
  const { register, handleSubmit, formState: {errors} } = useForm({mode: 'onChange'});
  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        className={s.input}
        type='text'
        placeholder='Имя'
        {...register('name', {
          required: "Обязательное поле",
          maxLength: {
            value: 10,
            message: 'Максимум 10 символов'
          },
        })}
    
      />
      <div>
        {errors?.name && <p style={{color: 'red'}}>{errors?.name?.message}</p>}
      </div>
      <input
        className={s.input}
        type='password'
        placeholder='Password'
        {...register('password', {
          required: "Обязательное поле",
         
          pattern: {
            value:  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message: `Пароль должен содержать минимум 6 символов, одну букву латинского алфавита и одну цифру`
          }
        })}
        
      />
       <div>
        {errors?.password && <p style={{color: 'red'}}>{errors?.password?.message}</p>}
      </div>
      <input
        className={s.input}
        type='number'
        placeholder='Номер телефона'
        {...register('phoneNumber')}
        
      />
      <button className={s.button}> Sign Up</button>
    </form>
  );
};
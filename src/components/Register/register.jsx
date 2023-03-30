
import { useForm } from 'react-hook-form';
import { Form } from "../Form/form"
import '../Login/index.css'
import { BaseButton } from "../BaseButton/baseButton"
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  PASS_REGEXP,
  VALIDATE_CONFIG,
} from '../../constants/constants';
import authApi from '../utilites/authApi';

export const Register = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ mode: 'onChange' });
  
    const emailRegister = register('email', {
      required: {
        value: true,
        message: VALIDATE_CONFIG.requiredMessage,
      },
      pattern: {
        value: EMAIL_REGEXP,
        message: VALIDATE_CONFIG.email,
      },
    });
    const passwordRegister = register('password', {
      required: {
        value: true,
        message: VALIDATE_CONFIG.requiredMessage,
      },
      pattern: {
        value: PASS_REGEXP,
        message: VALIDATE_CONFIG.password,
      },
    });
    
    const sendData = async(data) => {
    try {
      const result = await authApi.register({...data, group: 'group-9'});
      console.log(result);
    } catch (error) {
      alert ('Что то пошло не так')
    } 
    
    };
    const navigate = useNavigate();
    return (
      <>
        <Form handleFormSubmit={handleSubmit(sendData)} title='Регистрация'>
          <div className='auth__controls'>
            <input
              {...emailRegister}
              className='auth__input'
              type='email'
              name='email'
              placeholder='Email'
            />
            {errors.email && (
              <p className='auth__error'>{errors?.email?.message}</p>
            )}
  
            <input
              {...passwordRegister}
              className='auth__input'
              type='password'
              name='password'
              placeholder='Пароль'
            />
            {errors.password && (
              <p className='auth__error'>{errors?.password?.message}</p>
            )}
          </div>
          <p className='auth__info auth__link' onClick={() => navigate('/reset-pass')}>
            Регистрируясь на сайте, вы соглашаетесь с нашими правилами и Политикой конфиденциальности.
          </p>
          <div className='auth__actions'>
            <BaseButton type='submit' color={'blue'}>
              Зарегистрироваться
            </BaseButton>
            <BaseButton type='button' color={'white'} onClick={() => navigate('/login')}>
              Войти
            </BaseButton>
          </div>
        </Form>
      </>
    );
  };
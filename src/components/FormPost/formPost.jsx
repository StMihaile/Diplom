
import { useEffect, useState } from 'react'
import api from '../utilites/api';
import './index.css'
import { useNavigate } from 'react-router-dom';

export const FormPost = ({ addPost }) => {
  const [userFormPost, setUserFormPost] = useState(
    {
      image: '',
      title: '',
      text: '',

    }
  );

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  const hendlyFormInput = (e) => {
    setUserFormPost({ ...userFormPost, [e.target.name]: e.target.value })
  }

  const hendleFormSubmit = async(e) => {
    e.preventDefault(); 
    await api.addPostForm(userFormPost).then((newPost) => {
      addPost({ ...newPost });
       handleClick()
    });
    console.log({hendleFormSubmit});
   
  }
  
 

  return (


    <form onSubmit={hendleFormSubmit}>

      <div >
        <h1 className='head'>ПОДЕЛИСЬ СВОИМ ПОСТОМ</h1>
      </div>

      <input
        type='text'
        name='image'
        placeholder="введите url картинки"
        className='input_form'
        value={userFormPost.adress}
        onChange={hendlyFormInput}
      >
      </input>
      <img src={userFormPost.image} className='image_post' />

      <input
        type='text'
        name='title'
        placeholder="название поста"
        className='input_form'
        value={userFormPost.title}
        onChange={hendlyFormInput}
      >

      </input>
      <textarea
        type='text'
        name='text'
        placeholder="описание"
        className='input_form'
        value={userFormPost.text}
        onChange={hendlyFormInput}
      >

      </textarea>
      <div className=' btn_close_create'>

        <button type="button" className='btn_c' onClick={handleClick}> ОТМЕНА </button>

        <button type="submit" className='btn_c' > СОЗДАТЬ</button>
      </div>
    </form>

  );
}
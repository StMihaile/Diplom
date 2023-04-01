import './index.css';
import Card from '../Card/Card'
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';


const CardList = ({onPostsLike}) => {
    const {cards} = useContext(CardContext);
    return (
        <div className='cards'>
            {cards.map((item, index)=> // раскрываем массив методом map
            <Card  key={index} {...item}
            onPostsLike={onPostsLike}
            />) //прокидываем пропсы (расспредиваем каждый item, т.е. достаем из объекта ключи)
               //указываем ключи для карточек (чтобы реакт мог рендерить не все карточки, после изменения в какой-либо,
               // а рендерить изменения только в  конкретной)
            }
        </div>    
    );
  };
  export default CardList;
import './index.css';
import Card from '../Card/Card'
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';


const CardList = ({onPostsLike}) => {
    const {cards} = useContext(CardContext);
    return (
        <div className='cards'>
            {cards.map((item, index)=> 
            <Card  key={index} {...item}
            onPostsLike={onPostsLike}
            />) 
            }
        </div>    
    );
  };
  export default CardList;
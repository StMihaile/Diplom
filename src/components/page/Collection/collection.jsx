
import React from 'react';
import CardList from '../../cardList/CardList';
import './index.css'

export const CollectionPage = ({ headlyPostLike }) => {

   return (
      <>
      <div className='container'>
         <CardList onPostsLike={headlyPostLike} />
      </div>
         
      </>
   )
}
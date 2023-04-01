
import React, { useEffect, useState } from 'react';
import CardList from '../../cardList/CardList';
import { Paginator } from '../../Paginator/paginator';
import api from '../../utilites/api';


export const CollectionPage = ({ headlyPostLike }) => {

   return (
      <>

         <CardList onPostsLike={headlyPostLike} />

         {/* <Paginator pageZice={pageZice} page={page}/> */}

      </>

   )

}
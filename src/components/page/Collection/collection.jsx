
import React, { useEffect, useState } from 'react';
import CardList from '../../cardList/CardList';
import { Paginator } from '../../Paginator/paginator';
import api from '../../utilites/api';


export const CollectionPage = ({headlyPostLike})=>{

// const [newCards, setNewCards] = useState(cards);
// const [pageZice, setPageZice] = useState(10);
// const [page,setPage]=useState(1); 
// useEffect(()=>{

//    api.getPostListLimit(page, pageZice).then(data=>setNewCards(data))

// },[pageZice, page])
    

   return (
   <>
   
   <CardList  onPostsLike={headlyPostLike} />   

   {/* <Paginator pageZice={pageZice} page={page}/> */}
   
   </>

   )

}
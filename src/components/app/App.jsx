import React, { useEffect, useState } from 'react';
import './index.css';
import  {Footer}  from '../footer/footer.jsx';
import  {Header}  from '../header/header.jsx';
import api from '../utilites/api';
import { CollectionPage } from '../page/Collection/collection';
import { PostPage } from '../page/PostPage/postPage';
import {Route, Routes, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { Modal } from '../Form/Modal/modal';
import { SubHeader } from '../SubHeader/subHeader';
import { FormPost } from '../FormPost/formPost';
import  SearchInfo from '../SearchInfo/searchInfo.jsx';
import { EditPost } from '../EditPost/editPost';
import { Login } from '../Login/login';
import { Register } from '../Register/register';
import { ResetPass } from '../ResetPass/resetPass';




const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};


function App() {


    const [cards, setCards]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser,setCurrentUser]=useState([null]);
    const [contacts, setContacts]=useState([]);
    const [activeModal, setActiveModal] = useState(true);
    const [dataPostForm, setDataPostForm] = useState([]);
   


    const debounceSearchQuery = useDebounce(searchQuery, 2500);

    const handleRequest = () => {

      api
        .search(searchQuery)
        .then((res) => setCards(res))
        .catch((err) => console.log(err));
    };
  
   useEffect(() => {
    handleRequest();
    console.log('INPUT', searchQuery);

    }, [debounceSearchQuery]);

  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      handleRequest();
    };
  
    const handleInputChange = (inputValue) => {
      setSearchQuery(inputValue);
    };
  


 useEffect(()=>{
   Promise.all([api.getPostList(),api.getUserInfo() ]).then(([dataPosts, dataUser])=>{ // промис.олл - не пропустит компиляцию, пока не выполнятся условия
     setCards(dataPosts);
     console.log(dataPosts);
     setCurrentUser(dataUser);
   });
 },[]);

 function handleUpdateUser(userUpdateData) {
  api.setUserInfo(userUpdateData).then((newUser) => {
    setCurrentUser(newUser);
  });
}

function headlyPostLike(posts){
 const liked = posts.likes.some(id=> id=== currentUser?._id); //проверяем , залайкан ли этот пост этим пользователем
 console.log(liked);
 api.changeLikePosts(posts._id, liked).then((newCard)=>{ // посылаем апи-запрос серверу с айди 
  //пользователя и информацией залайкан пост или нет. получаем новую карточку от сервера
  const newPost = cards.map((cardState)=>{
    // console.log('карточка из стейта', cardState);
    // console.log('карточка из сервера', newCard);
    return cardState._id === newCard._id ? newCard : cardState; // берем новую карточку и заменяем ей старую
  })
  setCards(newPost)
 })
}


// function deletePost(posts){
//   const createDelete=posts._id.some(id=> id===currentUser?._id);
//   console.log(createDelete);
//   api.deletePostFormUser(posts._id).then((newCard)=>{
//     const newPost = cards.map((cardState)=>{
//       // console.log('карточка из стейта', cardState);
//       // console.log('карточка из сервера', newCard);
//       return cardState._id === newCard._id ? newCard : cardState; // берем новую карточку и заменяем ей старую
//     })
//     setCards(newPost)
//   })
  
//   }






const addContact = (contact) => {
  setContacts([...contacts, contact])
};
const addPost = (dataPostForm)=>{
  setDataPostForm([...cards, dataPostForm])
  console.log();
}
const location = useLocation();
const backgroundLocation = location.state?.backgroundLocation;
const initialPath = location.state?.location;
 
  return (
    <>
    <CardContext.Provider value={{cards: cards, setActiveModal:setActiveModal}}>
    <UserContext.Provider value={{currentUser:currentUser,  headlyPostLike: headlyPostLike }}>
      <div className='content_container'>
       <div className='content_cards'>
         <div className="App">
   


           
         <Header changeInput={handleInputChange} setActiveModal={setActiveModal}/> 

         <SearchInfo searchCount={cards.length} searchText={searchQuery} />


           <SubHeader setActiveModal={setActiveModal} ></SubHeader>
           

           <Routes location={backgroundLocation && {...backgroundLocation, path:initialPath || location}}>
            <Route path='/login' element = {
           <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          
          <Login/>
          
          </Modal>
            }>
          </Route>
          <Route path='/register' element = {
           <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          
          <Register/>
          
          </Modal>
            }>
          </Route>
          <Route path='/resetPass' element = {
           <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          
          <ResetPass/>
          
          </Modal>
            }>
          </Route>
           <Route path ='/' element = {
           <CollectionPage  cards={cards} currentUser={currentUser} headlyPostLike ={headlyPostLike} />
            }
            > </Route>
        <Route path='post/:postId' element = {<PostPage currentUser={currentUser}/>}></Route>

        <Route path='formPost' element = {<FormPost addPost={addPost} />}></Route>

       
       
        <Route path = '/edit-post/:postId' element = {
           <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <EditPost/>
         </Modal>
            }
            > </Route>

       
         
   
        <Route path='/FormPost' element = {
           <Modal activeModal={activeModal}setActiveModal={setActiveModal}>
           <div style={{ width: '600px', height: '100%' }}>
           <FormPost addPost={addPost}/>
           </div>
          
          </Modal>
            }>
          </Route>
       </Routes>

       {backgroundLocation && (
        <Routes>
           <Route path='/login' element = {
           <Modal activeModal={activeModal}setActiveModal={setActiveModal}>
          
          <Login/>
          
          </Modal>
            }>
          </Route>
        </Routes>
       )}    
       
  <Footer />

     </div>
    </div>
  </div>
 </UserContext.Provider>
   </CardContext.Provider>
   </>
  )
}

export default App;
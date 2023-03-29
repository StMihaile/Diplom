import React, { useEffect, useState } from 'react';
import './index.css';
import  {Footer}  from '../Footer/footer.jsx';
import  {Header}  from '../Header/header.jsx';
import api from '../Utilites/api';
import { CollectionPage } from '../Page/Collection/collection';
import { PostPage } from '../Page/PostPage/postPage';
import {Route, Routes } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { Form } from '../Form/form';
import { RegistrationForm } from '../Form/registrationForm';
import { Modal } from '../Form/Modal/modal';
import { SubHeader } from '../SubHeader/subHeader';
import { FormPost } from '../FormPost/formPost';
import  SearchInfo from '../SearchInfo/searchInfo.jsx';
import Search from '../Search/search';
import { EditPost } from '../EditPost/editPost';



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
    const [activeModal, setActiveModal] = useState(false);
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
 
  return (
    <>
    <CardContext.Provider value={{cards: cards, setActiveModal:setActiveModal}}>
    <UserContext.Provider value={{currentUser:currentUser,  headlyPostLike: headlyPostLike }}>
      <div className='content_container'>
       <div className='content_carts'>
         <div className="App">
   

        
        <Header changeInput={handleInputChange}/>
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />  
           
           <SubHeader setActiveModal={setActiveModal} ></SubHeader>

         
         

   
           <Routes>
           <Route path ='/' element = {
           <CollectionPage  cards={cards} currentUser={currentUser} headlyPostLike ={headlyPostLike} />
            }
            > </Route>
        <Route path='post/:postId' element = {<PostPage currentUser={currentUser}/>}></Route>
        <Route path='form' element = {<Form addContact = {addContact} />}></Route>
        <Route path='formPost' element = {<FormPost addPost={addPost} />}></Route>
       
       
        <Route path = '/edit-post/:postId' element = {
           <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
          <EditPost/>
         </Modal>
            }
            > </Route>

       </Routes>
       <div>
       {contacts.length && contacts.map((el) => (
       <div>
       <p>{el.lastName}</p>
       <p>{el.name}</p>
       <p>{el.phoneNumber}</p>

       </div> 
       ))}
       </div>
       <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
              <div style={{ width: '300px', height: '300px' }}>
                <RegistrationForm addContact={addContact} />
              </div>
            </Modal>
            <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
              <div style={{ width: '600px', height: '100%' }}>
                <FormPost addPost={addPost} setActiveModal={setActiveModal} />
              </div>
            </Modal>

           

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
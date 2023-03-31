const onResponse = (res)=>{ 
    return res.ok ? res.json(): Promise.reject(`ошибка : ${res.status}`);
}; // асинхронщина. если пришел ответ от сервера, то обрабатываем его json-ом, если нет - то вернет номер ошибки

class Api{ // задаем класс апи, делаем конструктор
constructor ({baseUrl, headers}){
this._headers = headers;
this._baseUrl = baseUrl;
this._configFunc = configFunc;
}
getPostList(){  // делаем запрос на сервер на получение постов, согласно документации от "бэка"
    return fetch(`${this._baseUrl}/v2/group-9/posts`,{headers: this._headers}).then(onResponse).then((result) => {
        // console.log(result);
        return result; // обязательно ретерним результат
      });
}
getPostListLimit(page, limit){
    return fetch(`https://api.react-learning.ru/v2/group-9/posts/paginate?page=${page}&limit=${limit}`).then(onResponse)
}

search(searchQuery) {

    return fetch(`${this._baseUrl}/v2/group-9/posts/search?query=${searchQuery}`, {
      headers: this._headers,
    }).then(onResponse);
  }

getUserInfo(){  // делаем запрос на сервер на получение информацию о пользователе, согласно документации от "бэка"
    return fetch(`${this._baseUrl}/users/me`,{headers: this._headers}).then(onResponse).then((result) => {
        // console.log(result);
        return result;
      });
};
setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configFunc(),
      method: "PATCH",
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

changeLikePosts(postId, isLiked) {

    return fetch(`${this._baseUrl}/v2/group-9/posts/likes/${postId}`,
    {headers: this._headers,
        method: isLiked? 'DELETE' : 'PUT',
    }).then(onResponse).then((result) => {
        // console.log(result);
        return result;
      });
}
getPostsById(idPost) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`, {
        headers: this._headers
    }).then(onResponse)
}

editPostById(idPost,body) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify(body)
    }).then(onResponse)
}

addPostForm(data) {
    return fetch(`${this._baseUrl}/v2/group-9/posts`, 
    {headers: this._headers,
        method: 'POST',
        body:
       
         JSON.stringify(data), // {image:'', title:'',text:''}
    }).then(onResponse);
}

deletePostFormUser(idPost){
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`, 
    {headers: this._headers,
        method: 'DELETE',
    }).then(onResponse);
}

getUserById(idPost){
    return fetch(`${this._baseUrl}/v2/group-9/users/${idPost}`, 
    {headers: this._headers,
        
    }).then(onResponse);
}
getUsers(){
    return fetch(`${this._baseUrl}/v2/group-9/users`, 
    {headers: this._headers,
        
    }).then(onResponse);
}

addComments(postId,body){
    return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(body)
    }).then(onResponse);
  }
  deleteComments(postId, reviewId){
    return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}/${reviewId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(onResponse);
  }


}


const configFunc = () => {

    console.log('HELLO i was called');
    return {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  };

const config = {
    baseUrl : ' https://api.react-learning.ru',
    headers : {
        "Content-Type": "application/json",
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyNTMyNjNhYTI4NTAzNGY3OGFjOTgiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzY4MjU1NDksImV4cCI6MTcwODM2MTU0OX0.MfzA40GD9PeRd_KX7UIFsgUfKWd8c6wVTrm51dJhgPc'

    },
    groupId: '/v2/group-9'




}

const api = new Api(config); // создаем экземпляр класса и прокидываем конфиг, указанный в документации от "бэка"
export default api; // экспортируем наш экземпляр

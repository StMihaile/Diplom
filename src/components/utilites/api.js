const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`ошибка : ${res.status}`);
};

class Api { // 
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._configFunc = configFunc;
  }
  getPostList() {
    return fetch(`${this._baseUrl}/v2/group-9/posts`, { headers: this._headers }).then(onResponse).then((result) => {
      return result;
    });
  }
  getPostListLimit(page, limit) {
    return fetch(`https://api.react-learning.ru/v2/group-9/posts/paginate?page=${page}&limit=${limit}`).then(onResponse)
  }

  search(searchQuery) {

    return fetch(`${this._baseUrl}/v2/group-9/posts/search?query=${searchQuery}`, {
      headers: this._headers,
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(onResponse).then((result) => {
      return result;
    });
  };
  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configFunc(),
      method: "PATCH",
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  };
  editUserAvatar(body) {
    return fetch(`${this._baseUrl}/v2/group-9/users/me/avatar`, {
      ...this._configFunc(),
      method: "PATCH",
      body: JSON.stringify(body),
    }).then((res) => onResponse(res));
  }

  changeLikePosts(postId, isLiked) {

    return fetch(`${this._baseUrl}/v2/group-9/posts/likes/${postId}`,
      {
        headers: this._headers,
        method: isLiked ? 'DELETE' : 'PUT',
      }).then(onResponse).then((result) => {
        return result;
      });
  }
  getPostsById(idPost) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`, {
      headers: this._headers
    }).then(onResponse)
  }

  editPostById(idPost, body) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(body)
    }).then(onResponse)
  }

  addPostForm(data) {
    return fetch(`${this._baseUrl}/v2/group-9/posts`,
      {
        headers: this._headers,
        method: 'POST',
        body:

          JSON.stringify(data),
      }).then(onResponse);
  }

  deletePostFormUser(idPost) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${idPost}`,
      {
        headers: this._headers,
        method: 'DELETE',
      }).then(onResponse);
  }

  getUserById(idPost) {
    return fetch(`${this._baseUrl}/v2/group-9/users/${idPost}`,
      {
        headers: this._headers,

      }).then(onResponse);
  }
  getUsers() {
    return fetch(`${this._baseUrl}/v2/group-9/users`,
      {
        headers: this._headers,

      }).then(onResponse);
  }

  addComments(postId, body) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(body)
    }).then(onResponse);
  }
  deleteComments(postId, reviewId) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/comments/${postId}/${reviewId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(onResponse);
  }


}

const configFunc = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const config = {
  baseUrl: ' https://api.react-learning.ru',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  groupId: '/v2/group-9'
}

const api = new Api(config);
export default api; 


const onResponse = (res)=>{ 
    return res.ok ? res.json(): Promise.reject(`ошибка : ${res.status}`);
}; // асинхронщина. если пришел ответ от сервера, то обрабатываем его json-ом, если нет - то вернет номер ошибки

class Api{ // задаем класс апи, делаем конструктор
constructor ({baseUrl, headers}){
this._headers = headers;
this._baseUrl = baseUrl
}

login (dataUser){
    return fetch(`${this._baseUrl}/signin`,{
        headers: this._headers,
        method: 'POST', 
        body:JSON.stringify(dataUser)
    }).then(onResponse);//обработчик
};


register (dataUser){
    return fetch(`${this._baseUrl}/signup`,{
        headers: this._headers,
        method: 'POST', 
        body:JSON.stringify(dataUser)
    }).then(onResponse);
};


resetPass (dataUser){
    return fetch(`${this._baseUrl}/forgot-password`,{
        headers: this._headers,
        method: 'POST', 
        body:JSON.stringify(dataUser)
    }).then(onResponse);
};
}




const config = {
    baseUrl : ' https://api.react-learning.ru',
    headers : {
        "Content-Type": "application/json",

    },
    groupId: '/v2/group-9'




}

const authApi = new Api(config); // создаем экземпляр класса и прокидываем конфиг, указанный в документации от "бэка"
export default authApi; // экспортируем наш экземпляр

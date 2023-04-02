import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App.jsx';
import reportWebVitals from './reportWebVitals';
import { PostPage } from './components/page/PostPage/postPage.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App />
</BrowserRouter>

//  <PostPage/>
);

reportWebVitals();

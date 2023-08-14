import './App.css';
import React from 'react';
import Header from './components/Header.js';
import {Routes, Route} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/blogs' element = {<Blogs />}></Route>
        <Route path='/' element = {<Register />}></Route>
        <Route path='/my-blogs' element = {<UserBlogs />}></Route>
        <Route path='/create-blog' element = {<CreateBlog />}></Route>
        <Route path='/blog-details/:id' element = {<BlogDetails />}></Route>
        <Route path='/login' element = {<Login />}></Route>
        <Route path='/register' element = {<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;

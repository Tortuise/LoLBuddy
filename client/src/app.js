import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';

import CreateUser from './components/CreateUser';
import ShowUsers from './components/ShowUsers';
import UpdateUser from './components/UpdateUser';
import ShowFriendDetail from './components/ShowFriendDetail';
import SearchPlayer from './pages/SearchPlayer'
import Login from './pages/LoginUser'
import Register from './pages/RegisterUser'
import Profile from './pages/Profile'
import About from './pages/About'
import Followers from './pages/Followers'
import Timeline from './pages/Timeline'

const App = () => {
  const { user } = useAuthContext()

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={user ? <ShowUsers /> : <Navigate to='/login'/>} />
          <Route path='/search-player' element={<SearchPlayer/>} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-user/:id' element={<UpdateUser />} />
          <Route path='/show-friend/:id' element={<ShowFriendDetail />} />
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/followers' element={<Followers/>} />
          <Route path='/timeline' element={<Timeline/>} />
        </Routes>
      </div>
    </Router>
  );
};
export default App
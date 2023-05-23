import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';

import CreateUser from './components/CreateUser';
import ShowUsers from './components/ShowUsers';
import UpdateUser from './components/UpdateUser';
import ShowUserDetail from './components/ShowUserDetail';
import SearchPlayer from './components/SearchPlayer'
import Login from './pages/LoginUser'
import Register from './pages/RegisterUser'

const App = () => {
  const { user } = useAuthContext()

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={user ? <ShowUsers /> : <Navigate to='/login'/>} />
          <Route path='/search-user' element={<SearchPlayer/>} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-user/:id' element={<UpdateUser />} />
          <Route path='/show-user/:id' element={<ShowUserDetail />} />
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
};
export default App
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

import CreateUser from './components/CreateUser';
import ShowUsers from './components/ShowUsers';
import UpdateUser from './components/UpdateUser';
import ShowUserDetail from './components/ShowUserDetail';
import SearchPlayer from './components/SearchPlayer'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowUsers />} />
          <Route path='/search-user' element={<SearchPlayer/>} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-user/:id' element={<UpdateUser />} />
          <Route path='/show-user/:id' element={<ShowUserDetail />} />
          
        </Routes>
      </div>
    </Router>
  );
};
export default App
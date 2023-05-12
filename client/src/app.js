import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateUser from './components/CreateUser';
import ShowUsers from './components/ShowUsers';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import ShowUserDetail from './components/ShowUserDetail';

const App = () => {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<ShowUsers />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/edit-user/:id' element={<UpdateUser />} />
            <Route path='/delete-user/:id' element={<DeleteUser />} />
            <Route path='/show-user/:id' element={<ShowUserDetail />} />
          </Routes>
        </div>
      </Router>
    );
  };
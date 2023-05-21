import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const {logout} = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowUsers');
      });
  }, []);

  const userList =
    users.length === 0
      ? 'there is no user record!'
      : users.map((user, k) => <UserCard user={user} key={k} />);

  

  return (
    <div className='ShowUsers'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Users List</h2>
          </div>
          
          
          <div className='col-md-11'>
            {!user && (
              <Link to='/login' className='btn btn-outline-warning float-right'>
                Login
              </Link>
            )}

            {user && (
              <div>
                <span>{user.username}</span>
                <Link to='/create-user' className='btn btn-outline-warning float-right'>
                  + Add New User
                </Link>
                <Link to='/search-user' className='btn btn-outline-warning float-right'>
                  Search User
                </Link>
                
                <button className='btn btn-outline-warning float-right' onClick={handleClick}> Log Out</button>
                
              </div>

            )}
            <br />
            <br />
            <hr />
          </div>
        </div>
        {user && (
            <div className='list'>{userList}</div>
          )}
      </div>
    </div>
  );
}

export default ShowUsers;
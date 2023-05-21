import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

function ShowUsers() {
  const [users, setUsers] = useState([]);

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
            <Link
              to='/create-user'
              className='btn btn-outline-warning float-right'
            >
              + Add New User
            </Link>
            <Link
              to='/search-user'
              className='btn btn-outline-warning float-right'
            >
              Search User
            </Link>
            <Link
              to='/login'
              className='btn btn-outline-warning float-right'
            >
              Login
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{userList}</div>
      </div>
    </div>
  );
}

export default ShowUsers;
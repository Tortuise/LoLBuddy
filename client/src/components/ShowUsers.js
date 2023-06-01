import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FriendCard from './FriendCard';
import UserCard from './UserCard'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfile } from '../hooks/useProfile';
import { useUserFriends } from '../hooks/useUserFriends';
import NavComponent from './NavBar'

function ShowUsers() {
  const {logout} = useLogout()
  const { user } = useAuthContext()
  const {getUserData, userData} = useProfile()
  const { getUserFriendsData, userFriendsData} = useUserFriends()

  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      getUserData(user.username)
      getUserFriendsData(user.username)
    }
    
  }, [user]);

  const friends =
    userFriendsData.length === 0
      ? 'there is no friend record!'
      : userFriendsData.map((friend, k) => <FriendCard user={friend} key={k} />);

  

  return (
    <div className='ShowUsers'>
      <NavComponent user={user} fixed="top" />
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
                <Link to='/search-player' className='btn btn-outline-warning float-right'>
                  Search Player
                </Link>
              </div>
            )}
            <br />
            <br />
            <UserCard user={userData}/>
            <hr />
          </div>
        </div>
        {user && (
            <div className='list'>{friends}</div>
          )}
      </div>
    </div>
  );
}

export default ShowUsers;
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserCard = (props) => {
  const user = props.user;

  return (
    <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Users'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-user/${user._id}`}>{user.firstName}</Link>
        </h2>
        <h3>{user.lastName}</h3>
        <p>{user.dob}</p>
      </div>
    </div>
  );
};

export default UserCard;
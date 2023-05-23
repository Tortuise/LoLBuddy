import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserCard = (props) => {
  const user = props.user;

  return (
    <div className='card-container'>
      <img
        src= {"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + user.ProfileIconId +".png"}
        alt='Users'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-user/${user._id}`}>{user.SummonerName}</Link>
        </h2>
        <h3>{user.SummonerLvl}</h3>
      </div>
    </div>
  );
};

export default UserCard;
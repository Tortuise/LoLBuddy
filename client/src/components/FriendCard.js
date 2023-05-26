import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';

const UserCard = (props) => {
  const friend = props.user;

  return (
    <div className='card-container'>
      <img
        src= {"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + friend.ProfileIconId +".png"}
        alt='Icon'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-friend/${friend._id}`}>{friend.SummonerName}</Link>
        </h2>
        <h3>{friend.SummonerLvl}</h3>
      </div>
    </div>
  );
};

export default UserCard;
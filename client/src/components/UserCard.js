import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';

const UserCard = (props) => {
  const userdata = props.user;
  const { user } = useAuthContext()
  return (
    <div className='card-container'>
    {userdata.SummonerName != null ?
    <><img
        src= {"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + userdata.ProfileIconId +".png"}
        alt='Icon'
        height={200}
    />
    <div className='desc'>
        <h2>
        <Link to={`/profile/${userdata._id}`}>{userdata.SummonerName}</Link>
        </h2>
        <h3>{userdata.SummonerLvl}</h3>
    </div></>
    : <><p>No leagueoflegends Profile Set</p></>
    }
    </div>
  );
};

export default UserCard;
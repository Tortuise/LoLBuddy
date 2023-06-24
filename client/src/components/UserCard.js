import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { champData } from '../assets/ChampionData';

const UserCard = (props) => {
  const userdata = props.user;
  const { user } = useAuthContext()
  return (
    <div className='card-container'>
    {userdata.SummonerName != null ?
    <><img
        src= {"https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + userdata.ProfileIconId +".png"}
        alt='Icon'
        height={200}
    />
    <div className='desc'>
        <h2>
        <Link to={`/profile/${userdata._id}`}>{userdata.username}</Link>
        </h2>
        <hr />
        <h3>{userdata.SummonerName}</h3>
        {userdata.Main && 
        <h3>Main: <img 
                src= {`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champData.data[userdata.Main].image.full}`}
                alt='Icon'
                height={20}
              /> {" "+userdata.Main}
        </h3>}
        
    </div></>
    : <>
    <Link to={`/profile/${userdata._id}`}>{userdata.username}</Link>
    <p>No leagueoflegends Profile Set</p>
    </>
    }
    </div>
  );
};

export default UserCard;
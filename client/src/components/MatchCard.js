import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { Container } from '@mui/material';

const MatchCard = (props) => {
  const match = props.match.match;
  const profileName = props.match.profileName;
  const { user } = useAuthContext()

  let win = false;
  for (let i = 0; i<match.info.participants.length;i++) {
    const curMatch = match.info.participants[i]
    if (curMatch.summonerName === profileName && curMatch.win != false) {
      win = true;
    }
  }
  
  function PlayerData(data) {
    return (
    <li> 
      <img 
        src= {"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + data.data.profileIcon +".png"}
        height={20}
        width={20}
      />
      <a>{data.data.summonerName}</a>
    </li>
    )
  }

  function PlayerInfo() { 
    const listPlayers = match.info.participants.map((data,k) => <PlayerData data={data} key={k}/>)
    return <ul class="table">{listPlayers}</ul>
  }

  return (
    
    <div className='match-container'>
      <div className='desc'>
        <a>{match.info.gameMode}</a>
        <PlayerInfo/>
        {win ? <a>WON</a> : <a>Lost lmao</a>}
      </div>
    </div>
    
    
  );
};

export default MatchCard;
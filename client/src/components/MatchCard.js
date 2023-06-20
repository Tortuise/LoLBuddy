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
        src= {"http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/" + data.data.championName + ".png"}
        height={20}
        width={20}
      />
      <a>{data.data.summonerName}</a>
    </li>
    )
  }

  function PlayerInfo() { 
    const team1 = match.info.participants.slice(0,5);
    const team2 = match.info.participants.slice(5,10);
    const listTeam1 = team1.map((data,k) => <PlayerData data={data} key={k}/>)
    const listTeam2 = team2.map((data,k) => <PlayerData data={data} key={k}/>)
    return <div className="table"><ul>{listTeam1}</ul><ul>{listTeam2}</ul></div>
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
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';

const FriendItem = (props) => {
  const friendData = props.data;
  const { user } = useAuthContext()
  
  return (
    <div>
        { friendData && 
        <div>
            <img
            src= {"https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + friendData.ProfileIconId +".png"}
            alt='Users'
            height={200}
            />
            <table className='table table-hover table-dark'>
                <tbody>
                <tr>
                    <th scope='row'>1</th>
                    <td>Summoner Name</td>
                    <td>{friendData.SummonerName}</td>
                </tr>
                <tr>
                    <th scope='row'>2</th>
                    <td>Level</td>
                    <td>{friendData.SummonerLvl}</td>
                </tr>
                <tr>
                    <th scope='row'>3</th>
                    <td>puuid</td>
                    <td>{friendData.PUUID}</td>
                </tr>
                </tbody>
            </table>
         </div>   
        } 
    </div>
  );
};

export default FriendItem;
import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import NavComponent from '../components/NavBar';

const SearchPlayer = (props) => {
    const [searchText, setSearchText] = useState("")
    const [playerData, setPlayerData] = useState({})
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const onChange = (e) => {
        setSearchText({ ...searchText, [e.target.name]: e.target.value });
    };

    function searchForPlayer(event) {
        if (!user) {
            console.log('Not Authorized')
            return
        }
        const config = {
            headers:{
              'Authorization': `Bearer ${user.token}`
            },
            params: {username: searchText}
        };
        axios
            .get('http://localhost:8082/api/users/name', config)
            .then((res) => {
                setPlayerData(res.data)
            }).catch((err) => {
                console.log(err + searchText);
            });

    }

    function setProfileData(event) {
        if (!user) {
            console.log('Not Authorized')
            return
        }
        const config = {
            headers:{
              'Authorization': `Bearer ${user.token}`
            },
        };
        
        const data = {
            PUUID: playerData.puuid,
            SummonerName: playerData.name,
            SummonerLvl: playerData.summonerLevel,
            ProfileIconId: playerData.profileIconId,
        };

        axios
            .put(`http://localhost:8082/api/users/${user.username}`, data, config)
            .then((res) => {
            navigate('/');
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function addFriend(event) {
        if (!user) {
            console.log('Not Authorized')
            return
        }
        const config = {
            headers:{
              'Authorization': `Bearer ${user.token}`
            },
            params: {username: user.username}
        };
        const data = {
            PUUID: playerData.puuid,
            SummonerName: playerData.name,
            SummonerLvl: playerData.summonerLevel,
            ProfileIconId: playerData.profileIconId,
        };
        axios
            .post(`http://localhost:8082/api/friends/`, data, config)
            .then((res) => {
            navigate('/');
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='page'>
            <NavComponent fixed="top" />
            <div className='container'>
                <h1> League of Legends Search</h1>
                <input type='text' onChange={onChange}></input>
                <button onClick={e => searchForPlayer(e)}> Search </button>
                <div className='col-md-11'>
                        <Link
                        to='/'
                        className='btn btn-outline-warning float-right'
                        >
                        Back to user list
                        </Link>
                </div>
            </div>
            {JSON.stringify(playerData) != '{}' ? 
            <><h2>Player data found</h2>
            <img width='100' height='100' src ={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + playerData.profileIconId +".png"}></img>
            <h2>Name: {playerData.name}</h2>
            <h2>Level: {playerData.summonerLevel}</h2>
            <button onClick={e=>setProfileData(e)}> Set as profile</button>
            <button onClick={e=>addFriend(e)}>Add as Friend</button>
            </>
                
            : <><h1>No player found</h1></>
            }
        </div>
    )
}
export default SearchPlayer;
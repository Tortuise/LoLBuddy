import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchPlayer = (props) => {
    const [searchText, setSearchText] = useState("")
    const [playerData, setPlayerData] = useState({})

    const onChange = (e) => {
        setSearchText({ ...searchText, [e.target.name]: e.target.value });
    };

    function searchForPlayer(event) {
        axios
            .get('http://localhost:8082/api/users/name', { params: {username: searchText}})
            .then((res) => {
                setPlayerData(res.data)
            }).catch((err) => {
                console.log(err + searchText);
            });

    }
    return (
        <div className='Search'>
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
            </>
                
            : <><h1>No player found</h1></>
            }
        </div>
    )
}
export default SearchPlayer;
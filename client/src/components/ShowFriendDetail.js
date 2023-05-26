import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function ShowFriendDetails(props) {
  const [friend, setFriend] = useState({});
  const { user } = useAuthContext()
  const { id } = useParams();
  const navigate = useNavigate();
  const config = {
    headers:{
      'Authorization': `Bearer ${user.token}`
    },
    params: {username: user.username}
  };

  useEffect(() => {
    // check if loading user or friend data
    
    axios
      .get(`http://localhost:8082/api/friends/${id}`, config)
      .then((res) => {
        setFriend(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowFriendDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/friends/${id}`, config)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowFriendDetails_deleteClick');
      });
  };

  const FriendItem = (
    <div>
      <img
        src= {"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + friend.ProfileIconId +".png"}
        alt='Users'
        height={200}
      />
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Summoner Name</td>
            <td>{friend.SummonerName}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Level</td>
            <td>{friend.SummonerLvl}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Main</td>
            <td>{friend.dob}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowFriendDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Friend List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Summoner's Info</h1>
            <p className='lead text-center'>View Summoner's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{FriendItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(friend._id);
              }}
            >
              Delete Friend
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-friend/${friend._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Friend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowFriendDetails;
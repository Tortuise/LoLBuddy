import React, { useState, useEffect, useRef} from 'react';
import axios from "axios";
import { Link , useParams, useNavigate} from 'react-router-dom';
import UserCard from '../components/UserCard';
import PostCard from '../components/PostCard';
import NavComponent from '../components/NavBar';
import Dialog from '../components/Dialog';
import MatchesComponent from '../components/MatchHistory';
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { champData } from '../assets/ChampionData';

// profile page of chosen user/follower
const Profile = () => {
    const {getUserData, getUserDataById, getPostsFromUser, setMain, userData, posts} = useProfile()
    const { user } = useAuthContext()
    const { id } = useParams();
    const [isOpened, setOpen] = useState(false);
    const [reselect, setReselect] = useState({value:false});
    useEffect(() => {
        if (user) {
          async function fetchData() {
            await getUserDataById(id);
            await getPostsFromUser(id);
          }
          fetchData();
        }
        
      }, [reselect]);


    const handleSelect = async (e) => {
      await setMain(e);
      setReselect({value:true});
      closeDialog(e);
    };

    const showDialog = async (e) => {
      setOpen(true);
    };
    const closeDialog = async (e) => {
      setOpen(false);
    };

    const postList =
    posts.length === 0
      ? 'there are no posts from this user'
      : posts.map((post, k) => <PostCard post={post} key={k} />);

  
    const options = Object.keys(champData.data).map(
        (champ, k) => ({value:k, label:champData.data[champ].name, image:`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champData.data[champ].image.full}`}))
    
    return (
        <div className='page'>
            <NavComponent fixed="top" />
            <hr></hr>
            <div className='center'>
              {(userData) && 
              <>
                <UserCard user={userData}/>
                {(userData.username === user.username) && 
                  <>
                    <button className='margin btn btn-primary ' onClick={showDialog}>Select Main Champion</button>
                    <Dialog onClose={closeDialog} options={options} handleSelect={handleSelect} show={isOpened}/>
                  </>
                }
                <MatchesComponent data={userData} />
                <br></br>
                <h2 className='pad'>Posts from this user</h2>
                <hr></hr>
                {postList}
              </>
              }
            </div>
            
            
        </div>
    )
}
export default Profile
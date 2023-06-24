import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link , useParams, useNavigate} from 'react-router-dom';
import UserCard from '../components/UserCard'
import PostCard from '../components/PostCard'
import NavComponent from '../components/NavBar'
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { champData } from '../assets/ChampionData';

// profile page of chosen user/follower
const Profile = () => {
    const {getUserData, getUserDataById, getPostsFromUser, setMain, userData, posts} = useProfile()
    const { user } = useAuthContext()
    const { id } = useParams();
    useEffect(() => {
        if (user) {
          async function fetchData() {
            await getUserDataById(id);
            await getPostsFromUser(id);
          }
          fetchData();
        }
        
      }, [user, userData]);


    const handleSelect = async (e) => {
      await setMain(e);
    };

    const postList =
    posts.length === 0
      ? 'there are no posts from this user'
      : posts.map((post, k) => <PostCard post={post} key={k} />);

    const champList = 
      Object.keys(champData.data).map(
        (champ, k) =>
        <Dropdown.Item key={k} eventKey={champ}>
          <img 
            src= {`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champData.data[champ].image.full}`}
            alt='Icon'
            height={20}
          />
          {" "+champData.data[champ].id}
        </Dropdown.Item> 
      )

    

    return (
        <div className='Page'>
            <NavComponent fixed="top" />
            <UserCard user={userData}/>
            {(userData.username === user.username) && 
              <>
                <DropdownButton
                className='champ-select'
                title="Choose Main"
                id="dropdown-menu"
                onSelect={handleSelect}
                >
                  {champList}
                </DropdownButton>
              </>
            }
            <h2>Posts from this user</h2>
            {postList}
        </div>
    )
}
export default Profile
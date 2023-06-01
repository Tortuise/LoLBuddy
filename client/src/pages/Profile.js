import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link , useParams, useNavigate} from 'react-router-dom';
import UserCard from '../components/UserCard'
import PostCard from '../components/PostCard'
import NavComponent from '../components/NavBar'
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';

// profile page of chosen user/follower
const Profile = () => {
    const {getUserData, getUserDataById, getPostsFromUser, userData, posts} = useProfile()
    const { user } = useAuthContext()
    const { id } = useParams();
    useEffect(() => {
        if (user) {
          getUserDataById(id)
          getPostsFromUser(id)
        }
        
      }, [user]);


    const handleSubmit = async (e) => {

    };

    const postList =
    posts.length === 0
      ? 'there are no posts from this user'
      : posts.map((post, k) => <PostCard post={post} key={k} />);


    return (
        <div>
            <NavComponent user={user} fixed="top" />
            <p>Test</p>
            <UserCard user={userData}/>
            <h2>Posts from this user</h2>
            {postList}
        </div>
    )
}
export default Profile
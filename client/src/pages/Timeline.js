import React , {useState , useEffect} from 'react'
import axios from "axios";
import NavComponent from '../components/NavBar'
import UserCard from '../components/UserCard'
import PostCard from '../components/PostCard'

import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAddUser } from '../hooks/useAddUser';
import { useFollowers } from '../hooks/useFollowers';

const Timeline = () => {
    const { user } = useAuthContext()
    const {getUserFollowers, userFollowers} = useFollowers()
    const {getFollowersPosts, followersPosts} = useFollowers()
    

    useEffect(() => {
        if (user) {
          getUserFollowers(user.username)
        }
        
    }, [user]);

    const creatPost = async (e) => {

    };

    const posts =
    followersPosts.length === 0
      ? 'there is no posts record!'
      : followersPosts.map((post, k) => <PostCard post={post} key={k} />);


    return (  
        <div className='Followers'>
            <div className='container'>
                <NavComponent fixed="top" />
            </div>
            {posts}
        </div>       
        )
}
export default Timeline;
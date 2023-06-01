import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useFollowers = () => {
    const {user} = useAuthContext()
    const [userFollowers, setUserFollowers] = useState([])
    const [followersPosts, setFollowersPosts] = useState([])

    const getUserFollowers = async (username) => {
        if (user) {
      
            const config = {
              headers:{
                'Authorization': `Bearer ${user.token}`
              },
              params: {username: username}
            };
      
            axios
            .get('http://localhost:8082/api/followers/showAll',config)
            .then((res) => {
                console.log(res.data);
                setUserFollowers(res.data);
            })
            .catch((err) => {
              console.log('Error from getFollowerData');
            });
        }
    }

    // for all followers put all posts in list and sort by date created
    const getFollowersPosts = async (followers) =>  {
      if (user) {
        const config = {
          headers:{
            'Authorization': `Bearer ${user.token}`
          },
          params: {username: username}
        };
        const posts = []
        try {
          for (let i = 0; i < followers.length; i++) {
            axios.get(`http://localhost:8082/api/posts/${followers[i]._id}`,config)
            .then(posts.push(res.data))
          }
          posts.sort(function(a, b) {
            return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0)
          })
          setFollowersPosts(posts)
        } catch (e) {
          console.log(e);
        }

      }
    }
    return {getUserFollowers, getFollowersPosts, userFollowers, followersPosts}
}
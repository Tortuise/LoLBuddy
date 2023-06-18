import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useFollowers = () => {
    const {user} = useAuthContext()
    const [userFollowers, setUserFollowers] = useState([])
    const [followersPosts, setFollowersPosts] = useState({
      error:'',
      isLoading: false,
      data:[],
    })

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
                setUserFollowers(res.data);
            })
            .catch((err) => {
              console.log('Error from getFollowerData');
            });
        }
    }

    // for all followers put all posts in list and sort by date created
    const getFollowersPosts = async (event) =>  {
      setFollowersPosts(prev => ({
        ...prev,
        isLoading: true,
      }));

      if (user) {
        const config = {
          headers:{
            'Authorization': `Bearer ${user.token}`
          },
          params: {username: user.username}
        };
        const posts = []
        try {
          const response = await axios.get(`http://localhost:8082/api/posts/all/`,config)
          
          setFollowersPosts({isLoading: false, error: '', data: response.data})
        } catch (e) {
          setFollowersPosts({isLoading: false, error: 'error getting follower posts'})
          console.log(e);
        }

      }
    }
    return {getUserFollowers, getFollowersPosts, userFollowers, ...followersPosts}
}
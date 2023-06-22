import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import Axios from '../config/axios';

export const useUserFriends = () => {
    const {user} = useAuthContext()
    const [userFriendsData, setUserFriendsData] = useState([])

    const getUserFriendsData = async (username) => {
        if (user) {
      
            const config = {
              headers:{
                'Authorization': `Bearer ${user.token}`
              },
              params: {username: username}
            };
      
            Axios
            .get('/friends',config)
            .then((res) => {
              setUserFriendsData(res.data);
            })
            .catch((err) => {
              console.log('Error from getUserFriendData');
            });
        }
    }
    return {getUserFriendsData, userFriendsData}
}
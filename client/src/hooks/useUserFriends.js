import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

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
      
            axios
            .get('http://localhost:8082/api/friends',config)
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
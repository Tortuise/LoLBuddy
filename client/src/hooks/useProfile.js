import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useProfile = () => {
    const {user} = useAuthContext()
    const [userData, setUserData] = useState("")

    const getUserData = async (username) => {
        if (user) {
      
            const config = {
              headers:{
                'Authorization': `Bearer ${user.token}`
              },
              params: {username: username}
            };
      
            axios
            .get('http://localhost:8082/api/users',config)
            .then((res) => {
              setUserData(res.data);
            })
            .catch((err) => {
              console.log('Error from getUserData');
            });
        }
    }
    return {getUserData, userData}
}
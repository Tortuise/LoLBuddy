import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useAddUser = () => {
    const {user} = useAuthContext()

    const addUser = async (searchText) =>  {
        const follower = searchText
        console.log(follower);
        if (!user) {
            console.log('Not Authorized')
            return
        }
        const config = {
            headers:{
            'Authorization': `Bearer ${user.token}`
            },
            params: {username: user.username}
        };
        const data = {
            username: follower
        };
        axios
            .post(`http://localhost:8082/api/followers/add`, data, config)
            .catch((err) => {
                console.log(err)
            });
    } 
    return {addUser}
}
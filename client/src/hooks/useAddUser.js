import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import Axios from '../config/axios';

export const useAddUser = () => {
    const {user} = useAuthContext()

    const addUser = async (searchText) =>  {
        const follower = searchText
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
        Axios
            .post(`/followers/add`, data, config)
            .catch((err) => {
                console.log(err)
            });
    } 
    return {addUser}
}
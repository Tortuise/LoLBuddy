import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const usePosts = () => {
    const {user} = useAuthContext()

    const createPost = async (postdata) =>  {
        
        console.log(postdata);
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
        
        axios
            .post(`http://localhost:8082/api/posts/post`, postdata, config)
            .catch((err) => {
                console.log(err)
            });
    } 

    return {createPost}
}
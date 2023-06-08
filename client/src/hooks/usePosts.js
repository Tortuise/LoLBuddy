import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const usePosts = () => {
    const {user} = useAuthContext()
    const [state, setState] = useState({
            error:'',
            isLoading: false,
            url:'',
        });
    const [image, setImage] = useState({
        getError:'',
        getIsLoading: false,
        data: '',
    });

    const createPost = async (postdata) =>  {
        
        setState(prev => ({
            ...prev,
            isLoading: true,
        }));

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
            .then(() => setState({isLoading: false, error: ''}))
            .catch((err) => {
                setState({isLoading: false, error: err.message})
                console.log(err)
            });
        return {state}
    }
    
    const uploadPost = async (data) =>  {

        setState(prev => ({
            ...prev,
            isLoading: true,
        }));
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
            .post(`http://localhost:8082/api/posts/image`, data, config)
            .then((res) => {
                setState({isLoading: false, error: '', url: res.data})
            })
            .catch((err) => {
                setState({isLoading: false, error: err.message})
                console.log(err)
            });
        return {state}
    }

    const getImage = async (data) => {
        setImage(prev => ({
            ...prev,
            isLoading: true,
        }));
        const config = {
            headers:{
            'Authorization': `Bearer ${user.token}`
            },
            params: {data:data}
        };

        await axios.get(`http://localhost:8082/api/posts/image`, config)
        .then((res) => {
            setImage({isLoading: false, error: '', data: res.data})
            return res.data;
        })
        .catch((err) => {
            setImage({isLoading: false, error: err.message, data:''})
            console.log(err)
        });
    }


    return {createPost, uploadPost, getImage, ...state, ...image}
}
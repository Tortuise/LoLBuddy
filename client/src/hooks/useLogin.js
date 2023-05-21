import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useLogin= () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async ({username, password}) => {
        setIsLoading(true)
        setError(null)
        try {
            //console.log(username,password)
            const response = await axios.post("http://localhost:8082/api/auth/login",{username, password} )
            
            
            const json = response.data
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
        
            // update the auth context
            
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        
        } catch(error) {
            console.log(error)
            setIsLoading(false)
            setError(error.response.data.error)
        }
        
    }
    return { login, isLoading, error}
}

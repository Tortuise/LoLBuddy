import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";

export const useRegister= () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const register = async ({username, password}) => {
        setIsLoading(true)
        setError(null)
        try {
            //console.log(username,password)
            const response = await axios.post("http://localhost:8082/api/auth/register",{username, password} )
            
            
            const json = response.data
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            console.log(localStorage.getItem('user'))
            // update the auth context
            
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            return true;
        } catch(error) {
            setIsLoading(false)
            setError(error.response.data.error)
            return false;
        }
        
    }
    return { register, isLoading, error}
}

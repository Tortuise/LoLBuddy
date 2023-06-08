import axios from 'axios';
import { useAuthContext } from './useAuthContext'

const baseURL = process.env.REACT_APP_API_URL;
const {user} = useAuthContext()

const axiosClient = axios.create({
    baseURL,
    headers:{
        'Authorization': `Bearer ${user.token}`
      },
});

export default axiosClient
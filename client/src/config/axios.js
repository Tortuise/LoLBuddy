import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'https://lolbuddyserver.onrender.com/api/';


const Axios = axios.create({
    baseURL,
    headers:{
      "content-type": "application/json",
      },
    responseType: "json",
});

export default Axios;
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;


const Axios = axios.create({
    baseURL,
    headers:{
      "content-type": "application/json",
      },
    responseType: "json",
});

export default Axios;
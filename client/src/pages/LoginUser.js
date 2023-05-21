import React , {useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Login function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password)
        // const {username,password} = user
        // if (username && password){
        //     axios.post("http://localhost:8082/api/auth/login",user )
        //     .then((res)=>{
        //         console.log(res)
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // }
    };
    return (
        <div>
            <form className="Login" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Username</label>
                <input type = "username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <label>Password</label>
                <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Login</button>
            </form>
            <div className='col-md-11'>
                <Link to='/register' className='btn btn-outline-warning float-right'> Register </Link>
            </div>
            </div>
    )
}
export default Login
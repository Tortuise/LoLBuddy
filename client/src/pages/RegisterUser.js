import React , {useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {register, isLoading, error} = useRegister()
    const navigate = useNavigate();
    
    //register function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await register({username, password})
        if (res) {
            navigate('/');   
        } 
    };

    return (
        <div>
            <Link to='/login' className='btn btn-outline-warning float-right'> Already have an account? </Link>
            <form className="register" onSubmit={handleSubmit}>
                <h3>Register</h3>
                <label>Username</label>
                <input type = "username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <label>Password</label>
                <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button disabled={isLoading}>Register</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        
        

    )
}
export default Register
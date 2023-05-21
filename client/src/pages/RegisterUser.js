import React , {useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {register, isLoading, error} = useRegister()

    //register function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        await register({username, password})
    };

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h3>Register</h3>

            <label>Username</label>
            <input type = "username" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <label>Password</label>
            <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>Register</button>
            
            <div className='col-md-11'>
                <Link to='/login' className='btn btn-outline-warning float-right'> Already have an account? </Link>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>

    )
}
export default Register
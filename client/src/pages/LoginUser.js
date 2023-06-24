import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useLogin();
    const navigate = useNavigate();

    // Login function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login({username, password});
        if (res) {
            navigate('/');   
        } 
    };
    
    return (
        <div className='LoginUser'>
            <div className='col-md-11'>
                <Link to='/register' className='btn btn-outline-warning float-right'> Register </Link>
            </div>
            <form className="Login" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>Username</label>
                <input type = "username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <label>Password</label>
                <input type = "password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button disabled={isLoading}>Login</button>
            </form>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}
export default Login
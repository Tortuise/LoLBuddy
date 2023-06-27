import React , {useState, useEffect} from 'react'
import NavComponent from '../components/NavBar'
import { useAuthContext } from '../hooks/useAuthContext';
import { useSettings } from '../hooks/useSettings';


const Settings = () => {
    const { user } = useAuthContext()
    const {changePassword, isLoading, error} = useSettings();
    const [ data, setData] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [ updated, setUpdated] = useState(false);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    
        const passwords = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };
        changePassword(passwords);
        setUpdated(true);
        
    };

    return (
        <div className='page'>
            <NavComponent fixed="top" />
            <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
            <label htmlFor='curPassword'>Current Password</label>
            <input
                type='password'
                placeholder='Current Password'
                name='oldPassword'
                className='form-control'
                value={data.oldPassword}
                onChange={onChange}
            />
            </div>
            <br />
            <div className='form-group'>
            <label htmlFor='newPassword'>New Password</label>
            <input
                type='password'
                placeholder='New Password'
                name='newPassword'
                className='form-control'
                value={data.newPassword}
                onChange={onChange}
            />
            </div>
            <button
                type='submit'
                className='btn btn-outline-info btn-lg btn-block'
                disabled={isLoading}
                >
                Change Password
            </button>
            </form>
            {error && <div className='error'>{error}</div>}
            {updated && <div className='info'>Password has been updated</div>}
        </div>
        
 
    )
}

export default Settings;
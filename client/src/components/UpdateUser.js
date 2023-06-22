import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfile } from '../hooks/useProfile';

function UpdateUserInfo(props) {
  const [data, setData] = useState({
    password:'',
  });
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const {getUserData, userData} = useProfile();

  useEffect(() => {
    if (user) {
      getUserData(user.username);
    }
  }, [user]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
    };
    
  };

  return (
    <div className='UpdateUserInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show User List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit User</h1>
            <p className='lead text-center'>Update User's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                placeholder='FirstName'
                name='firstName'
                className='form-control'
                value={user.firstName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                placeholder='LastName'
                name='lastName'
                className='form-control'
                value={user.lastName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='dob'>DoB</label>
              <input
                type='text'
                placeholder='Date of Birth'
                name='dob'
                className='form-control'
                value={user.dob}
                onChange={onChange}
              />
            </div>
            <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserInfo;
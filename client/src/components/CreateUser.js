import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateUser = (props) => {
    // Define the state with useState hook
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        description: '',
        email: '',
        hobbies: '',
        friends: '',
    });
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8082/api/books', book)
            .then((res) => {
                setUser({
                    firstName: '',
                    lastName: '',
                    dob: '',
                    description: '',
                    email: '',
                    hobbies: '',
                    friends: '',
                });

                // Push to /
                navigate('/');
            })
            .catch((err) => {
                console.log('Error in CreateUser!');
              });
    };

    return (
    <div className='CreateUser'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'></div>
                    <br />
                    <Link to='/' className='btn btn-outline-warning float-left'>
                        Show User List
                    </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add User</h1>
                        <p className='lead text-center'>Create new user</p>
                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='FirstName of User'
                                    name='title'
                                    className='form-control'
                                    value={user.firstName}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='lastName'
                                    name='lastName'
                                    className='form-control'
                                    value={user.lastName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                type='text'
                                placeholder='dob'
                                name='dob'
                                className='form-control'
                                value={user.dob}
                                onChange={onChange}
                                />
                            </div>
                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        
    );
};

export default CreateBook;







    

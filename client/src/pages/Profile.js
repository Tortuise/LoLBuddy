import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard'
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
    const {getUserData, userData} = useProfile()
    const { user } = useAuthContext()

    useEffect(() => {
        if (user) {
          getUserData(user.username)
        }
        
      }, [user]);


    const handleSubmit = async (e) => {

    };



    return (
        <div>
            <div className='col-md-11'>
                <Link to='/' className='btn btn-outline-warning float-right'>
                    Back to Home
                </Link>
            </div>
            <p>Test</p>
            <UserCard user={userData}/>
        </div>
    )
}
export default Profile
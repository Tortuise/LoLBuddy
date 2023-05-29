import React , {useState} from 'react'
import axios from "axios";
import NavComponent from '../components/NavBar'

import { useAuthContext } from '../hooks/useAuthContext';

const About = () => {
    const { user } = useAuthContext()
    return (
        <div>
            <NavComponent fixed="top" />
        </div>
        
    )
}

export default About;
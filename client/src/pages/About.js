import React , {useState} from 'react'
import axios from "axios";
import NavComponent from '../components/NavBar'

import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const About = () => {
    const { user } = useAuthContext()
    return (
        <div>
            <NavComponent fixed="top" />
            <Link to='https://github.com/Tortuise/Mern_app' className='btn float-left'>
                <img
                 src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                 style={{
                    resizeMode: 'contain',
                    height: 50,
                    width: 50,
                  }}>
                </img>
            </Link>
        </div>
        
        
    )
}

export default About;
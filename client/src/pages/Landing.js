import React , {useState} from 'react'
import NavComponent from '../components/NavBar'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Landing = () => {
    const { user } = useAuthContext()
    // header/ 3 cards / get started/ login 

    const handleClickScroll = () => {
        const element = document.getElementById('section-1');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='page'>
            <Link to='/login' className='btn btn-outline-warning float-right'> Login? </Link>
            <div className='container-landing'>
                <div className='landing-card-1'>
                    <button onClick={handleClickScroll}>
                        <img src='https://cdn-icons-png.flaticon.com/128/2722/2722987.png' height={20}/>
                    </button>

                </div>
                <div className='landing-card-2' id='section-1'>
                    
                </div>
                <div className='landing-card-3' id='section-2'>
                    
                </div>
                <div className='landing-card-4' id='section-3'>
                <Link to='/register' className='btn btn-outline-success'> Get Started </Link>
                </div>
            </div>
        </div>
        
        
    )
}

export default Landing;
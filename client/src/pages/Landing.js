import React , {useState} from 'react'
import LandingNav from '../components/LandingSections/LandingNav';
import Section1 from '../components/LandingSections/Section1';
import Section2 from '../components/LandingSections/Section2';
import Section3 from '../components/LandingSections/Section3';
import Section4 from '../components/LandingSections/Section4';
import { Link as LinkR} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import "../App.css";

const Landing = () => {
    const { user } = useAuthContext()
    // header/ 3 cards / get started/ login 

    const handleClickScroll = (e) => {
        const element = document.getElementById(`section-${e}`);
        //console.log(element);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='page'>
            <LandingNav />
            <div className='container-landing'>
                <div>
                    <Section1 onClick={() => handleClickScroll(2)}/>
                </div>
                <div>
                    <Section2  onClick={() => handleClickScroll(3)}/>
                </div>
                <div>
                    <Section3  onClick={() => handleClickScroll(4)}/>
                </div>
                <div>
                    <Section4 />
                </div>
            </div>
        </div>
        
        
    )
}

export default Landing;
import React from "react";
import { Link } from "react-router-dom";

const Section1 = (props) => {

    const onClick = (e) => {
        props.onClick(e);
    };
  return (
    <div className='landing-card-1' id='section-1'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,700,0,200" />
      <h2>LoLBuddy App</h2>
      <br></br>
      <h4>Companion app for League of Legends</h4>
      <span className="material-symbols-sharp arrow-1" onClick={onClick}>
        keyboard_double_arrow_down
      </span>
      <img className="landing-img" src="https://cdn.discordapp.com/attachments/189958573571309568/1124955610467811329/image.png"/>
        
        

    </div>
  );
};

export default Section1;
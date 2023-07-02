import React from "react";

const Section2 = (props) => {

    const onClick = (e) => {
        props.onClick(e);
    };
  return (
    <div className='landing-card-2' id='section-2'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,700,0,200" />
      <h2>Features</h2>
      <h4>Using Riot API you can add your friends from League of Legends</h4>
      <h4>and view their match history.</h4>
      <span class="material-symbols-sharp arrow" onClick={onClick}>
        keyboard_double_arrow_down
      </span>
      <img className="landing-img" src="https://cdn.discordapp.com/attachments/189958573571309568/1124951211091710002/image.png" />
    </div>
  );
};

export default Section2;
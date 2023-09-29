import React from "react";

const Section3 = (props) => {

    const onClick = (e) => {
        props.onClick(e);
    };
  return (
    <div className='landing-card-3' id='section-3'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,700,0,200" />
      <h2>Follow Users</h2>
      <h4>Find and follow other users on the app</h4>
      <img className="landing-img" src="https://photos.app.goo.gl/Xg51sYU5nUa1cDLa6" />
      <span className="material-symbols-sharp arrow" onClick={onClick}>
        keyboard_double_arrow_down
      </span>
    </div>
  );
};

export default Section3;
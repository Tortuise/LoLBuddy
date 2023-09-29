import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="https://github.com/Tortuise/Mern_app" className="btn">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          style={{
            resizeMode: "contain",
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        ></img> <h4>Github</h4>
      </Link>
      <span className="material-symbols-sharp arrow" onClick={onClick}>
        keyboard_double_arrow_down
      </span>
      <img className="landing-img" src="https://photos.app.goo.gl/TQN3p4spEp2N2NTU8" />
    </div>
  );
};

export default Section2;
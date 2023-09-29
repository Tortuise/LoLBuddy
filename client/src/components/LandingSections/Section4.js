import React from "react";
import { Link as LinkR } from "react-router-dom";

const Section4 = (props) => {

    const onClick = (e) => {
        props.onClick(e);
    };
  return (
    <div className='landing-card-4' id='section-4'>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,700,0,200" />
      <h2>Timeline</h2>
      <h4>Post on your timeline for your followers and see their posts.</h4>
      <img className="landing-img" src="https://photos.app.goo.gl/hzrfhNMmU3PDxJvP7" />
      <br></br>
      <LinkR to='/register' className='btn btn-outline-warning'> Get Started </LinkR>
    </div>
  );
};

export default Section4;
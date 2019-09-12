import React from 'react';
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
      <div className="ui menu" style={{backgroundColor:"#6441A4"}}>
          <div className="item"><i className="inverted twitch large icon"></i></div>
          <Link to="/" className="item" style={{color:"white", fontSize:"16px"}}>MyTwitch</Link>
          <div className="right menu" style={{padding:"5px"}}>
              <Link to="/" className="item" style={{color:"white", fontSize:"16px"}}>
                  All Streams
              </Link>
              <GoogleAuth/>
          </div>
      </div>

  );
};

export default Header;
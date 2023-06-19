import React from "react";

import { toggleAppFrame } from '../utils/toggleAppFrame';
import { printLine } from '../utils/print';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <button className="exit-button" onClick={toggleAppFrame}>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <g fill="#FFFFFF">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </g>
        </svg>
      </button>
      <h1 className="banner-title">RecruitGPT</h1>
    </div>
  );
}

export default Banner;
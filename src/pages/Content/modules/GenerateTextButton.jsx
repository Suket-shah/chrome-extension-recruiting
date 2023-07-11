import React from "react";

import "./GenerateText.css";
const GenerateTextButton = (props) => {

  return (
    <button onClick={props.generateText} className="generate-button margin-top-15px">generate text</button>
  )
};

export default GenerateTextButton;

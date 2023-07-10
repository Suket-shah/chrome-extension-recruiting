import React from "react";

import "./SingleResultModule.css";

function SingleResultModule(props) {
  function cleanName(name) {
    return name.split("|")[0];
  }

  const name = cleanName(props.result.title.split("-")[0]);
  const bio = props.result.title.split("-")[1];

  return (
    <div className="contactModule">
      <div className="flexRow">
        <div>
          <img src={props.result.pagemap.cse_image[0].src} alt="contact image" />
        </div>
        <div className="leftMargin">
          <a href={props.result.link} className="name underlineRemove">{name}</a>
          <p className="occupation">{bio}</p>
        </div>
      </div>
      <p className="description">{props.result.snippet}</p>
    </div>
  );
}

export default SingleResultModule;

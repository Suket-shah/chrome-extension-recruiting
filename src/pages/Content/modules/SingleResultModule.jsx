import React from "react";

import GenerateTextButton from "./GenerateTextButton.jsx";
import GenerateTextResult from "./GenerateTextResult.jsx";

import "./SingleResultModule.css";

function SingleResultModule(props) {
  const [generatedText, setGeneratedText] = React.useState("");

  // TODO: connect to Bard API
  function generateText() {
    setGeneratedText("generated text aowiefja oawiejfaiowej aowiejfoiajw aowiejfaiowe f aoiwjefoiawj aowiej;awei aowije");
  }

  function cleanName(name) {
    return name.split("|")[0];
  }

  const name = cleanName(props.result.title.split("-")[0]);
  const bio = props.result.title.split("-")[1];

  return (
    <div className="contactModule">
      <div className="contactInfo">
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
      <div className="generateText">
        {(generatedText !== "") ? <GenerateTextResult generatedText={generatedText} generateText={generateText}/> : <GenerateTextButton generateText={generateText} />}
      </div>
    </div>
  );
}

export default SingleResultModule;

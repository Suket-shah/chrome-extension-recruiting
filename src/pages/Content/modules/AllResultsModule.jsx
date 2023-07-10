import React from "react";

import SingleResultModule from "./SingleResultModule.jsx";

import "./AllResultsModule.css";

function AllResultsModule(props) {
  return (
    <div className="overflow">
      <ul>
        {props.searchResults.map((result) => (
          <li key={result.link}>
            <SingleResultModule result={result} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllResultsModule;

import React from "react";

import queryCleaner from "../utils/QueryCleaner";

const searchDivStyle = {
    textAlign: "center",
    fontFamily: "Sans-Serif",
}

const searchBarStyle = {
    borderRadius: "3px",
    height: "30px",
    width: "70%",
    padding: "2px 10px 2px 10px",
    outline: "none",
    background: "#ebf1f7",
    border: "0px",
    margin: "auto",
}

const buttonStyle = {
    border: "0px",
    height: "30px",
    width: "10vw",
    borderRadius: "3px",
    outline: "none",
    marginTop: "5px",
    cursor: "pointer",
    background: "transparent",
}

const subfield = {
    fontSize: "10px",
}

function SearchModule(props) {

    const queryRef = React.useRef();

    function executeQuery(event) {
        event.preventDefault();
        const enteredQuery = queryRef.current.value;
        console.log("executing query", enteredQuery);
        // TODO: generate the post request and send it to the server
        props.searchHandler(enteredQuery);
    }

    return (<div style={searchDivStyle}>
        <div>
            <form onSubmit={executeQuery}>
                <input type="text" placeholder="EX. Google Internship AND UT" ref={queryRef} defaultValue={queryCleaner(props.searchQuery)} style={searchBarStyle}/>
                <button style={buttonStyle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </form>
        </div>
        <div style={subfield}>
            <p>Powered by Linkedin X-Ray </p>
        </div>
        </div>
    );
}

export default SearchModule;
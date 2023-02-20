import React from "react";
import ReactDOM from "react-dom";

import queryCleaner from "../utils/QueryCleaner";



function SearchModule(props) {

    const queryRef = React.useRef();

    function executeQuery(event) {
        event.preventDefault();
        const enteredQuery = queryRef.current.value;
        console.log("executing query", enteredQuery);
        // TODO: generate the post request and send it to the server
        props.searchHandler(enteredQuery);
    }

    return (<div>
        <div>
            <form onSubmit={executeQuery}>
                <input type="text" placeholder="EX. Google Internship AND UT" ref={queryRef} defaultValue={queryCleaner(props.searchQuery)} />
                <button>Search</button>
            </form>
        </div>
        <div>
            <p>Powered by Linkedin X-Ray </p>
        </div>
        </div>
    );
}

export default SearchModule;
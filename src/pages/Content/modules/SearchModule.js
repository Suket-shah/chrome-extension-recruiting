import React from "react";
import ReactDOM from "react-dom";

const GAPIKey = "AIzaSyCA_tkBLk8QkjA0SXnhx-N-q7ryuz7uVsQ";
const SearchCX = "50320220faa5a4aaa";

function SearchModule(props) {

    const queryRef = React.useRef();

    function removeParentheses(query) {
        return query.replace(/\([^)]*\)/g, '');
    }

    function removeQuotes(query) {
        return query.replace(/"/g, '');
    }

    function removePunctuation(query) {
        return query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    }

    function queryCleaner(query) {
        if (query === null) {
            return "";
        }
        query = removeParentheses(query);
        query = removeQuotes(query);
        query = removePunctuation(query);
        return query;
    }

    function executeQuery(event) {
        event.preventDefault();
        const enteredQuery = queryRef.current.value;
        console.log("executing query", enteredQuery);
        // TODO: generate the post request and send it to the server
        props.setLoadingState(true);
        searchHandler(enteredQuery);
    }

    // TODO: add error handling
    function searchHandler(query, clean = false) {
        if (clean) {
            query = queryCleaner(query);
        }
        fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=${SearchCX}&num=10&q=${encodeURIComponent(query)}&key=${GAPIKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            console.log(jsonResponse);
            props.setQueryResult(jsonResponse.items);
            props.setLoadingState(false);
        })
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
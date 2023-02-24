import React from 'react';

import TitleModule from "./TitleModule";
import SearchModule from "./SearchModule";
import ContactListModule from "./ContactListModule";

import queryCleaner from "../utils/QueryCleaner";
import { SearchCX, GAPI } from "../utils/Constant";


let jobFlag = false;
function App(props) {
    let lastUrl = document.location.href;

    const [jobPostingTitle, setJobPostingTitle] = React.useState(null);
    const [isLoadingQuery, setIsLoadingQuery] = React.useState(true);
    const [queryResults, setQueryResults] = React.useState(null);

    // TODO: remove searches if RecruiterPlus tab is not being displayed currently
    function searchHandler(query, clean = false) {
        if (props.visibility === false) {
            console.log("false visibility detected");
            return;
        }
        setIsLoadingQuery(true);
        if (clean) {
            query = queryCleaner(query);
        }
        console.log("this query should happen once", query);
        fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=${SearchCX}&num=10&q=${encodeURIComponent(query)}&key=${GAPI}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            console.log(jsonResponse);
            setQueryResults(jsonResponse.items);
            setIsLoadingQuery(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    // setting up the observer to watch for URL changes
    new MutationObserver(() => {
        const currentUrl = document.location.href;
        const currentJob = document.querySelector('.jobs-unified-top-card__job-title');
        const currentCompany = document.querySelector('.jobs-unified-top-card__company-name');

        const frameVisibility = !(document.getElementById('sidePanelIframe').style.visibility === 'hidden');

        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            jobFlag = false;
        }

        if (currentJob && currentCompany && currentJob.innerText !== "" && currentCompany.innerText !== "" && !jobFlag) {
            // ready to search
            const displayJobString = currentJob.innerText + " at " + currentCompany.innerText;
            setJobPostingTitle(displayJobString);
            if (frameVisibility) {
                searchHandler(displayJobString, true);
            }

            jobFlag = true;
        }
    }).observe(document, {subtree: true, childList: true});

    return (
        <div>
            <div>
                <button onClick={() => props.onWidthChange('50px', false)}>></button>
            </div>
            <div id={'insideFrameID'}>
                <TitleModule title={jobPostingTitle} />
                <SearchModule searchQuery={jobPostingTitle} setLoadingState={setIsLoadingQuery} setQueryResult={setQueryResults} searchHandler={searchHandler}/>
                <ContactListModule isLoadingQuery={isLoadingQuery} queryResults={queryResults}/>
            </div>
        </div>
    )
}

export default App;
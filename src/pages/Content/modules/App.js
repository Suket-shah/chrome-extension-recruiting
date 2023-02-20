import React from 'react';

import TitleModule from "./TitleModule";
import SearchModule from "./SearchModule";
import ContactListModule from "./ContactListModule";

import queryCleaner from "../utils/QueryCleaner";
import { SearchCX, GAPI } from "../utils/Constant";


let jobFlag = false;
function App() {
    let lastUrl = document.location.href;

    const [jobPostingTitle, setJobPostingTitle] = React.useState(null);
    const [isLoadingQuery, setIsLoadingQuery] = React.useState(true);
    const [queryResults, setQueryResults] = React.useState(null);

    function newJobPosting() {
        console.log("New job posting, add chrome extension sidebar");
        // todo add logic of updating iframe size and content
    }

    // TODO: add error handling
    function searchHandler(query, clean = false) {
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

    // setting the initial job posting state
    if (lastUrl.includes('linkedin.com/jobs') && lastUrl.includes('currentJobId')) {
        // newJobPosting();
    } else {
        console.log("Not a jobs page, remove chrome extension sidebar");
    }

    // setting up the observer to watch for URL changes
    new MutationObserver(() => {
        const currentUrl = document.location.href;
        const currentJob = document.querySelector('.jobs-unified-top-card__job-title');
        const currentCompany = document.querySelector('.jobs-unified-top-card__company-name');

        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            jobFlag = false;

            if (currentUrl.includes('linkedin.com/jobs') && currentUrl.includes('currentJobId')) {
                newJobPosting();
            } else {
                console.log("Not on jobs page, remove chrome extension sidebar");
            }
        }

        if (currentJob && currentCompany && currentJob.innerText !== "" && currentCompany.innerText !== "" && !jobFlag) {
            // ready to search
            const displayJobString = currentJob.innerText + " at " + currentCompany.innerText;
            setJobPostingTitle(displayJobString);
            searchHandler(displayJobString, true);

            jobFlag = true;
        }
    }).observe(document, {subtree: true, childList: true});

    return (
        <div >
            <TitleModule title={jobPostingTitle} />
            <SearchModule searchQuery={jobPostingTitle} setLoadingState={setIsLoadingQuery} setQueryResult={setQueryResults} searchHandler={searchHandler}/>
            <ContactListModule isLoadingQuery={isLoadingQuery} queryResults={queryResults}/>
        </div>
    )
}

export default App;
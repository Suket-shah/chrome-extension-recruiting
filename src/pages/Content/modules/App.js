import React from 'react';

import TitleModule from "./TitleModule";
import SearchModule from "./SearchModule";

function App() {
    let lastUrl = document.location.href;
    let lastJob = null;
    let displayJobString = null;

    const [jobPostingTitle, setJobPostingTitle] = React.useState(null);
    const [isLoadingQuery, setIsLoadingQuery] = React.useState(false);
    const [queryResults, setQueryResults] = React.useState(null);

    function newJobPosting() {
        console.log("New job posting, add chrome extension sidebar");
        // todo add logic of updating iframe size and content
    }

    // setting the initial job posting state
    if (lastUrl.includes('linkedin.com/jobs') && lastUrl.includes('currentJobId')) {
        newJobPosting();
    } else {
        console.log("Not a jobs page, remove chrome extension sidebar");
    }

    // setting up the observer to watch for URL changes
    new MutationObserver(() => {
        const currentUrl = document.location.href;
        const currentJob = document.querySelector('.jobs-unified-top-card__job-title');

        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            if (currentUrl.includes('linkedin.com/jobs') && currentUrl.includes('currentJobId')) {
                newJobPosting();
            } else {
                console.log("Not on jobs page, remove chrome extension sidebar");
            }
        }

        if (currentJob?.innerText !== lastJob?.innerText && currentJob !== null && currentJob.innerText !== null) {
            lastJob = currentJob;
        } else if (currentJob === null) {
            lastJob = null;
        }

        // jobs-unified-top-card__subtitle-primary-grouping
        if (lastJob?.innerText !== displayJobString) {
            displayJobString = lastJob?.innerText;
            let displayJobAndCompany = displayJobString;
            const locationData = document.querySelector('.jobs-unified-top-card__subtitle-primary-grouping')?.innerText;
            if (locationData !== null && locationData !== "") {
                console.log("document query selector" + locationData);
                displayJobAndCompany = displayJobAndCompany + " at " + locationData;
            }
            setJobPostingTitle(displayJobAndCompany);
            // TODO kick off search here and send the results to the iframe
        }
    }).observe(document, {subtree: true, childList: true});

    return (
        <div >
            <TitleModule title={jobPostingTitle} />
            <SearchModule searchQuery={jobPostingTitle} setLoadingState={setIsLoadingQuery} setQueryResult={setQueryResults}/>
        </div>
    )
}

export default App;
import React from "react";

import TitleModule from "../modules/TitleModule";
import SearchModule from "../modules/SearchModule";
import ContactListModule from "../modules/ContactListModule";
import ExitButtonModule from "../modules/ExitButtonModule";
import queryCleaner from "../utils/QueryCleaner";
import {GAPI, SearchCX} from "../utils/Constant";
import {doc, getDoc, FieldPath} from "firebase/firestore";
import {db} from "../utils/firebase";
import {removeQuotes} from "../utils/QueryCleaner";

const horizontalAlign = {
    display: "flex",
    flexDirection: "row",
}

let jobFlag = false;

function Home(props) {
    let lastUrl = document.location.href;

    const [jobPostingTitle, setJobPostingTitle] = React.useState(null);
    const [isLoadingQuery, setIsLoadingQuery] = React.useState(true);
    const [queryResults, setQueryResults] = React.useState(null);
    const [tutorial, setTutorial] = React.useState(true);
    const [school, setSchool] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [clubs, setClubs] = React.useState("");

    async function setUserPref() {
        if (localStorage.getItem("recruitPlusUID") === null) {
            return "";
        }

        const docRef = doc(db, "users", localStorage.getItem("recruitPlusUID"));
        try {
            const docRefResponse = await getDoc(docRef);
            if (docRefResponse.exists()) {
                const schoolField = removeQuotes(JSON.stringify(docRefResponse.get("school").school));
                const majorField = removeQuotes(JSON.stringify(docRefResponse.get("major").major));
                let clubField = "";
                setSchool(schoolField);
                setMajor(majorField);
                if (docRefResponse.get(new FieldPath("clubs")) !== undefined) {
                    clubField = removeQuotes(JSON.stringify(docRefResponse.get("clubs").clubs));
                    setClubs(clubField);
                }
                return [schoolField, majorField, clubField];
            }
        } catch (e) {
            console.log("Error getting document for user preferences:", e);
        }
        return null;
    }

    // TODO: make it so that this function waits on the setUserPref() function to finish
    async function searchHandler(query, clean = false) {
        if (props.visibility === false) {
            console.log("false visibility detected");
            return;
        }
        setIsLoadingQuery(true);
        if (clean) {
            query = queryCleaner(query);
        }
        let returnedVal = []
        if (school === "" || major === "") {
            returnedVal = await setUserPref();
        }
        query += " AND " + returnedVal[0] + " AND " + returnedVal[1];
        if ( returnedVal[2] !== "") {
            query += " AND " + returnedVal[2];
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
    new MutationObserver(async () => {
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
            jobFlag = true;
            setTutorial(false);
            const displayJobString = currentJob.innerText + " at " + currentCompany.innerText;
            setJobPostingTitle(displayJobString);
            if (frameVisibility) {
                await searchHandler(displayJobString, true);
            }
        }
    }).observe(document, {subtree: true, childList: true});

    return (
        <div>
            <div id={'insideFrameID'}>
                <div style={horizontalAlign}>
                    <ExitButtonModule onWidthChange={props.onWidthChange}/>
                    <TitleModule title={jobPostingTitle} />
                </div>
                <SearchModule searchQuery={jobPostingTitle} setLoadingState={setIsLoadingQuery} setQueryResult={setQueryResults} searchHandler={searchHandler}/>
                <ContactListModule isLoadingQuery={isLoadingQuery} queryResults={queryResults} tutorial={tutorial}/>
            </div>
        </div>
    )
}

export default Home;
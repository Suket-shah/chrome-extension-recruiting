import React from "react";

import TitleModule from "../modules/TitleModule";
import SearchModule from "../modules/SearchModule";
import ContactListModule from "../modules/ContactListModule";
import ExitButtonModule from "../modules/ExitButtonModule";
import RecruitGPTTitleModule from "../modules/RecruitGPTTitleModule";
import queryCleaner from "../utils/QueryCleaner";
import {GAPI, SearchCX} from "../utils/Constant";
import {db} from "../utils/firebase";
import {removeQuotes} from "../utils/QueryCleaner";
import titleCleaner from "../utils/TitleCleaner";
import horizontalAlign from "../styles/HeaderStyle";

import {doc, getDoc, FieldPath} from "firebase/firestore";

let jobFlag = false;

function Home(props) {
    let lastUrl = document.location.href;

    const [jobPostingTitle, setJobPostingTitle] = React.useState(null);
    const [jobPostingDescription, setJobPostingDescription] = React.useState(null);
    const [jobPostingCompany, setJobPostingCompany] = React.useState(null);
    const [isLoadingQuery, setIsLoadingQuery] = React.useState(true);
    const [queryResults, setQueryResults] = React.useState(null);
    const [tutorial, setTutorial] = React.useState(true);
    const [school, setSchool] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [clubs, setClubs] = React.useState("");
    const [name, setName] = React.useState("");


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
                const nameField = removeQuotes(JSON.stringify(docRefResponse.get("name").name));
                let clubField = "";
                setSchool(schoolField);
                setMajor(majorField);
                setName(nameField);
                if (docRefResponse.get(new FieldPath("clubs")) !== undefined) {
                    clubField = removeQuotes(JSON.stringify(docRefResponse.get("clubs").clubs));
                    setClubs(clubField);
                }
                return [nameField, schoolField, majorField, clubField];
            }
        } catch (e) {
            console.log("Error getting document for user preferences:", e);
        }
        return null;
    }

    // TODO: make it so that this function waits on the setUserPref() function to finish
    async function searchHandler(query, clean = false, addUserPref = true) {
        if (props.visibility === false) {
            return;
        }
        setIsLoadingQuery(true);
        if (clean) {
            query = queryCleaner(query);
        }

        let returnedVal = []

        if (addUserPref) {
            if (school === "" || major === "") {
                returnedVal = await setUserPref();
            }
            query += " AND ((" + returnedVal[0] + ") OR (" + returnedVal[1] + ")";
            if (returnedVal[2] !== "") {
                query += " OR (" + returnedVal[2];
            }
            query += " )";
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
            if (jsonResponse.items === undefined || jsonResponse.items.length === 0) {
                setQueryResults([]);
                setIsLoadingQuery(false);
                return;
            }
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
        setJobPostingDescription(currentJob);
        const currentCompany = document.querySelector('.jobs-unified-top-card__company-name');
        setJobPostingCompany(currentCompany);

        const frameVisibility = !(document.getElementById('sidePanelIframe').style.visibility === 'hidden');

        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            jobFlag = false;
            console.log("url changed");
            if (currentUrl.includes("jobs")) {
                props.onWidthChange("350px", true);
            }
        }

        if (currentJob && currentCompany && currentJob.innerText !== "" && currentCompany.innerText !== "" && !jobFlag) {
            // ready to search
            jobFlag = true;
            setTutorial(false);
            let displayJobString = currentJob.innerText + " at " + currentCompany.innerText;
            displayJobString = titleCleaner(displayJobString);
            setJobPostingTitle(displayJobString);
            if (frameVisibility) {
                const queryInput = "(" + currentCompany.innerText + ") AND (" + currentJob.innerText + ")";
                await searchHandler(queryInput, true);
            }
        }
    }).observe(document, {subtree: true, childList: true});
    console.log("Home.js rendered");
    return (
        <div>
            <div id={'insideFrameID'}>
                <div style={horizontalAlign}>
                    <ExitButtonModule onWidthChange={props.onWidthChange}/>
                    <RecruitGPTTitleModule/>
                    <div style={{width: "30px"}}/>
                </div>
                <TitleModule title={jobPostingTitle} />
                <SearchModule searchQuery={jobPostingTitle} setLoadingState={setIsLoadingQuery} setQueryResult={setQueryResults} searchHandler={searchHandler}/>
                <ContactListModule name={name} school={school} major={major} jobTitle={jobPostingDescription} jobCompany={jobPostingCompany} isLoadingQuery={isLoadingQuery} queryResults={queryResults} tutorial={tutorial}/>
            </div>
        </div>
    )
}

export default Home;
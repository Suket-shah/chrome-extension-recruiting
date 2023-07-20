import React from "react";
import stripAnsi from "strip-ansi";

import SearchBar from "../modules/SearchBar";
import AllResultsModule from "../modules/AllResultsModule";
import queryBuilder from "../utils/queryBuilder";
import searchQueryCleaner from "../utils/searchQueryCleaner";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import secrets from "../../../../secrets.development";

let lastUrl = "";
function Home(props) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [jobPostingDescription, setJobPostingDescription] = React.useState("");
  const [jobPostingCompany, setJobPostingCompany] = React.useState("");
  let userId = "";
  let jobFlag = false;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    } else {
      userId = user.uid;
    }
  });

  async function executeQuery(manualQuery) {
    try {
      let encodedQuery = "";
      if (manualQuery) {
        encodedQuery = encodeURIComponent(manualQuery);
      } else {
        encodedQuery = encodeURIComponent(query);
      }
      console.log("query" + encodedQuery);
      const response = await fetch(
        `https://customsearch.googleapis.com/customsearch/v1?cx=${secrets.SEARCH_CX}&num=10&q=${encodedQuery}&key=${secrets.SEARCH_GAPI}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
      const data = await response.json();
      console.log(data);

      // TODO: need to handle this case better with new screen
      // no results available
      if (data.items === undefined || data.items.length === 0) {
        setSearchResults([]);
        return;
      }

      setSearchResults([...(data.items)]);
    } catch (error) {
      console.error(error);
    }
  }

  function getOutput(result) {
    const output_split_result = result.split("output");
    const filters_split_result = output_split_result[1].split("filters");
    const output = filters_split_result[0];
    const removed_output = output.replace(/\\n/g, " ");
    const final_output = stripAnsi(removed_output);
    return final_output.substring(3, final_output.length - 5);
  }


  // setting up the observer to watch for URL changes
  new MutationObserver(async () => {
    const currentUrl = document.location.href;
    const currentJob = document.querySelector('.jobs-unified-top-card__job-title');
    const currentCompany = document.querySelector('.jobs-unified-top-card__primary-description .app-aware-link');

    const frameVisibility = document.querySelector('.app-frame').style.display === 'block';

    if (currentUrl !== lastUrl && currentJob && currentCompany) {
      lastUrl = currentUrl;
      if (currentUrl.includes("jobs")) {
        document.querySelector('.app-frame').style.display = 'block';
      }
      if (currentJob.innerText !== "" && currentCompany.innerText !== "") {
        // ready to search
        setJobPostingDescription(currentJob.innerText);
        setJobPostingCompany(currentCompany.innerText);
        let searchQuery = currentJob.innerText + " at " + currentCompany.innerText;
        console.log(searchQuery);
        // Query Cleaner
        searchQuery = searchQueryCleaner(searchQuery);
        // Adding Cleaned query to search bar
        setQuery(searchQuery);
        document.querySelector('.search-input').value = searchQuery;
        // Executing search of the query
        await executeQuery(searchQuery);
      }
    }
  }).observe(document, {subtree: true, childList: true});

  async function bardQuery(targetName, targetOccupation, targetDescription) {
    try {
      const queryText = await queryBuilder(userId, targetName, targetOccupation, targetDescription, jobPostingCompany, jobPostingDescription);
      console.log(queryText);
      const response = await fetch(`http://127.0.0.1:5001/recruiterplus-28695/us-central1/bardquery?queryText=${encodeURIComponent(queryText)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      const result = data.result;
      return getOutput(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <SearchBar setQuery={setQuery} executeQuery={executeQuery}/>
      <AllResultsModule searchResults={searchResults} bardQuery={bardQuery}/>
    </div>
  );
}

export default Home;
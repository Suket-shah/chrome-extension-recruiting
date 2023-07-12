import React from "react";

import SearchBar from "../modules/SearchBar";
import AllResultsModule from "../modules/AllResultsModule";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

import secrets from "../../../../secrets.development";

function Home(props) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  let userId = "";

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    } else {
      userId = user.uid;
    }
  });

  async function executeQuery(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://customsearch.googleapis.com/customsearch/v1?cx=${secrets.SEARCH_CX}&num=10&q=${encodeURIComponent(query)}&key=${secrets.SEARCH_GAPI}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
      const data = await response.json();

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

  async function getPersonalData() {
    console.log("getting personal data");
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: do not have any job data from the page yet.
  async function getJobData() {
    return "Google";
  }

  async function queryBuilder(targetName, targetOccupation, targetDescription) {
    try {
      // access via personalData.school and personalData.name
      const personalData = await getPersonalData();
      const jobData = await getJobData();
      return `I am ${personalData.name} and I am a ${personalData.school} student. I am interested in ${jobData}. I found the linkedin profile of ${targetName} at ${targetOccupation}. Here is some more information about them: ${targetDescription}. Write a linkedin message to introduce me to them.`;
    } catch (error) {
      console.error(error);
    }
  }

  async function bardQuery(targetName, targetOccupation, targetDescription) {
    try {
      // access via personalData.school and personalData.name
      const queryText = await queryBuilder(targetName, targetOccupation, targetDescription);
      const response = await fetch(`http://127.0.0.1:5001/recruiterplus-28695/us-central1/bardquery?queryText=${encodeURIComponent(queryText)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      console.log(data.result)
      const result = data.result;
      // console.log(result)
      // const convertedResult = `{${result}}`
      // const jsonData = JSON.parse(convertedResult);
      // console.log(jsonData);
      return "Suket Shah";
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
import React from "react";

import SearchBar from "../modules/SearchBar";
import AllResultsModule from "../modules/AllResultsModule";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import secrets from "../../../../secrets.development";

function Home(props) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
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

  return (
    <div>
      <SearchBar setQuery={setQuery} executeQuery={executeQuery}/>
      <AllResultsModule searchResults={searchResults}/>
    </div>
  );
}

export default Home;
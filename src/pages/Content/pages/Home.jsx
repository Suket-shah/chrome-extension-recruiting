import React from "react";

import SearchBar from "../modules/SearchBar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import secrets from "../../../../secrets.development";

function Home(props) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    }
  });

  async function executeQuery(event) {
    event.preventDefault();
    try {
      const response = (await fetch(
        `https://customsearch.googleapis.com/customsearch/v1?cx=${secrets.SEARCH_CX}&num=10&q=${encodeURIComponent(query)}&key=${secrets.SEARCH_GAPI}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      ).json();
      response.then((data) => console.log(data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SearchBar setQuery={setQuery} executeQuery={executeQuery}/>
  );
}

export default Home;
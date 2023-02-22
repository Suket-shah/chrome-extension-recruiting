import React from 'react';

import { hunterAPI } from "../utils/Constant";

let loadedEmails = null;

function findEmails() {
    console.log("Finding emails");
    fetch(`https://api.hunter.io/v2/email-finder?domain=reddit.com&first_name=Alexis&last_name=Ohanian&api_key=${hunterAPI}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        console.log(jsonResponse);
        loadedEmails = jsonResponse;
    }).catch((error) => {
        console.log(error);
    });
}
function EmailFinderModule(props) {
    if (loadedEmails === null) {
        return <button onClick={findEmails}>Find Emails</button>
    } else {
        return <p>loadedEmails</p>
    }

}

export default EmailFinderModule;
import React from 'react';
import ContactModule from "./ContactModule";

function punctuationRemover(str) {
    return str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

function nameFinder(title) {
    let name = title.split("-");
    return name[0];
}

function occupationFinder(title) {
    let occupation = title.split("-");
    return punctuationRemover(occupation[1]);
}
function queryParser(queryResult) {
    let parsedResult = {}
    parsedResult.name = nameFinder(queryResult.title)
    parsedResult.occupation = occupationFinder(queryResult.title)
    return parsedResult
}
function ContactListModule(props) {
    if (props.isLoadingQuery) {
        return <p>loading...</p>
    }
    return <ul>
        {props.queryResults.map((result, i) => {
            const parsedResult = queryParser(result);
            return <li key={i}>
                <ContactModule contactName={parsedResult.name} contactOccupation={parsedResult.occupation} />
            </li>
        })}
    </ul>
}

export default ContactListModule;
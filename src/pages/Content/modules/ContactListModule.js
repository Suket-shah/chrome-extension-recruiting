import React from 'react';
import ContactModule from "./ContactModule";

const contactListModuleStyle = {
    listStyleType: "none",
    padding: "0px",
}

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

function imageUrlFinder(queryResult) {
    let image_url = queryResult.pagemap.cse_image[0].src;
    return image_url;
}

function linkedinUrlFinder(queryResult) {
    let linkedin_url = queryResult.link;
    return linkedin_url;
}

function descriptionFinder(queryResult) {
    let description = queryResult.snippet;
    return description;
}

function queryParser(queryResult) {
    console.log(queryResult);
    let parsedResult = {};
    parsedResult.name = nameFinder(queryResult.title);
    parsedResult.occupation = occupationFinder(queryResult.title);
    parsedResult.image_url = imageUrlFinder(queryResult);
    parsedResult.linkedin_url = linkedinUrlFinder(queryResult);
    // parsedResult.description = descriptionFinder(queryResult);
    return parsedResult
}
function ContactListModule(props) {
    if (props.tutorial) {
        return <p>Click on a job posting to see a list of contacts</p>
    }
    if (props.isLoadingQuery || props.queryResults === undefined) {
        return <p>loading...</p>
    }
    if (props.queryResults === null || props.queryResults.length === 0) {
        return <p>No results found</p>
    }
    console.log("about to print contact lists");
    return <ul style={contactListModuleStyle}>
        {props.queryResults.map((result, i) => {
            const parsedResult = queryParser(result);
            return <li key={i}>
                <ContactModule contactName={parsedResult.name} contactOccupation={parsedResult.occupation} contactImage={parsedResult.image_url} contactLinkedin={parsedResult.linkedin_url}/>
            </li>
        })}
    </ul>
}

export default ContactListModule;
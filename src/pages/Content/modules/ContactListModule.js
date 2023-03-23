import React from 'react';
import ContactModule from "./ContactModule";
import styles from "../styles/ContactListModuleStyle";

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
    return queryResult.pagemap.cse_image[0].src;
}

function linkedinUrlFinder(queryResult) {
    return queryResult.link;
}

function descriptionFinder(queryResult) {
    return queryResult.snippet;
}

function queryParser(queryResult) {
    console.log(queryResult);
    let parsedResult = {};
    parsedResult.name = nameFinder(queryResult.title);
    parsedResult.occupation = occupationFinder(queryResult.title);
    parsedResult.image_url = imageUrlFinder(queryResult);
    parsedResult.linkedin_url = linkedinUrlFinder(queryResult);
    parsedResult.description = descriptionFinder(queryResult);
    return parsedResult
}
// TODO: add jobCompany by propogating it down.
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
    return <ul style={styles.contactModuleStyle}>
        {props.queryResults.map((result, i) => {
            const parsedResult = queryParser(result);
            return <li key={i}>
                <ContactModule
                    contactName={parsedResult.name}
                    contactOccupation={parsedResult.occupation}
                    contactImage={parsedResult.image_url}
                    contactLinkedin={parsedResult.linkedin_url}
                    contactDescription={parsedResult.description}
                    userName={props.name}
                    userSchool={props.school}
                    userMajor={props.major}
                    jobTitle={props.jobTitle}
                    jobCompany={props.jobCompany}
                />
            </li>
        })}
    </ul>
}

export default ContactListModule;
import React from "react";

import styles from "../styles/ContactModuleStyle";

// https://us-central1-recruiterplus-28695.cloudfunctions.net/generatePrompt

function ContactModule(props) {
    async function createGPTResponse() {
        console.log("fetching GPT Response");
        console.log("props for job title is ", props.jobTitle);
        const data = {
            name: props.userName,
            university: props.userSchool,
            major: props.userMajor,
            jobTitle: props.jobTitle,
            jobCompany: props.jobCompany,
            receiverName: props.contactName,
            receiverOccupation: props.contactOccupation,
            receiverProfile: props.contactDescription,
        }
        // http://127.0.0.1:5001/recruiterplus-28695/us-central1/generatePrompt
        fetch("http://127.0.0.1:5001/recruiterplus-28695/us-central1/helloWorld/generatePrompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log("result is ", res);
            return res.json();
        }).then((jsonRes) => {
            console.log("json res is, ", jsonRes.message);
        }).catch((err) => {
            alert("ChatGPT is currently unavailable.");
            console.log("GPT errors is ", err);
        })
    }
    return (
            // <div style={contactModuleStyle} className={classes.test}>
            <div style={styles.contactModuleStyle}>
                <div style={styles.flexStyle}>
                    <img src={props.contactImage} alt="contact" style={styles.imageStyle} />
                    <div style={styles.leftMargin}>
                        <a href={props.contactLinkedin} target="_blank" rel="noopener noreferrer" style={styles.underlineRemove}><h1 style={styles.nameStyle}>{props.contactName}</h1></a>
                        <h2 style={styles.occupationStyle}>{props.contactOccupation}</h2>
                    </div>
                </div>
                <div>
                    <p>{props.contactDescription}</p>
                </div>
                <div>
                    <button
                        onClick={() => createGPTResponse()}
                    >
                        Start Conversation
                    </button>
                </div>
            </div>
    )
}

export default ContactModule;
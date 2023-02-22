import React from "react";
function ContactModule(props) {
    return (
        <div>
            <img src={props.contactImage} alt="contact" />
            <a href={props.contactLinkedin} target="_blank" rel="noopener noreferrer"><h1>{props.contactName}</h1></a>
            <h2>{props.contactOccupation}</h2>
        </div>
    )
}

export default ContactModule;
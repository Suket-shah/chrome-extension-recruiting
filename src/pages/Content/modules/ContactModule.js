import React from "react";
function ContactModule(props) {
    return (
        <div>
            <h1>{props.contactName}</h1>
            <h2>{props.contactOccupation}</h2>
        </div>
    )
}

export default ContactModule;
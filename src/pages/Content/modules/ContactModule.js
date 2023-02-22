import React from "react";

import classes from "./ContactModule.module.css";

const contactModuleStyle = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: "10px 20px",
}

const imageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
}

const nameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "underline",
    margin: "0px",
}

const occupationStyle = {
    fontSize: "17px",
    fontWeight: "bold",
    margin: "0px",
}

const leftMargin = {
    marginLeft: "15px",
}

function ContactModule(props) {
    return (
        <div style={contactModuleStyle} className={classes.test}>
            <img src={props.contactImage} alt="contact" style={imageStyle} />
            <div style={leftMargin}>
                <a href={props.contactLinkedin} target="_blank" rel="noopener noreferrer"><h1 style={nameStyle}>{props.contactName}</h1></a>
                <h2 style={occupationStyle}>{props.contactOccupation}</h2>
            </div>
        </div>
    )
}

export default ContactModule;
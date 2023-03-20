import React from "react";

import classes from "./ContactModule.module.css";

const contactModuleStyle = {
    backgroundColor: "white",
    // display: "flex",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #e6e6e6",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    margin: "10px 0px",
    color: "black",
    fontFamily: "Sans-Serif",
}

const flexStyle = {
    display: "flex",
    flexDirection: "row",
}

const imageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
}

const nameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0px",
    mouse: "pointer",
}

const occupationStyle = {
    fontSize: "15px",
    fontWeight: "semibold",
    margin: "0px",
}

const leftMargin = {
    marginLeft: "15px",
}

const underlineRemove = {
    textDecoration: "none",
}

function ContactModule(props) {
    return (
            <div style={contactModuleStyle} className={classes.test}>
                <div style={flexStyle}>
                    <img src={props.contactImage} alt="contact" style={imageStyle} />
                    <div style={leftMargin}>
                        <a href={props.contactLinkedin} target="_blank" rel="noopener noreferrer" style={underlineRemove}><h1 style={nameStyle}>{props.contactName}</h1></a>
                        <h2 style={occupationStyle}>{props.contactOccupation}</h2>
                    </div>
                </div>
                <div>
                    <p>{props.contactDescription}</p>
                </div>
            </div>


    )
}

export default ContactModule;
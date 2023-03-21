import React from "react";

import styles from "../styles/ContactModuleStyle";

function ContactModule(props) {
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
            </div>
    )
}

export default ContactModule;
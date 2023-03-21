import React from 'react';
import styles from "../styles/TitleModuleStyle";

function TitleModule(props) {
    return (
        <div>
            <h1 style={styles.titleModuleStyle}>{props.title}</h1>
        </div>
    )
}

export default TitleModule;
import React from 'react';

const titleModuleStyle = {
    fontFamily: "Sans-Serif",
    fontWeight: "semibold",
    fontSize: "24px",
}
function TitleModule(props) {
    return (
        <div>
            <h1 style={titleModuleStyle}>{props.title}</h1>
        </div>
    )
}

export default TitleModule;
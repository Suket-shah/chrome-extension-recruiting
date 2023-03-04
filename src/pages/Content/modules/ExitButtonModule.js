import React from "react";

const buttonStyle = {
    textAlign: "left",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    fontSize: "12px",
    padding: "0px",
}

function exitButtonModule(props) {
    return (<div>
        <button style= {buttonStyle} onClick={() => props.onWidthChange('50px', false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                 className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    id="mainIconPathAttribute" stroke-width="0" stroke="#ff0000" fill="#000000"></path>
            </svg>
        </button>
    </div>);
}

export default exitButtonModule;
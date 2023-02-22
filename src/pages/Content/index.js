import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './modules/app';
import Frame from 'react-frame-component';


console.log('Content script works!');

let iframeWidth = "20%";
// const [iFrameWidth, setIframeWidth] = React.useState("20%");

const frameStyle = {
    background: "green",
    height: "100%",
    width: iframeWidth,
    position: "fixed",
    top: "0px",
    right: "0px",
    zIndex: "9999",
}

// function changeFrame() {
//     if (iframeWidth === "20%") {
//         iframeWidth = "5%";
//     } else {
//         iframeWidth = "20%";
//     }
//     console.log(iframeWidth);
// }
const container = document.body.children[0];
const root = createRoot(container);

root.render(<Frame style={frameStyle}>
    {/*<button onClick={changeFrame}>move in</button>*/}
    <App />
</Frame>);
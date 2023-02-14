import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './modules/app';
import Frame from 'react-frame-component';


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

const frameStyle = {
    background: "green",
    height: "100%",
    width: "20%",
    position: "fixed",
    top: "0px",
    right: "0px",
    zIndex: "9999",
}

const container = document.body.children[0];
const root = createRoot(container);
root.render(<Frame style={frameStyle}><App /></Frame>);
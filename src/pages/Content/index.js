import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './modules/app';
import Frame from 'react-frame-component';


console.log('Content script works!');

const frameStyle = {
    background: "green",
    height: "100%",
    width: '350px',
    position: "fixed",
    top: "0px",
    right: "0px",
    zIndex: "9999",
}

const buttonFrameStyle = {
    position: "fixed",
    top: "0px",
    width: "125px",
    right: "0px",
    zIndex: "9998",
}
const buttonStyle = {
    backgroundImage: 'linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)',
    borderRadius: '8px',
    borderStyle: 'none',
    boxSizing: 'border-box',

    color: '#FFFFFF',
    cursor: 'pointer',
    flexShrink: '0',
    fontSize: '14px',
    fontWeight: '500',
    height: '2rem',
    padding: '0 .5rem',
    textAlign: 'center',
    textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
    transition: 'all .5s',
    userSelect: 'none',
}

const container = document.body.children[0];
const root = createRoot(container);

function onSidePanelWidthChange(width, visibility = true) {
    const frame = document.getElementById('sidePanelIframe');
    frame.style.width = width;
    console.log("visibility", visibility);
    if (visibility) {
        frame.style.visibility = 'visible';
    } else {
        frame.style.visibility = 'hidden';
    }
}

root.render(
    <div>
        <Frame style={buttonFrameStyle}>
            <button style={buttonStyle} onClick={() => onSidePanelWidthChange('350px')}>RecruiterPlus</button>
        </Frame>
        <Frame style={frameStyle} id={'sidePanelIframe'}>
            <App onWidthChange={onSidePanelWidthChange}/>
        </Frame>
    </div>);
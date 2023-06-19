import React from 'react';
import { createRoot } from 'react-dom/client';
import Frame from 'react-frame-component';

import { toggleAppFrame } from './utils/toggleAppFrame';
import { printLine } from './utils/print';
import EntryButton from './modules/EntryButton.jsx';
import App from './modules/App.jsx';

const documentBody = document.body;
const recruitGptParent = document.createElement('div');
recruitGptParent.setAttribute('id', 'recruit-gpt-root');
documentBody.append(recruitGptParent);
const root = createRoot(recruitGptParent);

function testJobPostingPage() {
  return /http(s)?:\/\/www.linkedin.com\/jobs\/.*/.test(window.location.href);
}

if (testJobPostingPage()) {
  toggleAppFrame();
}

root.render(
  <div>
    <EntryButton />
    <App />
  </div>
);
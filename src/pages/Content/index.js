import React from 'react';
import { createRoot } from 'react-dom/client';
import Frame from 'react-frame-component';

import { printLine } from './utils/print';
import EntryButton from './modules/EntryButton.jsx';


// TODO: Delete this line
printLine("Content Script Loaded!");

const documentBody = document.body;
const recruitGptParent = document.createElement('div');
recruitGptParent.setAttribute('id', 'recruit-gpt-root');
documentBody.append(recruitGptParent);
const root = createRoot(recruitGptParent);

root.render(
  <div>
    <EntryButton />
  </div>
);
import React from 'react';
import { createRoot } from 'react-dom/client';


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

const root = createRoot(document.querySelector('html'));
root.render(<React.StrictMode></React.StrictMode>);


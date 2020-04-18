import React from 'react';
import ReactDOM from 'react-dom';

// Import Vendors Styles
import 'demo/styles/vendors/_vendors.scss';
// Import Global Styles
import 'demo/styles/globals/_globals.scss';
// Import the main React App Component
import Root from 'demo/containers/Root';
// Import the store
import { storeConfig } from 'demo/store';

// Import main global styles
import styles from './index.module.scss';

// Grab the #root element
const rootElement = document.getElementById('root');
// Add in our 'root' classname, modified via css-modules
rootElement.classList.add(styles.root);

// Render to the DOM
ReactDOM.render(<Root {...storeConfig} />, rootElement);

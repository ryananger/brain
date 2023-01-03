import React from "react";
import {createRoot} from "react-dom/client";
import App from './components/App.jsx';

import './styles/style.css';
import './styles/draw.css';
import './styles/brain.css';
import './styles/info.css';

const root = createRoot(document.getElementById("root"));

root.render(<App/>);


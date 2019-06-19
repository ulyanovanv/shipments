import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import ShipmentsStore from "./store/ShipmentsStore";

const store = new ShipmentsStore();
const Application = (<Provider store={store}>
  <App />
</Provider>);

ReactDOM.render(Application, document.getElementById('root'));

serviceWorker.unregister();

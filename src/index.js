import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from './serviceWorker';

import "es6-promise/auto";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from "./App";
import reducers from './store/reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById("root")
    );
serviceWorker.register();

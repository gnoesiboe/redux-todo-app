import React from 'react';
import ReactDom from 'react-dom';
import AppComponent from './component/container/appComponent';
import { Provider } from 'react-redux'
import * as redux from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddelware from 'redux-thunk';

var loggerMiddelware = createLogger();

var buildFactoryWithMiddelware = redux.applyMiddleware(
    loggerMiddelware,
    thunkMiddelware
)(redux.createStore);

var store = buildFactoryWithMiddelware(reducers);

ReactDom.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.getElementById('js-app-container')
);

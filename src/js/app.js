import React from 'react';
import ReactDom from 'react-dom';
import AppComponent from './component/container/appComponent';
import { Provider } from 'react-redux'
import * as redux from 'redux';
import reducers from './reducers';

var store = redux.createStore(reducers);

ReactDom.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.getElementById('js-app-container')
);

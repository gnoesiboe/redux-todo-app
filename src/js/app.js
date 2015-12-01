import React from 'react';
import ReactDom from 'react-dom';
import AppComponent from './component/container/appComponent';
import { Provider } from 'react-redux'
import store from './store';

ReactDom.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.getElementById('js-app-container')
);

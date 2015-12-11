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

// make sure all blocks (groups) in a row have an equal height that is the maximum height
$(document).ready(function () {
    require('jquery-match-height/jquery.matchHeight.js');

    //@todo replace with a better solution (that is less of a workaround :))
    setInterval(function () {
        jQuery.fn.matchHeight._update();
    }, 500);
});

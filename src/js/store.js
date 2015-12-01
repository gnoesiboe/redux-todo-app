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

export default store;

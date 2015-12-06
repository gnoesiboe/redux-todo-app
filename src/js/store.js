import * as redux from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddelware from 'redux-thunk';
import * as localStorageRepository from './repository/localStorageRepository';
import persistStateMiddleware from './middleware/persistStateMiddleware';

var loggerMiddelware = createLogger();

var buildFactoryWithMiddelware = redux.applyMiddleware(
    persistStateMiddleware,
    loggerMiddelware,
    thunkMiddelware
)(redux.createStore);

var store = buildFactoryWithMiddelware(reducers, localStorageRepository.getPersistedState());

export default store;

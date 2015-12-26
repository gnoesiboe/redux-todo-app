import * as redux from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddelware from 'redux-thunk';
import * as localStorageRepository from './repository/localStorageRepository';
import persistStateMiddleware from './middleware/persistStateMiddleware';

var loggerMiddelware = createLogger();

var buildFactoryWithMiddelware = redux.applyMiddleware(
    persistStateMiddleware,
    thunkMiddelware,
    loggerMiddelware
)(redux.createStore);

var persistedState = localStorageRepository.getPersistedState(),
    store = buildFactoryWithMiddelware(reducers, persistedState || undefined);

export default store;
